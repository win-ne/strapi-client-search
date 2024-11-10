import { Showcase } from "@/app/lib/definitions/content-types";
import { makeStrapiGETRequest } from "@/app/lib/request";
import { StrapiError } from "@/app/lib/definitions/request";

export async function getShowcases(): Promise<StrapiError | Showcase[]> {
    const [showcases, isError] = await makeStrapiGETRequest(
        'showcases')
    return isError ? showcases as StrapiError : showcases as Showcase[]
}

export async function getShowcase(documentId: string): Promise<StrapiError | Showcase> {
    const [showcases, isError] = await makeStrapiGETRequest(
        `showcases/${documentId}`,
        {
            populate: 'cover_image'
        })
    return isError ? showcases as StrapiError : showcases as Showcase
}