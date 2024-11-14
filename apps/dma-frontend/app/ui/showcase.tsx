import Link from "next/link"
import { Showcase } from "@/app/lib/definitions/content-types"
import Image from "next/image"

interface Props {
    showcase: Showcase,
    larger?: boolean
    linkable?: boolean
}

function ShowcaseCard({ showcase, larger = false, linkable = false }: Props) {
    const scImg = showcase?.cover_image?.formats[larger ? "large" : "small"]

    const Card = () => <div className={`bg-white/5 grow mt-6 rounded-lg p-3 border border-white/5 ${linkable && 'hover:bg-white/10 hover:border-white/15 active:bg-white/10 active:border-white/15 focus:bg-white/10 focus:border-white/15'
        }`}>
        <div className="text-lg font-extrabold text-red-400">Showcase</div>
        <div key={showcase.documentId}>
            {scImg && <Image
                className="rounded-lg my-3 mx-auto border-2 border-black/15"
                src={scImg.url}
                height={scImg.height}
                width={scImg.width}
                alt={scImg.name}
                unoptimized={true}
                priority={true}
            />}
            <span className="flex justify-between items-center my-2">
                <p className="font-bold text-2xl">{showcase.name}</p>
                {linkable ? <p className="text-red-400 text-sm font-extrabold">{showcase.link}</p> : <Link href={`https://${showcase.link}`} className="text-red-400 text-sm font-extrabold">{showcase.link}</Link>}
            </span>
            <p className="text-gray-400">{showcase.description}</p>
        </div>
    </div>

    if (linkable) {
        return <Link href={`/showcases/${showcase.documentId}`}><Card /></Link>
    }

    return <Card />
}

export default ShowcaseCard
