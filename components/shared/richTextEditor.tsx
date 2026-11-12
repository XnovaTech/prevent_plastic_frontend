"use client"

import { useMemo, useState } from "react"
import dynamic from "next/dynamic"

import { cn } from "@/lib/utils"

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false })

type RichTextEditorProps = {
  id?: string
  name?: string
  value?: string | null
  defaultValue?: string | null
  placeholder?: string
  disabled?: boolean
  nullable?: boolean
  className?: string
  onChange?: (value: string | null) => void
}

const toolbarButtons: string[] = [
  "source",
  "|",
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "superscript",
  "subscript",
  "|",
  "font",
  "fontsize",
  "brush",
  "paragraph",
  "|",
  "ul",
  "ol",
  "outdent",
  "indent",
  "|",
  "align",
  "lineHeight",
  "|",
  "link",
  "table",
  "hr",
  "eraser",
  "copyformat",
  "|",
  "undo",
  "redo",
  "fullsize",
]

function hasMeaningfulContent(value: string) {
  return (
    value
      .replace(/<p>\s*(<br\s*\/?>)?\s*<\/p>/gi, "")
      .replace(/<br\s*\/?>/gi, "")
      .replace(/&nbsp;/gi, "")
      .replace(/\s/g, "").length > 0
  )
}

export function RichTextEditor({
  id,
  name,
  value,
  defaultValue = "",
  placeholder = "Write a clear description…",
  disabled = false,
  nullable = false,
  className,
  onChange,
}: RichTextEditorProps) {
  const [internalContent, setInternalContent] = useState(
    value ?? defaultValue ?? ""
  )
  const content = value !== undefined ? (value ?? "") : internalContent

  const config = useMemo(
    () => ({
      readonly: disabled,
      placeholder,
      height: 280,
      minHeight: 220,
      toolbarAdaptive: false,
      toolbarButtonSize: "middle" as const,
      buttons: toolbarButtons,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      spellcheck: true,
      askBeforePasteHTML: false,
      defaultActionOnPaste: "insert_clear_html" as const,
      uploader: {
        insertImageAsBase64URI: false,
      },
    }),
    [disabled, placeholder]
  )

  const handleChange = (nextValue: string) => {
    setInternalContent(nextValue)
    onChange?.(nullable && !hasMeaningfulContent(nextValue) ? null : nextValue)
  }

  return (
    <div className={cn("prevent-rich-text", className)}>
      <JoditEditor
        config={config}
        id={id}
        onChange={handleChange}
        value={content}
      />
      {name && (
        <input
          name={name}
          type="hidden"
          value={nullable && !hasMeaningfulContent(content) ? "" : content}
        />
      )}
    </div>
  )
}
