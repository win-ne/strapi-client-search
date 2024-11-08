import qs from "qs";
import { Category, StrapiError } from "@/app/lib/definitions/content-types";

export async function getCategories(): Promise<StrapiError | Category[]> {
    const query = qs.stringify(
        {
            populate: {
                services: {
                    populate: {
                        'cover_image': true,
                        showcases: {
                            populate: 'cover_image'
                        }
                    }
                }
            }
        },
        {
            encodeValuesOnly: true,
        }
    );
    const resp = await fetch(`http://localhost:1337/api/categories?${query}`, {
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

        console.log('body: ', body)

        if (body?.error) return body

        return body?.data || body
    }
}