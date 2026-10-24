import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"

import { ProductCard } from "@/components/product/productCard"
import type { HomeProduct } from "@/mock/homePageMock"

type ProductSectionProps = {
  id: string
  eyebrow: string
  title: string
  description: string
  products: readonly HomeProduct[]
  actionLabel: string
  tone?: "default" | "sale"
}

export function ProductSection({
  id,
  eyebrow,
  title,
  description,
  products,
  actionLabel,
  tone = "default",
}: ProductSectionProps) {
  return (
    <section
      className={`py-16 sm:py-20 ${tone === "sale" ? "bg-[#f0f3eb]" : ""}`}
      id={id}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div
          className="mb-8 flex items-end justify-between gap-5 sm:mb-10"
          data-aos="fade-up"
        >
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
              {eyebrow}
            </p>
            <h2 className="font-serif text-[32px] leading-tight tracking-[-0.04em] text-brand sm:text-[40px]">
              {title}
            </h2>
            <p className="mt-2 max-w-md text-[13px] leading-6 text-[#748078]">
              {description}
            </p>
          </div>
          <Link
            className="mb-1 hidden shrink-0 items-center gap-2 text-xs font-semibold text-brand-3 transition-colors hover:text-brand-orange sm:flex"
            href="#more-finds"
          >
            {actionLabel}
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Link
          className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full border border-[#d8e0d7] px-5 py-3 text-xs font-semibold text-brand-3 transition-colors hover:bg-white sm:hidden"
          href="#more-finds"
        >
          {actionLabel}
          <ArrowRight aria-hidden="true" size={15} />
        </Link>
      </div>
    </section>
  )
}
