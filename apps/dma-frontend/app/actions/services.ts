import { Service } from "@/app/lib/definitions/content-types";
import { makeStrapiGETRequest } from "@/app/lib/request";
import { StrapiError } from "@/app/lib/definitions/request";

export async function getServices(): Promise<StrapiError | Service[]> {
    const [services, isError] = await makeStrapiGETRequest(
        'services')
    return isError ? services as StrapiError : services as Service[]
}

export async function getService(documentId: string): Promise<StrapiError | Service> {
    const [services, isError] = await makeStrapiGETRequest(
        `services/${documentId}`,
        {
            populate: {
                'cover_image': true,
                showcases: {
                    populate: 'cover_image'
                }
            }
        })
    return isError ? services as StrapiError : services as Service
}