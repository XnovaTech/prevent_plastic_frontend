import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Storefront,
} from "@phosphor-icons/react/dist/ssr"

import { ProductCard } from "@/components/product/productCard"
import { ProductActions } from "@/components/product/productActions"
import { ProductGallery } from "@/components/product/productGallery"
import { AosInitializer } from "@/components/shared/aosInitializer"
import { SiteFooter } from "@/components/shared/siteFooter"
import { SiteHeader } from "@/components/shared/siteHeader"
import {
  getProductDetail,
  getRelatedProducts,
  productIds,
} from "@/mock/productDetailMock"

type ProductPageProps = {
  params: Promise<{ productId: string }>
}

function formatPrice(value: number) {
  return `Ks ${value.toLocaleString("en-US")}`
}

export function generateStaticParams() {
  return productIds.map((productId) => ({ productId }))
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { productId } = await params
  const detail = getProductDetail(productId)

  if (!detail) {
    return {}
  }

  return {
    title: `${detail.product.name} — Prevent Plastic`,
    description: detail.description,
  }
}

export default async function Page({ params }: ProductPageProps) {
  const { productId } = await params
  const detail = getProductDetail(productId)

  if (!detail) {
    notFound()
  }

  const { product, shop } = detail
  const relatedProducts = getRelatedProducts(productId)

  return (
    <div className="min-h-screen bg-transparent text-brand">
      <AosInitializer />
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        href="#main-content"
      >
        Skip to content
      </a>
      <SiteHeader activeHref={shop.href} />
      <main id="main-content">
        <section className="px-4 pt-5 pb-10 sm:px-8 sm:pt-7 lg:px-12">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <nav
                aria-label="Breadcrumb"
                className="flex min-w-0 flex-wrap items-center gap-2 text-[10px] text-brand-lighter"
              >
                <Link
                  className="transition-colors hover:text-brand-3"
                  href="/"
                >
                  Home
                </Link>
                <span aria-hidden="true">/</span>
                <Link
                  className="transition-colors hover:text-brand-3"
                  href={`/shop/${shop.slug}`}
                >
                  {shop.label}
                </Link>
                <span aria-hidden="true">/</span>
                <span
                  aria-current="page"
                  className="max-w-[220px] truncate text-brand-5"
                >
                  {product.name}
                </span>
              </nav>
              <Link
                className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-brand-3 transition-colors hover:text-brand-orange"
                href={`/shop/${shop.slug}`}
              >
                <ArrowLeft aria-hidden="true" size={13} />
                Back to shop
              </Link>
            </div>

            <div
              className="mt-5 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-10"
              data-aos="fade-up"
            >
              <ProductGallery images={detail.gallery} />

              <div className="lg:sticky lg:top-28">
                <div className="rounded-[30px] border border-white/75 bg-white/55 p-5 backdrop-blur-2xl sm:p-7">
                  <div className="flex flex-wrap items-center gap-2 text-[9px] font-bold tracking-[0.13em] uppercase">
                    <span className="rounded-full bg-brand-yellow-bg/80 px-2.5 py-1 text-brand-4 backdrop-blur-md">
                      {product.category}
                    </span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-brand-gray">{product.condition}</span>
                    {product.badge && (
                      <span className="rounded-full bg-brand-peach-bg px-2.5 py-1 text-brand-orange-3">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <h1 className="mt-3 font-serif text-[34px] leading-[1.02] tracking-[-0.055em] text-brand sm:text-[42px]">
                    {product.name}
                  </h1>

                  <div className="mt-4 flex flex-wrap items-end gap-x-3 gap-y-1">
                    <p className="text-[27px] leading-none font-bold text-brand-2">
                      {formatPrice(product.price)}
                    </p>
                    {product.originalPrice && (
                      <p className="pb-0.5 text-[12px] text-brand-gray-4 line-through">
                        {formatPrice(product.originalPrice)}
                      </p>
                    )}
                  </div>

                  <p className="mt-4 text-[12px] leading-6 text-brand-light">
                    {detail.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3 rounded-[20px] border border-white/70 bg-white/40 p-3.5 backdrop-blur-md">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-2 text-brand-green">
                      <Storefront aria-hidden="true" size={21} weight="fill" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] font-bold tracking-[0.14em] text-brand-gray-3 uppercase">
                        Sold by
                      </p>
                      <p className="truncate text-[13px] font-semibold text-brand-6">
                        {product.merchant}
                      </p>
                      <p className="mt-0.5 text-[10px] text-brand-gray-2">
                        {shop.kind}
                      </p>
                    </div>
                    <Link
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-brand-3 transition-colors hover:text-brand-orange"
                      href={`/shop/${shop.slug}`}
                    >
                      Visit shop
                      <ArrowUpRight aria-hidden="true" size={12} />
                    </Link>
                  </div>

                  <ProductActions product={product} />

             
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  {detail.facts.map((fact) => (
                    <div
                      className="rounded-[16px] border border-white/65 bg-white/35 px-3.5 py-3 backdrop-blur-md"
                      key={fact.label}
                    >
                      <p className="text-[9px] font-bold tracking-[0.12em] text-brand-gray-3 uppercase">
                        {fact.label}
                      </p>
                      <p className="mt-1 text-[11px] font-medium text-brand-5">
                        {fact.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[22px] border border-white/65 bg-white/35 p-5 backdrop-blur-xl">
                <p className="text-[9px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase">
                  Condition notes
                </p>
                <p className="mt-2 text-[11px] leading-5 text-brand-light">
                  {detail.conditionNote}
                </p>
              </div>
              <div className="rounded-[22px] border border-white/65 bg-white/35 p-5 backdrop-blur-xl">
                <p className="text-[9px] font-bold tracking-[0.14em] text-brand-gray-5 uppercase">
                  A note on the photos
                </p>
                <p className="mt-2 text-[11px] leading-5 text-brand-light">
                  This is a design preview. Gallery images are mock alternatives
                  and may not show the exact item.
                </p>
              </div>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="pb-14 sm:pb-20">
            <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
                    MORE GOOD THINGS
                  </p>
                  <h2 className="font-serif text-[30px] leading-tight tracking-[-0.04em] text-brand sm:text-[38px]">
                    Keep wandering
                  </h2>
                </div>
                <Link
                  className="inline-flex items-center gap-2 text-[10px] font-semibold text-brand-3 transition-colors hover:text-brand-orange"
                  href={`/shop/${shop.slug}`}
                >
                  Browse {shop.label}
                  <ArrowRight aria-hidden="true" size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-6 lg:grid-cols-4">
                {relatedProducts.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
