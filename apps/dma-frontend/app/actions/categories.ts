import { Category } from "@/app/lib/definitions/content-types";
import { makeStrapiGETRequest } from "@/app/lib/request";
import { StrapiError } from "@/app/lib/definitions/request";

export async function getCategories(populate = true): Promise<StrapiError | Category[]> {
    const [categories, isError] = await makeStrapiGETRequest(
        'categories',
        populate ? {
            populate: {
                services: {
                    populate: {
                        'cover_image': true,
                    }
                }
            }
        } : {})
    return isError ? categories as StrapiError : categories as Category[]
}

export async function getCategory(documentId: string): Promise<StrapiError | Category> {
    const [categories, isError] = await makeStrapiGETRequest(
        `categories/${documentId}`,
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
        })
    return isError ? categories as StrapiError : categories as Category
}