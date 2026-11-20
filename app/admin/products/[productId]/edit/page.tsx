"use client"

import { useParams } from "next/navigation"

import { ProductEditForm } from "@/components/product/productEditForm"
import { useProduct } from "@/hooks/useProduct"

export default function AdminProductEditPage() {
  const params = useParams<{ productId: string }>()
  const { product, isLoading } = useProduct(Number(params.productId))

  if (isLoading) return <p className="text-sm text-brand-gray-3">Loading product…</p>
  if (!product) return <p className="text-sm text-brand-gray-3">Product not found.</p>

  return <ProductEditForm basePath="/admin/products" product={product} />
}
