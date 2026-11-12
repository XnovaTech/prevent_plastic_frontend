"use client"

import { useMemo, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Check,
  Clock,
  ImageSquare,
  PencilSimple,
  Storefront,
  Tag,
  Trash,
  Warning,
  X,
} from "@phosphor-icons/react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button, LinkButton } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { productService, type Product } from "@/services/productService"

type ProductDetailProps = {
  product: Product
  basePath?: string
  canEdit?: boolean
  mode?: "admin" | "vendor"
}

type ProductAction = "disable" | "ban" | "enable" | ""

const statusLabels: Record<Product["status"], string> = {
  draft: "Draft",
  active: "Live",
  disabled: "Disabled",
  banned: "Banned",
  archived: "Archived",
}

const statusClasses: Record<Product["status"], string> = {
  draft: "border-[#eadfca] bg-[#fff8e9] text-[#9a6b1f]",
  active: "border-[#cce3cb] bg-[#eef8eb] text-[#2f7049]",
  disabled: "border-[#eadfca] bg-[#fff8e9] text-[#9a6b1f]",
  banned: "border-red-200 bg-red-50 text-red-700",
  archived: "border-[#e3e9df] bg-[#f3f5f1] text-brand-gray-3",
}

function formatPrice(value: string | number) {
  return `Ks ${Number(value).toLocaleString()}`
}

function sanitizeDescription(value?: string | null) {
  if (!value || typeof window === "undefined") return ""

  const document = new DOMParser().parseFromString(value, "text/html")
  document
    .querySelectorAll("script, style, iframe, object, embed, form")
    .forEach((element) => element.remove())
  document.querySelectorAll("*").forEach((element) => {
    Array.from(element.attributes).forEach((attribute) => {
      const name = attribute.name.toLowerCase()
      const content = attribute.value.trim().toLowerCase()
      if (
        name.startsWith("on") ||
        ((name === "href" || name === "src") &&
          content.startsWith("javascript:"))
      ) {
        element.removeAttribute(attribute.name)
      }
    })
  })

  return document.body.innerHTML
}

