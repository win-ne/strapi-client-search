import qs from "qs";
import { RequestResponse, StrapiError } from "./definitions/request";

export async function makeStrapiGETRequest(path: string, queryOptions: object | null = null): RequestResponse {
    const query = queryOptions ? qs.stringify(
        queryOptions,
        {
            encodeValuesOnly: true,
        }
    ) : ''

    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

    const resp = await fetch(`${strapiUrl}/api/${path}?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    if (!resp.ok) {
        const err = await resp.text()

        try {
            const errResp = (JSON.parse(err)) as StrapiError

            return [errResp, true]
        } catch {
            return [{ error: { message: err } }, true]
        }
    } else {
        const body = await resp.json()

        if (body?.error) return [body, true]

        return [body?.data || body, false]
    }
}