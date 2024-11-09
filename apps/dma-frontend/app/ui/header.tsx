import Link from "next/link";

function Header({ title }: { title: string }) {
    return <span className="w-full flex justify-between items-center">
        <p className="text-4xl ms-4 font-extrabold">{title}</p>
        <Link href="/search" className="bg-white/15 rounded p-3 font-bold hover:bg-white hover:text-black">Search</Link>
    </span>
}

export default Header