'use client'

import Fuse, { FuseResult } from 'fuse.js'
import searchData from '@/app/lib/data/search_data.json'
import searchIndexData from '@/app/lib/data/search_index.json'
import { ChangeEvent, useMemo, useState } from 'react'
import { SearchItem } from '@/app/lib/definitions/search'
import Image from 'next/image'
import Link from 'next/link'

function Search() {
    const searchIndex = useMemo(() => Fuse.parseIndex(searchIndexData), [])
    const options = useMemo(() => ({ keys: ["name", "description", "link", "type"], includeMatches: true, useExtendedSearch: true }), [])
    const fuse = useMemo(() => new Fuse(searchData, options, searchIndex), [options, searchIndex])

    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState([] as FuseResult<unknown>[])

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const searchT = event.target.value
        setSearchTerm(searchT)
        setResults(searchT ? fuse.search(searchT) : [])
    }

    return <div className="flex p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)] flex-col">
        <p className="text-4xl">Search</p>
        <input type="text" className="rounded-lg bg-white/15 h-10 text-white py-2 px-4 hover:border hover:border-white/25 active:border active:border-white/25 focus:border focus:border-white/25" onChange={handleSearch} />
        {!!results.length && <div className='w-full flex flex-col gap-3 items-center'>
            {results.map(res => {
                const hit = res["item"] as SearchItem

                return <Link
                    href={`${hit.type.toLowerCase()}/${hit.documentId}`}
                    key={`result-${hit?.documentId}`}
                    className='bg-white/10 flex p-3 rounded-lg items-center max-w-[600px] border border-white/10 hover:border-white/25 hover:bg-white/15  focus:border-white/25 focus:bg-white/15  active:border-white/25 active:bg-white/15 '>
                    <div className='flex flex-col justify-start items-start'>
                        <div className='bg-gray-200 text-black rounded-lg p-1 text-xs shrink font-semibold mb-2'>{hit.type}</div>
                        <p className='font-bold text-lg'>{hit.name}</p>
                        <p>{hit.description.split(' ').slice(0, 15).join(' ') + '...'}</p>
                    </div>
                    <div className='max-w-20 h-auto bg-white/15 rounded-lg p-3 ms-5'>
                        <Image
                            src={hit.thumbnail || `/window.svg`}
                            height={120}
                            width={120}
                            alt={`${hit.name} search thumbnail`}
                            unoptimized={true}
                        />
                    </div>
                </Link>
            })}
        </div>}
        {!!!results.length && searchTerm && <p className='w-full text-center font-bold'>No results</p>}
        {!!!searchTerm && <p className='w-full text-center font-bold'>Enter a term to see results</p>}
    </div>
}

export default Search