import { getCategories, getCategory } from "@/app/actions/categories"
import { Category } from "@/app/lib/definitions/content-types"
import { StrapiError } from "@/app/lib/definitions/request"
import CategoryCard from "@/app/ui/category"
import Header from "@/app/ui/header"

async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
    let category = {} as Category
    const { id } = await params

    const res = await getCategory(id)
    if (!(res as StrapiError)?.error) {
        category = res as Category
    }

    return <div className="flex p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)] flex-col">
        <Header title="Service Category" />
        {category?.id && <CategoryCard category={category} />}
    </div>
}

export async function generateStaticParams() {
    const categories = await getCategories(false)

    return (categories as Category[]).map((category) => ({
        id: category.documentId
    }))
}

export default CategoryPage