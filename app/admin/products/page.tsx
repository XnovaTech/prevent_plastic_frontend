import { ProductList } from "@/components/product/productList"

export default function AdminProductsPage() {
  return (
    <ProductList
      basePath="/admin/products"
      description="Review products across the marketplace and keep listings healthy."
      heading="Marketplace products."
    />
  )
}
