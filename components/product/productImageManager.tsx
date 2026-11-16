"use client"

import { useState } from "react"
import axios from "axios"
import { ImageSquare, Star, Trash } from "@phosphor-icons/react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { resolveMediaUrl } from "@/lib/media"
import { productService, type Product } from "@/services/productService"

type ProductImage = NonNullable<Product["images"]>[number]

type ProductImageManagerProps = {
  productId: number
  images: ProductImage[]
  onChange: (images: ProductImage[]) => void
}

export function ProductImageManager({
  productId,
  images,
  onChange,
}: ProductImageManagerProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [busyImageId, setBusyImageId] = useState<number | null>(null)
  const [error, setError] = useState("")

  const upload = async (files: FileList | null) => {
    if (!files) return
    const selected = Array.from(files)
    if (images.length + selected.length > 8) {
      setError("A product can have up to 8 images.")
      return
    }

    setIsUploading(true)
    setError("")
    try {
      const product = await productService.uploadImages(productId, selected)
      onChange(product.images ?? [])
    } catch (requestError) {
      setError(
        axios.isAxiosError(requestError)
          ? (requestError.response?.data?.message ?? "Unable to upload images.")
          : "Unable to upload images."
      )
    } finally {
      setIsUploading(false)
    }
  }

  const setPrimary = async (image: ProductImage) => {
    setBusyImageId(image.id)
    setError("")
    try {
      const product = await productService.updateImage(productId, image.id, {
        is_primary: true,
      })
      onChange(product.images ?? [])
    } catch {
      setError("Unable to set the primary image.")
    } finally {
      setBusyImageId(null)
    }
  }

  const remove = async (image: ProductImage) => {
    if (!window.confirm("Remove this product image?")) return
    setBusyImageId(image.id)
    setError("")
    try {
      const product = await productService.removeImage(productId, image.id)
      onChange(product.images ?? [])
    } catch {
      setError("Unable to remove this image.")
    } finally {
      setBusyImageId(null)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert className="border-red-200 bg-red-50 text-red-800" variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((image) => (
            <div className="group relative aspect-square overflow-hidden rounded-2xl bg-[#edf3e9]" key={image.id}>
              <img alt={image.alt_text ?? "Product image"} className="h-full w-full object-cover" src={resolveMediaUrl(image.url)} />
              <div className="absolute inset-x-2 bottom-2 flex items-center justify-between gap-1 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                <Button
                  isDisabled={busyImageId !== null || image.is_primary}
                  onPress={() => void setPrimary(image)}
                  size="sm"
                  variant="secondary"
                >
                  <Star size={14} weight={image.is_primary ? "fill" : "regular"} />
                  {image.is_primary ? "Primary" : "Make primary"}
                </Button>
                <Button
                  aria-label="Remove image"
                  isDisabled={busyImageId !== null}
                  onPress={() => void remove(image)}
                  size="icon-sm"
                  variant="destructive"
                >
                  <Trash size={14} />
                </Button>
              </div>
              {image.is_primary && (
                <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-brand-3">
                  Primary
                </span>
              )}
            </div>
          ))}
          {images.length < 8 && (
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#cfdccf] text-brand-light hover:bg-[#edf4e9]">
              <ImageSquare size={22} />
              <span className="text-xs font-semibold">Add more</span>
              <input
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                disabled={isUploading}
                multiple
                onChange={(event) => void upload(event.target.files)}
                type="file"
              />
            </label>
          )}
        </div>
      ) : (
        <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-[24px] border border-dashed border-[#cfdccf] bg-[#f5f8f1] text-brand-light hover:bg-[#edf4e9]">
          <ImageSquare size={24} />
          <span className="text-sm font-semibold text-brand">
            {isUploading ? "Uploading…" : "Add product photos"}
          </span>
          <span className="text-xs text-brand-gray-3">Up to 8 images · 5 MB each</span>
          <input
            accept="image/png,image/jpeg,image/webp"
            className="sr-only"
            disabled={isUploading}
            multiple
            onChange={(event) => void upload(event.target.files)}
            type="file"
          />
        </label>
      )}
    </div>
  )
}
