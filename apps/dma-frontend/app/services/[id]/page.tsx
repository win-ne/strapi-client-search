import { getService, getServices } from "@/app/actions/services"
import { Service } from "@/app/lib/definitions/content-types"
import ServiceCard from "@/app/ui/service"
import Header from "@/app/ui/header"
import { StrapiError } from "@/app/lib/definitions/request"

async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
    let service = {} as Service
    const { id } = await params

    const res = await getService(id)
    if (!(res as StrapiError)?.error) {
        service = res as Service
    }

    return <div className="flex p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)] flex-col">
        <Header title="Service" />
        {service?.id && <ServiceCard service={service} />}
    </div>
}

export async function generateStaticParams() {
    const services = await getServices()

    return (services as Service[]).map((service) => ({
        id: service.documentId
    }))
}

export default ServicePage