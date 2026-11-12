"use client"

import { useEffect, useRef, useState } from "react"
import { ImageSquare, Trash } from "@phosphor-icons/react"

type ProductImageUploaderProps = {
  disabled?: boolean
}

export function ProductImageUploader({
  disabled = false,
}: ProductImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file))
    const frame = window.requestAnimationFrame(() => setPreviews(urls))
    return () => {
      window.cancelAnimationFrame(frame)
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [files])

  const chooseFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return
    const nextFiles = Array.from(selectedFiles).slice(0, 8)
    setFiles(nextFiles)
  }

  return (
    <div className="space-y-4">
      {previews.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {previews.map((preview, index) => (
            <div
              className="relative aspect-square overflow-hidden rounded-2xl bg-[#edf3e9]"
              key={preview}
            >
              <img
                alt={`Product preview ${index + 1}`}
                className="h-full w-full object-cover"
                src={preview}
              />
              {index === 0 && (
                <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-brand-3">
                  Primary
                </span>
              )}
            </div>
          ))}
          <button
            className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#cfdccf] text-brand-light hover:bg-[#edf4e9]"
            onClick={() => inputRef.current?.click()}
            type="button"
          >
            <ImageSquare size={22} />
            <span className="text-xs font-semibold">Add more</span>
          </button>
        </div>
      ) : (
        <button
          className="flex min-h-44 w-full flex-col items-center justify-center gap-3 rounded-[24px] border border-dashed border-[#cfdccf] bg-[#f5f8f1] text-brand-light hover:bg-[#edf4e9]"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          type="button"
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-white text-brand-2 shadow-sm">
            <ImageSquare size={24} />
          </span>
          <span className="text-sm font-semibold text-brand">
            Add product photos
          </span>
          <span className="text-xs text-brand-gray-3">
            Up to 8 JPG, PNG, or WEBP images · 5 MB each
          </span>
        </button>
      )}
      {previews.length > 0 && (
        <button
          className="inline-flex items-center gap-2 text-xs font-semibold text-red-700 hover:text-red-900"
          onClick={() => {
            setFiles([])
            if (inputRef.current) inputRef.current.value = ""
          }}
          type="button"
        >
          <Trash size={14} /> Remove all photos
        </button>
      )}
      <input
        ref={inputRef}
        accept="image/png,image/jpeg,image/webp"
        className="sr-only"
        disabled={disabled}
        multiple
        name="images[]"
        onChange={(event) => chooseFiles(event.target.files)}
        type="file"
      />
    </div>
  )
}
