"use client"

import { useEffect, useRef, useState } from "react"
import { ImageSquare, Trash, UploadSimple } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"

type ImageUploaderProps = {
  value?: File | null
  existingImage?: string | null
  onChange: (file: File | null) => void
  disabled?: boolean
}

export function ImageUploader({
  value,
  existingImage,
  onChange,
  disabled = false,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(existingImage ?? null)

  useEffect(() => {
    if (!value) {
      const frame = window.requestAnimationFrame(() => {
        setPreview(existingImage ?? null)
      })
      return () => window.cancelAnimationFrame(frame)
    }
    const url = URL.createObjectURL(value)
    const frame = window.requestAnimationFrame(() => setPreview(url))
    return () => {
      window.cancelAnimationFrame(frame)
      URL.revokeObjectURL(url)
    }
  }, [existingImage, value])

  const selectFile = (file?: File) => {
    if (!file) return
    onChange(file)
  }

  return (
    <div className="space-y-3">
      <div className="relative flex min-h-52 items-center justify-center overflow-hidden rounded-[24px] border border-dashed border-[#cfdccf] bg-[#f5f8f1]">
        {preview ? (
          <>
            <img
              alt="Category preview"
              className="h-52 w-full object-cover"
              src={preview}
            />
            <Button
              aria-label="Remove category image"
              className="absolute top-3 right-3 bg-white/90 text-red-700 hover:bg-white"
              onPress={() => {
                onChange(null)
                setPreview(null)
                if (inputRef.current) inputRef.current.value = ""
              }}
              size="icon"
              variant="outline"
            >
              <Trash size={16} />
            </Button>
          </>
        ) : (
          <button
            className="flex h-full min-h-52 w-full flex-col items-center justify-center gap-3 text-brand-light transition-colors hover:bg-[#edf4e9]"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
            type="button"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-white text-brand-2 shadow-sm">
              <ImageSquare size={24} />
            </span>
            <span className="text-sm font-semibold text-brand">
              Add a category image
            </span>
            <span className="text-xs text-brand-gray-3">
              PNG, JPG or WEBP · up to 5 MB
            </span>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        accept="image/png,image/jpeg,image/webp"
        className="sr-only"
        disabled={disabled}
        onChange={(event) => selectFile(event.target.files?.[0])}
        type="file"
      />
      {preview && (
        <Button
          className="text-brand-3"
          isDisabled={disabled}
          onPress={() => inputRef.current?.click()}
          variant="outline"
        >
          <UploadSimple size={16} /> Replace image
        </Button>
      )}
    </div>
  )
}
