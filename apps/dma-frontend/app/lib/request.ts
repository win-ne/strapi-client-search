import qs from "qs";
import { RequestResponse, StrapiError } from "./definitions/request";

export async function makeStrapiGETRequest(path: string, queryOptions: object | null = null): RequestResponse {
    const query = queryOptions ? qs.stringify(
        queryOptions,
        {
            encodeValuesOnly: true,
        }
    ) : ''

    const resp = await fetch(`http://localhost:1337/api/${path}?${query}`, {
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