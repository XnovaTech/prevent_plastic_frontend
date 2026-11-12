"use client"

import { useParams } from "next/navigation"

import { ProductDetail } from "@/components/product/productDetail"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useProduct } from "@/hooks/useProduct"

export default function AdminProductDetailPage() {
  const params = useParams<{ productId: string }>()
  const { error, isLoading, product } = useProduct(Number(params.productId))

  if (isLoading)
    return <Skeleton className="mx-auto h-[520px] max-w-5xl rounded-[26px]" />
  if (error || !product)
    return (
      <Card className="mx-auto max-w-2xl rounded-[26px] border-[#e3e9df] bg-white shadow-none">
        <CardContent className="p-8">
          <Alert
            className="border-red-200 bg-red-50 text-red-800"
            variant="destructive"
          >
            <AlertDescription>{error || "Product not found."}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )

  return (
    <ProductDetail
      basePath="/admin/products"
      canEdit={false}
      mode="admin"
      product={product}
    />
  )
}
