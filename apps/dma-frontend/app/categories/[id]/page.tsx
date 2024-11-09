'use client'

import { getCategory } from "@/app/actions/categories"
import { Category, StrapiError } from "@/app/lib/definitions/content-types"
import CategoryCard from "@/app/ui/category"
import Header from "@/app/ui/header"
import { Usable, use, useEffect, useState } from "react"

function CategoryPage({ params }: { params: Usable<{ id: string }> }) {
    const [category, setCategory] = useState({} as Category)

    const rParams = use(params)

    useEffect(() => {
        if (rParams) {
            getCategory(rParams.id).then(res => {
                if (!(res as StrapiError)?.error) {
                    setCategory(res as Category)
                }
            })
        }
    }, [rParams])

    return <div className="flex p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)] flex-col">
        <Header title="Service Category" />
        {category?.id && <CategoryCard category={category} />}
    </div>
}

export default CategoryPage