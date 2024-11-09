import { Category } from "@/app/lib/definitions/content-types"
import ServiceCard from "./service"
import Link from "next/link"

interface Props {
    category: Category
    linkable?: boolean
}

function CategoryCard({ category, linkable = false }: Props) {
    const Card = () => <div className={`flex flex-col rounded-xl border border-white/5 p-4 my-2 ${linkable && "hover:bg-white/5 active:bg-white/5 focus:bg-white/5 hover:border-white/20 active:border-white/20 focus:border-white/20"}`} >
        <span className="text-3xl font-bold text-red-400 ">{category?.name}</span>
        <span>{category?.description}</span>
        <div className="flex mt-6 mb-3 max-lg:flex-col justify-between max-lg:gap-6">
            {category?.services.map((ser) => <ServiceCard
                service={ser}
                key={`service-${ser.documentId}`}
                linkable={!linkable}
            />)}
        </div>
    </div>

    if (linkable) {
        return <Link href={`/categories/${category.documentId}`}>
            <Card />
        </Link>
    }

    return <Card />
}

export default CategoryCard
