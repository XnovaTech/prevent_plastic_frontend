import { ProductCard } from "@/components/product/productCard"
import { SectionBrowseLink } from "@/components/shared/sectionBrowseLink"
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
          <SectionBrowseLink
            href="#more-finds"
            label={actionLabel}
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
          href="#more-finds"
          label={actionLabel}
          placement="footer"
          screen="mobile"
        />
      </div>
    </section>
  )
}
