'use client'

import { useEffect, useState } from "react";
import { getCategories } from "./actions/categories";
import { Category, StrapiError } from "@/app/lib/definitions/content-types";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [categories, setCategories] = useState([] as Category[])

  useEffect(() => {
    getCategories().then((res) => {
      if (!(res as StrapiError).error) {
        setCategories(res as Category[])
        console.log(res)
      }
    })
  }, [])

  return (
    <div className="flex items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 justify-center">
        <span className="w-full flex justify-between">
          <p className="text-4xl">Digital Marketing Studio</p>
          <Link href="/search" className="bg-white/15 rounded p-3 font-bold hover:bg-white hover:text-black">Search</Link>
        </span>
        <p className="text-3xl">Our Services</p>
        <div className="w-full flex flex-col gap-4">
          {categories.map((cat, index) => {
            return <div className="flex flex-col" key={`category-${index}`}>
              <span className="text-3xl font-bold text-red-400 my-2">{cat?.name}</span>
              <span>{cat?.description}</span>
              <div className="flex mt-6 mb-3 max-lg:flex-col justify-between max-lg:gap-6">
                {cat?.services.map((ser, serIndex) => {
                  const rawMU = marked.parse(ser?.description)
                  const img = ser?.cover_image.formats.small
                  return <div className="lg:basis-[32%] rounded-lg p-4 bg-white/10 flex flex-col" key={`ser-${serIndex}`}>
                    <div
                      className="bg-white/5 rounded-lg w-full mb-6 flex justify-center align-center">
                      <Image
                        src={`http://localhost:1337${img.url}`}
                        height={img.height}
                        width={img.width}
                        alt={img.name}
                        unoptimized={true}
                        priority={true}
                      />
                    </div>
                    <span className="font-extrabold text-lg">{ser?.name}</span>
                    <div dangerouslySetInnerHTML={{ __html: rawMU }}></div>
                    {/* <hr className="my-5 border border-white/20" /> */}
                    <div className="bg-white grow mt-6 rounded-lg p-3 text-black">
                      <p className="text-sm font-bold text-red-400">SHOWCASE</p>
                      {ser?.showcases.map((sc) => {
                        const scImg = sc?.cover_image?.formats?.small
                        return <div key={sc.documentId}>
                          {scImg && <Image
                            className="rounded-lg my-3 mx-auto border-2 border-black/15"
                            src={`http://localhost:1337${scImg.url}`}
                            height={scImg.height}
                            width={scImg.width}
                            alt={scImg.name}
                            unoptimized={true}
                            priority={true}
                          />}
                          <span className="flex justify-between items-center my-2">
                            <p className="font-bold">{sc.name}</p>
                            <Link href={`https://${sc.link}`} className="text-red-400 text-sm font-extrabold">{sc.link}</Link>
                          </span>
                          <p>{sc.description}</p>
                        </div>
                      })}
                    </div>
                  </div>
                })}
              </div>
            </div>
          })}
        </div>
      </main>
    </div>
  );
}
