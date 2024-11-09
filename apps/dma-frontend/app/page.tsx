'use client'

import { useEffect, useState } from "react";
import { getCategories } from "./actions/categories";
import { Category, StrapiError } from "@/app/lib/definitions/content-types";
import CategoryCard from "./ui/category";
import Header from "./ui/header";

export default function Home() {
  const [categories, setCategories] = useState([] as Category[])

  useEffect(() => {
    getCategories().then((res) => {
      if (!(res as StrapiError).error) {
        setCategories(res as Category[])
      }
    })
  }, [])

  return (
    <div className="flex items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 justify-center">
        <Header title="Digital Marketing Studio" />
        <p className="text-3xl ms-4  font-extrabold">Our Services</p>
        <div className="w-full flex flex-col gap-4">
          {categories.map((cat) => <CategoryCard linkable={true} category={cat} key={`category-${cat.documentId}`} />)}
        </div>
      </main>
    </div>
  );
}
