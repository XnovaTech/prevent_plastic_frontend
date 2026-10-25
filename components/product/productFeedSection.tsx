"use client"

import { ProductCard } from "@/components/product/productCard"
import { SectionBrowseLink } from "@/components/shared/sectionBrowseLink"
import { homePageMock } from "@/mock/homePageMock"

export function ProductFeedSection() {
  const products = homePageMock.moreFinds.slice(0, 8)

  return (
    <section className="py-16 sm:py-20" id="more-finds">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div
          className="mb-8 flex items-end justify-between gap-5 sm:mb-10"
          data-aos="fade-up"
        >
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
              LOCAL FINDS
            </p>
            <h2 className="font-serif text-[32px] leading-tight tracking-[-0.04em] text-brand sm:text-[40px]">
              Finds from local shops
            </h2>
            <p className="mt-2 max-w-md text-[13px] leading-6 text-[#748078]">
              Pre-loved picks from shops and sellers in your community.
            </p>
          </div>
          <SectionBrowseLink
            href="/individual"
            label="Browse more"
            placement="header"
            screen="desktop"
          />
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <SectionBrowseLink
          href="/individual"
          label="Browse more"
          placement="footer"
          screen="mobile"
        />
      </div>
    </section>
  )
}
