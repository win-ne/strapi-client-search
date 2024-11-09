import qs from "qs";
import { StrapiError, Showcase } from "../lib/definitions/content-types";

export async function getShowcase(documentId: string): Promise<StrapiError | Showcase> {
    const query = qs.stringify(
        {
            populate: 'cover_image'
        },
        {
            encodeValuesOnly: true,
        }
    );

    const resp = await fetch(`http://localhost:1337/api/showcases/${documentId}?${query}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    if (!resp.ok) {
        const err = await resp.text()

        try {
            const errResp = (JSON.parse(err)) as StrapiError
            return errResp
        } catch {
            return { error: { message: err } }
        }
    } else {
        const body = await resp.json()

        if (body?.error) return body

        return body?.data || body
    }
}