export function ProductDetail({
  product,
  basePath = "/vendor/products",
  canEdit = true,
  mode = "vendor",
}: ProductDetailProps) {
  const router = useRouter()
  const [currentProduct, setCurrentProduct] = useState(product)
  const [action, setAction] = useState<ProductAction>("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")

  const images = currentProduct.images ?? []
  const variants = currentProduct.variants ?? []
  const prices = variants
    .map((variant) => Number(variant.price))
    .filter(Boolean)
  const totalStock = currentProduct.stock_quantity ?? 0
  const sanitizedDescription = useMemo(
    () => sanitizeDescription(currentProduct.description),
    [currentProduct.description]
  )
  const priceLabel =
    prices.length === 0
      ? "—"
      : prices.length === 1 || Math.min(...prices) === Math.max(...prices)
        ? formatPrice(prices[0])
        : `${formatPrice(Math.min(...prices))} – ${formatPrice(Math.max(...prices))}`

  const runAction = async (nextAction: Exclude<ProductAction, "">) => {
    setAction(nextAction)
    setError("")
    try {
      const updatedProduct =
        nextAction === "disable"
          ? await productService.disable(currentProduct.id)
          : nextAction === "ban"
            ? await productService.ban(currentProduct.id)
            : await productService.enable(currentProduct.id)
      setCurrentProduct(updatedProduct)
    } catch (requestError) {
      setError(
        axios.isAxiosError(requestError)
          ? (requestError.response?.data?.message ??
              "Unable to update product status.")
          : "Unable to update product status."
      )
    } finally {
      setAction("")
    }
  }

  const deleteProduct = async () => {
    if (!window.confirm(`Delete “${currentProduct.name}”?`)) return
    setIsDeleting(true)
    setError("")
    try {
      await productService.remove(currentProduct.id)
      router.push(basePath)
    } catch {
      setError("Unable to delete this product.")
      setIsDeleting(false)
    }
  }

  const renderModerationAction = () => {
    if (mode !== "admin") return null

    if (
      currentProduct.status === "disabled" ||
      currentProduct.status === "banned"
    ) {
      return (
        <Button
          isDisabled={Boolean(action)}
          onPress={() => void runAction("enable")}
        >
          <Check size={16} />
          {action === "enable" ? "Enabling…" : "Enable listing"}
        </Button>
      )
    }

    if (currentProduct.status === "active") {
      return (
        <div className="flex flex-wrap gap-2">
          <Button
            isDisabled={Boolean(action)}
            onPress={() => void runAction("disable")}
            variant="outline"
          >
            <Clock size={16} />
            {action === "disable" ? "Disabling…" : "Disable"}
          </Button>
          <Button
            isDisabled={Boolean(action)}
            onPress={() => {
              if (
                window.confirm(
                  `Ban “${currentProduct.name}”? This will hide it from the marketplace.`
                )
              ) {
                void runAction("ban")
              }
            }}
            variant="destructive"
          >
            <X size={16} />
            {action === "ban" ? "Banning…" : "Ban product"}
          </Button>
        </div>
      )
    }

    return null
  }

  const statusCopy =
    mode === "admin"
      ? currentProduct.status === "active"
        ? "This listing is live. Disable it temporarily or ban it if it violates marketplace rules."
        : currentProduct.status === "disabled"
          ? "This listing is hidden from shoppers. Enable it when the issue is resolved."
          : currentProduct.status === "banned"
            ? "This listing is banned from the marketplace. Enable it only after a moderation decision."
            : "This listing is still a draft and is not visible to shoppers."
      : currentProduct.status === "active"
        ? "This product is live and available to shoppers."
        : currentProduct.status === "disabled"
          ? "An admin has disabled this product. Please contact support if you need help."
          : currentProduct.status === "banned"
            ? "This product has been banned from the marketplace. Please contact support."
            : "This product is saved as a draft and is not visible to shoppers."

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-7">
        <LinkButton
          className="text-xs font-semibold text-brand-light"
          href={basePath}
          variant="ghost"
        >
          <ArrowLeft size={14} /> Back to products
        </LinkButton>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
              {mode === "admin" ? "Marketplace moderation" : "Your product"}
            </p>
            <h2 className="mt-1 font-serif text-4xl tracking-[-0.05em] text-brand sm:text-5xl">
              {currentProduct.name}
            </h2>
            <p className="mt-2 text-sm text-brand-light">
              /{currentProduct.slug}
              {currentProduct.sku ? ` · ${currentProduct.sku}` : ""}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              className={`border ${statusClasses[currentProduct.status]}`}
              variant="outline"
            >
              {statusLabels[currentProduct.status]}
            </Badge>
            {canEdit && (
              <LinkButton
                href={`${basePath}/${currentProduct.id}/edit`}
                size="sm"
                variant="outline"
              >
                <PencilSimple size={15} /> Edit
              </LinkButton>
            )}
            <Button
              isDisabled={isDeleting || Boolean(action)}
              onPress={deleteProduct}
              size="sm"
              variant="destructive"
            >
              <Trash size={15} /> Delete
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <Alert
          className="mb-5 border-red-200 bg-red-50 text-red-800"
          variant="destructive"
        >
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="mb-5 rounded-[26px] border-[#dce8d8] bg-[#f3f8ef] shadow-none">
        <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-3 shadow-sm">
              {currentProduct.status === "active" ? (
                <Check size={20} />
              ) : currentProduct.status === "banned" ? (
                <Warning size={20} />
              ) : (
                <Clock size={20} />
              )}
            </span>
            <div>
              <p className="font-semibold text-brand">
                {mode === "admin"
                  ? "Moderation status"
                  : statusLabels[currentProduct.status]}
              </p>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-brand-light">
                {statusCopy}
              </p>
            </div>
          </div>
          {renderModerationAction()}
        </CardContent>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <Card className="overflow-hidden rounded-[26px] border-[#e3e9df] bg-white shadow-none">
          <CardHeader className="border-b border-[#edf0ea]">
            <CardTitle className="text-base text-brand">
              Product photos
            </CardTitle>
            <p className="text-sm text-brand-light">
              {images.length > 0
                ? `${images.length} photo${images.length === 1 ? "" : "s"} · first photo is primary`
                : "No photos uploaded yet."}
            </p>
          </CardHeader>
          <CardContent className="p-5">
            {images.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-[minmax(0,1.35fr)_minmax(180px,0.65fr)]">
                <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-[#f4f7f1]">
                  <img
                    alt={images[0].alt_text ?? currentProduct.name}
                    className="h-full w-full object-contain"
                    src={images[0].url}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
                  {images.slice(1, 4).map((image) => (
                    <div
                      className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#f4f7f1]"
                      key={image.id}
                    >
                      <img
                        alt={image.alt_text ?? currentProduct.name}
                        className="h-full w-full object-contain"
                        src={image.url}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-[#cfdccf] bg-[#f7faf4] text-center">
                <ImageSquare className="text-brand-2" size={30} />
                <p className="mt-3 font-semibold text-brand">
                  No product photos
                </p>
                <p className="mt-1 text-sm text-brand-gray-3">
                  Add clear photos before publishing this listing.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-[26px] border-[#e3e9df] bg-white shadow-none">
          <CardHeader>
            <CardTitle className="text-base text-brand">
              Listing snapshot
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 rounded-2xl bg-[#f7faf4] p-3">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-brand-yellow-bg text-brand-3">
                <Tag size={20} />
              </span>
              <div>
                <p className="text-xs text-brand-gray-3">Category</p>
                <p className="font-semibold text-brand">
                  {currentProduct.category?.name ?? "—"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-[#f7faf4] p-3">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-brand-yellow-bg text-brand-3">
                <Storefront size={20} />
              </span>
              <div>
                <p className="text-xs text-brand-gray-3">Vendor ID</p>
                <p className="font-semibold text-brand">
                  #{currentProduct.vendor_id ?? "—"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 border-t border-[#edf0ea] pt-4">
              <div>
                <p className="text-xs text-brand-gray-3">Price</p>
                <p className="mt-1 font-semibold text-brand">{priceLabel}</p>
              </div>
              <div>
                <p className="text-xs text-brand-gray-3">Total stock</p>
                <p className="mt-1 font-semibold text-brand">{totalStock}</p>
              </div>
              <div>
                <p className="text-xs text-brand-gray-3">Variants</p>
                <p className="mt-1 font-semibold text-brand">
                  {variants.length}
                </p>
              </div>
              <div>
                <p className="text-xs text-brand-gray-3">Template</p>
                <p className="mt-1 font-semibold text-brand">
                  v{currentProduct.template_id}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-[26px] border-[#e3e9df] bg-white shadow-none">
          <CardHeader>
            <CardTitle className="text-base text-brand">Description</CardTitle>
          </CardHeader>
          <CardContent>
            {sanitizedDescription ? (
              <div
                className="text-sm leading-7 text-brand-light [&_a]:text-brand-3 [&_a]:underline [&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-brand-green [&_blockquote]:pl-4 [&_h1]:mb-3 [&_h1]:font-serif [&_h1]:text-2xl [&_h1]:font-semibold [&_h2]:mb-2 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_ol]:my-3 [&_ol]:list-decimal [&_p]:mb-3 [&_strong]:font-semibold [&_ul]:my-3 [&_ul]:list-disc"
                dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
              />
            ) : (
              <p className="text-sm leading-7 text-brand-light">
                No description yet.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-[26px] border-[#e3e9df] bg-white shadow-none">
          <CardHeader>
            <CardTitle className="text-base text-brand">
              Variants and pricing
            </CardTitle>
            <p className="text-sm text-brand-light">
              SKU identifies the variant; each combination can have its own
              price and stock.
            </p>
          </CardHeader>
          <CardContent>
            {variants.length > 0 ? (
              <div className="overflow-hidden rounded-2xl border border-[#edf0ea]">
                <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-4 bg-[#f7faf4] px-4 py-3 text-[10px] font-bold tracking-[0.12em] text-brand-gray-3 uppercase">
                  <span>Variant / SKU</span>
                  <span>Price</span>
                  <span>Stock</span>
                </div>
                {variants.map((variant, index) => (
                  <div
                    className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-4 border-t border-[#edf0ea] px-4 py-4"
                    key={variant.id}
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-brand">
                        {variant.option_values?.length
                          ? variant.option_values
                              .map(
                                (option) =>
                                  `${option.attribute_name ?? option.attribute_code}: ${option.value}`
                              )
                              .join(" · ")
                          : `Variant ${index + 1}`}
                      </p>
                      {variant.sku ? (
                        <p className="mt-1 text-xs text-brand-gray-3">
                          SKU: {variant.sku}
                        </p>
                      ) : !variant.option_values?.length ? (
                        <p className="mt-1 text-xs text-brand-gray-3">
                          Standard product
                        </p>
                      ) : null}
                    </div>
                    <span className="text-sm font-semibold text-brand">
                      {formatPrice(variant.price)}
                    </span>
                    <span className="text-sm text-brand-light">
                      {variant.stock_quantity}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-brand-gray-3">No variants found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
