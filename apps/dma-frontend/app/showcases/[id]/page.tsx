import { getShowcase, getShowcases } from "@/app/actions/showcases"
import { Showcase } from "@/app/lib/definitions/content-types"
import ShowcaseCard from "@/app/ui/showcase"
import Header from "@/app/ui/header"
import { StrapiError } from "@/app/lib/definitions/request"

async function ShowcasePage({ params }: { params: Promise<{ id: string }> }) {
    let showcase = {} as Showcase
    const { id } = await params

    const res = await getShowcase(id)
    if (!(res as StrapiError)?.error) {
        showcase = res as Showcase
    }

    return <div className="flex p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)] flex-col">
        <Header title="Showcase" />
        {showcase?.id && <ShowcaseCard showcase={showcase} />}
    </div>
}

export async function generateStaticParams() {
    const showcases = await getShowcases()

    return (showcases as Showcase[]).map((showcase) => ({
        id: showcase.documentId
    }))
}

export default ShowcasePage