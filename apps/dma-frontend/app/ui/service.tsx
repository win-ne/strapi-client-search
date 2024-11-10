import Image from "next/image"
import { marked } from "marked"
import { Service } from "@/app/lib/definitions/content-types"
import Link from "next/link"
import ShowcaseCard from "./showcase"

interface Props {
    service: Service,
    linkable?: boolean
}

function ServiceCard({ service, linkable = false }: Props) {
    const rawMU = marked.parse(service?.description)
    const img = service?.cover_image.formats.small

    const Card = () => (
        <div className={`${!linkable && "lg:basis-[32%]"} rounded-lg p-4 bg-white/5 flex flex-col border border-white/10 ${linkable && "hover:border-white/30 hover:bg-white/10 grow"
            }`
        } >
            <div
                className="bg-white/5 rounded-lg w-full mb-6 flex justify-center align-center">
                <Image
                    src={img.url}
                    height={img.height}
                    width={img.width}
                    alt={img.name}
                    unoptimized={true}
                    priority={true}
                />
            </div>
            <span className="font-extrabold text-lg">{service?.name}</span>
            <div dangerouslySetInnerHTML={{ __html: rawMU }}></div>
            {!linkable && service?.showcases && service?.showcases.map((showcase) => (
                <ShowcaseCard showcase={showcase} key={`showcase-${showcase.id}`} larger={false} linkable={true} />
            ))}
        </div>
    )

    if (linkable) {
        return <Link className="lg:basis-[32%] flex" href={`/services/${service.documentId}`}><Card /></Link>
    }

    return <Card />
}

export default ServiceCard
