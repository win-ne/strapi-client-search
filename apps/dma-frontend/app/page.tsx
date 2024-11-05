'use client'

import { useEffect, useState } from "react";
import { getCategories } from "./actions/categories";
import { Category } from "@/app/lib/definitions/category";

export default function Home() {
  const [categories, setCategories] = useState([] as Category[])

  useEffect(() => {
    getCategories().then((res) => {
      if (!res?.error) {
        setCategories(res)
        console.log(res)
      }
    })
  }, [])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 text-center justify-center">
        <p className="text-4xl">Digital Management Studio</p>
        <p className="text-xl">Our Services</p>
        <div className="w-full flex-col gap-4">
          {categories.map((cat, index) => {
            return <div key={`category-${index}`}>{cat?.name}</div>
          })}
        </div>
      </main>
    </div>
  );
}
