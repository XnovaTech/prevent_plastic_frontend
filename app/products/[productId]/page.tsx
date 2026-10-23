import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProductDetailPage } from "@/components/product/productDetailPage"
import {
  getProductDetail,
  getRelatedProducts,
  productIds,
} from "@/mock/productDetailMock"

type ProductPageProps = {
  params: Promise<{ productId: string }>
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

  return (
    <ProductDetailPage
      detail={detail}
      relatedProducts={getRelatedProducts(productId)}
    />
  )
}
