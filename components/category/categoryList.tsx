"use client"

import { ArrowUpRight, Plus, Tag } from "@phosphor-icons/react"

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
import { useCategories } from "@/hooks/useCategories"

export function CategoryList() {
  const { categories, error, isLoading } = useCategories()

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
            Marketplace shelves
          </p>
          <h2 className="mt-2 font-serif text-4xl tracking-[-0.05em] text-brand">
            Categories with character.
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-brand-light">
            Keep the storefront easy to browse with clear, welcoming places for
            good things.
          </p>
        </div>
        <LinkButton href="/admin/categories/new">
          <Plus size={17} /> Add category
        </LinkButton>
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
          <div className="mt-4 space-y-3">
            {[1, 2, 3].map((item) => (
              <Skeleton className="h-16 rounded-2xl" key={item} />
            ))}
          </div>
        </Card>
      ) : categories.length === 0 ? (
        <Card className="rounded-[26px] border-[#e3e9df] bg-white shadow-none">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Tag size={22} />
              </EmptyMedia>
              <EmptyTitle>No categories yet</EmptyTitle>
              <EmptyDescription>
                Create the first shelf for your marketplace.
              </EmptyDescription>
            </EmptyHeader>
            <LinkButton href="/admin/categories/new">
              Create category
            </LinkButton>
          </Empty>
        </Card>
      ) : (
        <Card className="overflow-hidden rounded-[26px] border-[#e3e9df] bg-white py-0 shadow-none">
          <Table aria-label="Categories">
            <TableHeader>
              <TableHead id="category">Category</TableHead>
              <TableHead id="slug">Slug</TableHead>
              <TableHead id="description">Description</TableHead>
              <TableHead id="status">Status</TableHead>
              <TableHead id="actions" className="text-right">
                Actions
              </TableHead>
            </TableHeader>
            <TableBody items={categories}>
              {(category) => (
                <TableRow id={category.id}>
                  <TableCell>
                    <div className="flex min-w-[210px] items-center gap-3">
                      <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#edf3e9] text-brand-2">
                        {category.image ? (
                          <img
                            alt=""
                            className="size-full object-cover"
                            src={category.image}
                          />
                        ) : (
                          <Tag size={20} weight="duotone" />
                        )}
                      </span>
                      <span>
                        <span className="block font-semibold text-brand">
                          {category.name}
                        </span>
                        <span className="mt-1 block text-xs text-brand-gray-3">
                          ID #{category.id}
                        </span>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-brand-gray-3">
                    /{category.slug}
                  </TableCell>
                  <TableCell className="max-w-[280px] text-sm whitespace-normal text-brand-light">
                    {category.description || "No description yet."}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className="border-0 bg-brand-yellow-bg text-brand-3"
                      variant="outline"
                    >
                      {category.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <LinkButton
                        className="text-brand-3 hover:bg-brand-yellow-bg"
                        href={`/admin/categories/${category.id}`}
                        variant="ghost"
                      >
                        Details <ArrowUpRight size={16} />
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
