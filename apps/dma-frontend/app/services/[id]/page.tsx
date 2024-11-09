'use client'

import { getService } from "@/app/actions/services"
import { Service, StrapiError } from "@/app/lib/definitions/content-types"
import ServiceCard from "@/app/ui/service"
import Header from "@/app/ui/header"
import { Usable, use, useEffect, useState } from "react"

function ServicePage({ params }: { params: Usable<{ id: string }> }) {
    const [service, setService] = useState({} as Service)

    const rParams = use(params)

    useEffect(() => {
        if (rParams) {
            getService(rParams.id).then(res => {
                if (!(res as StrapiError)?.error) {
                    setService(res as Service)
                }
            })
        }
    }, [rParams])

    return <div className="flex p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)] flex-col">
        <Header title="Service" />
        {service?.id && <ServiceCard service={service} />}
    </div>
}

export default ServicePage