"use client"

import { Package, Plus } from "@phosphor-icons/react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { LinkButton } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useProducts } from "@/hooks/useProducts"

type ProductListProps = {
  basePath?: string
  heading?: string
  description?: string
  canCreate?: boolean
}

export function ProductList({
  basePath = "/vendor/products",
  heading = "Good things, listed well.",
  description = "Manage your drafts and keep your shop fresh.",
  canCreate = true,
}: ProductListProps) {
  const { error, isLoading, products } = useProducts()

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
            Your catalogue
          </p>
          <h2 className="mt-2 font-serif text-4xl tracking-[-0.05em] text-brand">
            {heading}
          </h2>
          <p className="mt-2 text-sm text-brand-light">{description}</p>
        </div>
        {canCreate && (
          <LinkButton href={`${basePath}/new`}>
            <Plus size={17} /> Add product
          </LinkButton>
        )}
      </div>
      {error && (
        <Alert
          className="mb-5 border-red-200 bg-red-50 text-red-800"
          variant="destructive"
        >
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {isLoading ? (
        <Card className="rounded-[26px] border-[#e3e9df] bg-white p-6 shadow-none">
          <Skeleton className="h-12 rounded-2xl" />
          <Skeleton className="mt-4 h-16 rounded-2xl" />
          <Skeleton className="mt-3 h-16 rounded-2xl" />
        </Card>
      ) : products.length === 0 ? (
        <Card className="rounded-[26px] border-[#e3e9df] bg-white shadow-none">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Package size={22} />
              </EmptyMedia>
              <EmptyTitle>No products yet</EmptyTitle>
              <EmptyDescription>
                {canCreate
                  ? "Create your first product using the category template."
                  : "Products created by vendors will appear here."}
              </EmptyDescription>
            </EmptyHeader>
            {canCreate && (
              <LinkButton href={`${basePath}/new`}>Create product</LinkButton>
            )}
          </Empty>
        </Card>
      ) : (
        <Card className="overflow-hidden rounded-[26px] border-[#e3e9df] bg-white py-0 shadow-none">
          <Table aria-label="Products">
            <TableHeader>
              <TableHead id="product">Product</TableHead>
              <TableHead id="category">Category</TableHead>
              <TableHead id="price">Price</TableHead>
              <TableHead id="stock">Stock</TableHead>
              <TableHead id="status">Status</TableHead>
              <TableHead id="actions" className="text-right">
                Actions
              </TableHead>
            </TableHeader>
            <TableBody items={products}>
              {(product) => (
                <TableRow id={product.id}>
                  <TableCell>
                    <div className="min-w-[200px]">
                      <p className="font-semibold text-brand">{product.name}</p>
                      <p className="mt-1 text-xs text-brand-gray-3">
                        /{product.slug}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-brand-light">
                    {product.category?.name ?? "—"}
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-brand">
                    {product.variants?.[0]?.price
                      ? `Ks ${product.variants[0].price}`
                      : "—"}
                  </TableCell>
                  <TableCell className="text-sm text-brand-light">
                    {product.stock_quantity ?? 0}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <LinkButton
                        href={`${basePath}/${product.id}`}
                        size="sm"
                        variant="outline"
                      >
                        Detail
                      </LinkButton>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  )
}
