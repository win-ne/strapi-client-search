'use client'

import { getShowcase } from "@/app/actions/showcases"
import { Showcase, StrapiError } from "@/app/lib/definitions/content-types"
import ShowcaseCard from "@/app/ui/showcase"
import Header from "@/app/ui/header"
import { Usable, use, useEffect, useState } from "react"

function ShowcasePage({ params }: { params: Usable<{ id: string }> }) {
    const [showcase, setShowcase] = useState({} as Showcase)

    const rParams = use(params)

    useEffect(() => {
        if (rParams) {
            getShowcase(rParams.id).then(res => {
                if (!(res as StrapiError)?.error) {
                    setShowcase(res as Showcase)
                }
            })
        }
    }, [rParams])

    return <div className="flex p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)] flex-col">
        <Header title="Showcase" />
        {showcase?.id && <ShowcaseCard showcase={showcase} />}
    </div>
}

export default ShowcasePage