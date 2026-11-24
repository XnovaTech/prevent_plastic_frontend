"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import axios from "axios"
import {
  Check,
  CaretDown,
  CaretUp,
  Eye,
  EyeSlash,
  FloppyDisk,
  Plus,
  Trash,
  X,
} from "@phosphor-icons/react"

import { ImageUploader } from "@/components/shared/imageUploader"
import { RichTextEditor } from "@/components/shared/richTextEditor"
import { AboutUsContent } from "@/components/about/aboutUs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAboutUs } from "@/hooks/useAboutUs"
import { resolveMediaUrl } from "@/lib/media"
import { aboutUsService } from "@/services/aboutUsService"
import type {
  AboutFaq,
  AboutItem,
  AboutSection,
  AboutSectionInput,
  AboutUsInput,
} from "@/types/aboutUs"

const approvedSectionOrder = [
  "hero",
  "introduction",
  "local_feature",
  "values",
  "culture",
  "faq",
]

const sectionTemplates = [
  { section_type: "hero", layout_type: "hero", label: "Hero" },
  { section_type: "introduction", layout_type: "split", label: "Introduction" },
  { section_type: "local_feature", layout_type: "feature", label: "Local feature" },
  { section_type: "values", layout_type: "split", label: "Guiding principles" },
  { section_type: "culture", layout_type: "gallery", label: "Image gallery" },
  { section_type: "faq", layout_type: "faq", label: "FAQ" },
] as const

function orderSections(sections: AboutSection[]) {
  return [...sections].sort((first, second) => {
    const firstIndex = approvedSectionOrder.indexOf(first.section_type)
    const secondIndex = approvedSectionOrder.indexOf(second.section_type)

    return (
      (firstIndex === -1 ? Number.MAX_SAFE_INTEGER : firstIndex) -
        (secondIndex === -1 ? Number.MAX_SAFE_INTEGER : secondIndex) ||
      first.sort_order - second.sort_order
    )
  })
}

function cmsSectionName(section: AboutSection) {
  return section.cms_title?.trim() || section.title?.trim() || "Untitled section"
}

function approvedImageCount(section: AboutSection) {
  if (section.section_type === "culture") {
    return section.gallery_images.length
  }

  return ["hero", "local_feature", "values"].includes(section.section_type)
    ? section.media.length
    : 0
}

function sectionForm(section: AboutSection): AboutSectionInput {
  return {
    section_type: section.section_type,
    cms_title: section.cms_title ?? "",
    eyebrow: section.eyebrow ?? "",
    title: section.title ?? "",
    description: section.description ?? "",
    layout_type: section.layout_type ?? "",
    actions: section.actions ?? [],
    sort_order: section.sort_order,
    is_active: section.is_active,
  }
}

function list(values?: string[] | null) {
  return values?.length ? values : [""]
}

function uploadErrorMessage(error: unknown, fallback: string) {
  if (!axios.isAxiosError(error)) return fallback

  const response = error.response?.data as
    | { message?: string; errors?: Record<string, string[]> }
    | undefined
  const firstValidationMessage = response?.errors
    ? Object.values(response.errors).flat()[0]
    : undefined

  return firstValidationMessage || response?.message || fallback
}

type SaveState = "idle" | "saving" | "saved"

function SaveLabel({ state, label = "Save" }: { state: SaveState; label?: string }) {
  if (state === "saving") return <>Saving…</>
  if (state === "saved") return <><Check size={15} /> Saved</>
  return <><FloppyDisk size={15} /> {label}</>
}

function CreateAboutPage({
  onCreate,
}: {
  onCreate: (title: string) => Promise<void>
}) {
  const [title, setTitle] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState("")

  return (
    <section className="mx-auto max-w-xl border border-[#e3e9df] bg-white p-6">
      <p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
        Website content
      </p>
      <h2 className="mt-1 font-serif text-3xl text-brand">Create About Us</h2>
      <p className="mt-2 text-sm leading-6 text-brand-light">
        Create the page first. Then add only the public sections and content
        your website needs.
      </p>
      <label className="mt-5 block space-y-2">
        <span className="text-xs font-semibold text-brand">Main page title</span>
        <Input
          onChange={(event) => setTitle(event.target.value)}
          placeholder="About Us"
          value={title}
        />
      </label>
      {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
      <Button
        className="mt-5"
        isDisabled={isCreating || !title.trim()}
        onPress={async () => {
          setError("")
          setIsCreating(true)
          try {
            await onCreate(title.trim())
          } catch {
            setError("Unable to create the About Us page. Please try again.")
          } finally {
            setIsCreating(false)
          }
        }}
      >
        <Plus size={16} /> {isCreating ? "Creating…" : "Create page"}
      </Button>
    </section>
  )
}

export function AboutCms() {
  const { about, error, isLoading, invalidatePublicAbout, updateCachedAbout } =
    useAboutUs("admin")
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [drafts, setDrafts] = useState<Record<number, AboutSectionInput>>({})
  const [contactDraft, setContactDraft] = useState<AboutUsInput | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [pendingSectionImage, setPendingSectionImage] = useState<File | null>(null)
  const [isUpdatingSection, setIsUpdatingSection] = useState(false)
  const [isCreatingSection, setIsCreatingSection] = useState(false)
  const [notice, setNotice] = useState("")
  const [saveStates, setSaveStates] = useState<Record<string, SaveState>>({})
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    icon: "",
    link_url: "",
  })
  const orderedSections = useMemo(
    () => (about ? orderSections(about.sections) : []),
    [about]
  )

  useEffect(() => {
    if (!about) return
    const frame = window.requestAnimationFrame(() => {
      setDrafts((current) => {
        const next = { ...current }
        for (const section of about.sections) {
          next[section.id] ??= sectionForm(section)
        }
        return next
      })
      setContactDraft(
        (current) =>
          current ?? {
            title: about.title,
            description: about.description ?? "",
            phone: list(about.phone),
            email: list(about.email),
            address: list(about.address),
          }
      )
      setSelectedId((current) => current ?? orderSections(about.sections)[0]?.id ?? null)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [about])

  const selected = useMemo(
    () => orderedSections.find((section) => section.id === selectedId) ?? null,
    [orderedSections, selectedId]
  )
  const draft = selected ? (drafts[selected.id] ?? sectionForm(selected)) : null
  const hasUnsavedSectionChanges = Boolean(
    Object.keys(drafts).length &&
    about?.sections.some(
      (section) =>
        JSON.stringify(sectionForm(section)) !==
        JSON.stringify(drafts[section.id])
    )
  )
  const hasUnsavedContactChanges = Boolean(
    contactDraft &&
    about &&
    JSON.stringify({
      title: about.title,
      description: about.description ?? "",
      phone: list(about.phone),
      email: list(about.email),
      address: list(about.address),
    }) !== JSON.stringify(contactDraft)
  )
  const hasUnsavedChanges = hasUnsavedSectionChanges || hasUnsavedContactChanges
  const hasSelectedDraftChanges = Boolean(
    selected &&
      drafts[selected.id] &&
      JSON.stringify(sectionForm(selected)) !== JSON.stringify(drafts[selected.id])
  )
  const visualDraft = useMemo(() => {
    if (!about) return null

    return {
      ...about,
      title: contactDraft?.title ?? about.title,
      description: contactDraft?.description ?? about.description,
      phone: contactDraft?.phone ?? about.phone,
      email: contactDraft?.email ?? about.email,
      address: contactDraft?.address ?? about.address,
      sections: about.sections.map((section) => ({
        ...section,
        ...(drafts[section.id] ?? {}),
      })),
    }
  }, [about, contactDraft, drafts])

  const updateDraft = (patch: Partial<AboutSectionInput>) => {
    if (!selected || !draft) return
    setSaveStates((current) => ({ ...current, [`section:${selected.id}`]: "idle" }))
    setDrafts((current) => ({
      ...current,
      [selected.id]: { ...draft, ...patch },
    }))
  }
  const patchSection = (sectionId: number, patch: Partial<AboutSection>) => {
    updateCachedAbout((current) =>
      current
        ? {
            ...current,
            sections: current.sections.map((section) =>
              section.id === sectionId ? { ...section, ...patch } : section
            ),
          }
        : current
    )
  }
  const createSection = async (template: (typeof sectionTemplates)[number]) => {
    if (!about || orderedSections.some((section) => section.section_type === template.section_type)) return
    setIsCreatingSection(true)
    setNotice("")
    try {
      const section = await aboutUsService.createSection({
        section_type: template.section_type,
        cms_title: "",
        eyebrow: "",
        title: "",
        description: "",
        layout_type: template.layout_type,
        actions: [],
        sort_order: approvedSectionOrder.indexOf(template.section_type),
        is_active: true,
      })
      updateCachedAbout((current) =>
        current ? { ...current, sections: [...current.sections, section] } : current
      )
      setDrafts((current) => ({ ...current, [section.id]: sectionForm(section) }))
      setSelectedId(section.id)
      setNotice("Section added. Add its content and save your changes.")
      void invalidatePublicAbout()
    } catch {
      setNotice("Unable to add this section.")
    } finally {
      setIsCreatingSection(false)
    }
  }

  const sectionFields = (section: AboutSection): Partial<AboutSection> => ({
    section_type: section.section_type,
    cms_title: section.cms_title,
    eyebrow: section.eyebrow,
    title: section.title,
    description: section.description,
    layout_type: section.layout_type,
    actions: section.actions,
    sort_order: section.sort_order,
    is_active: section.is_active,
  })

  const resetDraftsFromCache = () => {
    if (!about) return
    setDrafts(
      Object.fromEntries(
        about.sections.map((section) => [section.id, sectionForm(section)])
      )
    )
    setContactDraft({
      title: about.title,
      description: about.description ?? "",
      phone: list(about.phone),
      email: list(about.email),
      address: list(about.address),
    })
  }

  const saveChanges = async (showNotice = true): Promise<boolean> => {
    if (!about) return false
    setIsSaving(true)
    setSaveStates((current) => ({ ...current, overall: "saving" }))
    try {
      const changedSections = about.sections.filter((section) => {
        const next = drafts[section.id]
        return (
          next && JSON.stringify(sectionForm(section)) !== JSON.stringify(next)
        )
      })
      const updatedSections = await Promise.all(
        changedSections.map(async (section) => ({
          id: section.id,
          section: await aboutUsService.updateSection(
            section.id,
            drafts[section.id]
          ),
        }))
      )
      for (const { id, section } of updatedSections) {
        patchSection(id, sectionFields(section))
        setSaveStates((current) => ({ ...current, [`section:${id}`]: "saved" }))
      }
      if (hasUnsavedContactChanges && contactDraft) {
        const updatedAbout = await aboutUsService.save(contactDraft)
        updateCachedAbout(() => updatedAbout)
        setSaveStates((current) => ({ ...current, contact: "saved" }))
      }
      if (showNotice) {
        setNotice("All outstanding changes saved successfully.")
      }
      setSaveStates((current) => ({ ...current, overall: "saved" }))
      return true
    } catch {
      setSaveStates((current) => ({ ...current, overall: "idle" }))
      setNotice("Unable to save changes. Please try again.")
      return false
    } finally {
      setIsSaving(false)
    }
  }
  const saveSelectedDraft = async () => {
    if (!selected || !draft) return
    const key = `section:${selected.id}`
    if (saveStates[key] === "saving") return

    setSaveStates((current) => ({ ...current, [key]: "saving" }))
    try {
      const updated = await aboutUsService.updateSection(selected.id, draft)
      patchSection(selected.id, sectionFields(updated))
      setDrafts((current) => ({
        ...current,
        [selected.id]: sectionForm(updated),
      }))
      setNotice(`${cmsSectionName(updated)} draft saved.`)
      setSaveStates((current) => ({ ...current, [key]: "saved" }))
    } catch {
      setSaveStates((current) => ({ ...current, [key]: "idle" }))
      setNotice("Unable to save this section. Please try again.")
    }
  }
  const publishChanges = async () => {
    setIsPublishing(true)
    try {
      if (hasUnsavedChanges && !(await saveChanges(false))) {
        return
      }
      const publishedAbout = await aboutUsService.publish()
      updateCachedAbout(() => publishedAbout)
      await invalidatePublicAbout()
      setNotice("Published. The public About Us page now uses these changes.")
    } catch {
      setNotice("Unable to publish changes. Please try again.")
    } finally {
      setIsPublishing(false)
    }
  }
  const cancel = () => {
    resetDraftsFromCache()
    setNotice("Unsaved changes were discarded.")
  }
  const saveContact = async () => {
    if (!about || !contactDraft) return
    if (saveStates.contact === "saving") return
    setSaveStates((current) => ({ ...current, contact: "saving" }))
    try {
      const updatedAbout = await aboutUsService.save(contactDraft)
      updateCachedAbout(() => updatedAbout)
      void invalidatePublicAbout()
      setNotice("Contact information saved.")
      setSaveStates((current) => ({ ...current, contact: "saved" }))
    } catch {
      setSaveStates((current) => ({ ...current, contact: "idle" }))
      setNotice("Unable to save contact information.")
    }
  }
  const toggleVisibility = async () => {
    if (!selected || !draft) return
    setIsUpdatingSection(true)
    try {
      const updated = await aboutUsService.updateSection(selected.id, {
        ...draft,
        is_active: !draft.is_active,
      })
      patchSection(selected.id, sectionFields(updated))
      setDrafts((current) => ({
        ...current,
        [selected.id]: { ...draft, is_active: !draft.is_active },
      }))
      setNotice(
        draft.is_active
          ? "Section hidden from the public page."
          : "Section is visible on the public page."
      )
      void invalidatePublicAbout()
    } catch {
      setNotice("Unable to update section visibility.")
    } finally {
      setIsUpdatingSection(false)
    }
  }
  const replacePrimaryImage = async (file: File | null) => {
    if (!selected || !file) return
    setIsUploadingImage(true)
    try {
      const currentMedia = selected.media[0]
      const currentGalleryImage = selected.gallery_images[0]
      const currentImage = currentMedia ?? currentGalleryImage
      const imageDetails = {
        alt_text: currentImage?.alt_text || selected.title || about?.title || "",
        caption: currentImage?.caption || "",
        sort_order: currentImage?.sort_order ?? 0,
        is_active: true,
      }
      if (currentMedia) {
        const replacement = await aboutUsService.replaceMedia(
          selected.id,
          currentMedia.id,
          file,
          { ...imageDetails, media_type: currentMedia.media_type || "image" }
        )
        patchSection(selected.id, { media: [replacement] })
      } else if (currentGalleryImage) {
        const replacement = await aboutUsService.replaceGalleryImage(
          selected.id,
          currentGalleryImage.id,
          file,
          imageDetails
        )
        patchSection(selected.id, { gallery_images: [replacement] })
      } else {
        const replacement = await aboutUsService.uploadMedia(selected.id, file, {
          ...imageDetails,
          media_type: "image",
        })
        patchSection(selected.id, { media: [replacement] })
      }
      setPendingSectionImage(null)
      setNotice(currentImage ? "Image replaced." : "Image added.")
      void invalidatePublicAbout()
    } catch (error) {
      setNotice(
        uploadErrorMessage(
          error,
          "Unable to replace this image. Your existing image was kept."
        )
      )
    } finally {
      setIsUploadingImage(false)
    }
  }
  const addGalleryImage = async (file: File | null, sortOrder?: number) => {
    if (!selected || !file) return
    setIsUploadingImage(true)
    try {
      const image = await aboutUsService.uploadGalleryImage(selected.id, file, {
        alt_text: selected.title || about?.title || "",
        sort_order: sortOrder ?? selected.gallery_images.length,
        is_active: true,
      })
      patchSection(selected.id, {
        gallery_images: [...selected.gallery_images, image],
      })
      setNotice("Gallery image added.")
      void invalidatePublicAbout()
    } catch (error) {
      setNotice(uploadErrorMessage(error, "Unable to upload this image."))
    } finally {
      setIsUploadingImage(false)
    }
  }
  const replaceGalleryImage = async (imageId: number, file: File): Promise<boolean> => {
    if (!selected) return false
    const currentImage = selected.gallery_images.find((image) => image.id === imageId)
    if (!currentImage) return false

    setIsUploadingImage(true)
    try {
      const replacement = await aboutUsService.replaceGalleryImage(selected.id, currentImage.id, file, {
        alt_text: currentImage.alt_text ?? "",
        caption: currentImage.caption ?? "",
        sort_order: currentImage.sort_order,
        is_active: true,
      })
      patchSection(selected.id, {
        gallery_images: selected.gallery_images.map((image) =>
          image.id === currentImage.id ? replacement : image
        ),
      })
      setNotice("Gallery image replaced.")
      void invalidatePublicAbout()
      return true
    } catch (error) {
      setNotice(
        uploadErrorMessage(
          error,
          "Unable to replace this gallery image. Your existing image was kept."
        )
      )
      return false
    } finally {
      setIsUploadingImage(false)
    }
  }
  const removeGalleryImage = async (imageId: number): Promise<boolean> => {
    if (!selected) return false
    try {
      await aboutUsService.removeGalleryImage(selected.id, imageId)
      patchSection(selected.id, {
        gallery_images: selected.gallery_images.filter((image) => image.id !== imageId),
      })
      setNotice("Gallery image removed.")
      void invalidatePublicAbout()
      return true
    } catch {
      setNotice("Unable to remove this gallery image.")
      return false
    }
  }
  const removePrimaryImage = async () => {
    if (!selected) return
    const currentMedia = selected.media[0]
    const currentGalleryImage = selected.gallery_images[0]
    if (!currentMedia && !currentGalleryImage) return
    setIsUploadingImage(true)
    try {
      if (currentMedia) {
        await aboutUsService.removeMedia(selected.id, currentMedia.id)
        patchSection(selected.id, { media: selected.media.slice(1) })
      } else if (currentGalleryImage) {
        await aboutUsService.removeGalleryImage(selected.id, currentGalleryImage.id)
        patchSection(selected.id, {
          gallery_images: selected.gallery_images.slice(1),
        })
      }
      setPendingSectionImage(null)
      setNotice("Section image removed.")
    } catch {
      setNotice("Unable to remove this image.")
    } finally {
      setIsUploadingImage(false)
    }
  }
  const saveItem = async (item: AboutItem): Promise<boolean> => {
    if (!selected) return false
    try {
      const updated = await aboutUsService.updateItem(selected.id, item.id, {
        title: item.title,
        description: item.description ?? "",
        icon: item.icon ?? null,
        link_url: item.link_url ?? null,
        sort_order: item.sort_order,
        is_active: item.is_active,
      })
      patchSection(selected.id, {
        items: selected.items.map((entry) =>
          entry.id === updated.id ? updated : entry
        ),
      })
      setNotice("Content item saved.")
      void invalidatePublicAbout()
      return true
    } catch {
      setNotice("Unable to save this item.")
      return false
    }
  }
  const addItem = async () => {
    if (!selected || !newItem.title.trim()) return
    try {
      const item = await aboutUsService.createItem(selected.id, {
        title: newItem.title,
        description: newItem.description,
        icon: newItem.icon || null,
        link_url: newItem.link_url || null,
        sort_order: selected.items.length,
        is_active: true,
      })
      patchSection(selected.id, { items: [...selected.items, item] })
      setNewItem({ title: "", description: "", icon: "", link_url: "" })
      setNotice("Content item added.")
      void invalidatePublicAbout()
    } catch {
      setNotice("Unable to add this item.")
    }
  }
  const saveFaq = async (entry: FaqDraft): Promise<boolean> => {
    if (!about || !entry.question.trim() || !entry.answer.trim()) {
      setNotice("Every FAQ needs both a question and an answer.")
      return false
    }

    try {
      const input = {
        question: entry.question.trim(),
        answer: entry.answer.trim(),
        sort_order: entry.id === null ? about.faqs.length : entry.sort_order,
        is_active: entry.is_active,
      }
      const saved = entry.id === null
        ? await aboutUsService.createFaq(input)
        : await aboutUsService.updateFaq(entry.id, input)
      updateCachedAbout((current) => current ? {
        ...current,
        faqs: [...current.faqs.filter((faq) => faq.id !== saved.id), saved]
          .sort((first, second) => first.sort_order - second.sort_order),
      } : current)
      setNotice(entry.id === null ? "Question added successfully." : "Question saved successfully.")
      void invalidatePublicAbout()
      return true
    } catch {
      setNotice("Unable to save this question. Please try again.")
      return false
    }
  }
  const moveItem = async (itemId: number, direction: -1 | 1) => {
    if (!selected) return
    const items = [...selected.items].sort((a, b) => a.sort_order - b.sort_order)
    const currentIndex = items.findIndex((item) => item.id === itemId)
    const nextIndex = currentIndex + direction
    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= items.length) return

    const current = items[currentIndex]
    const target = items[nextIndex]
    try {
      const [updatedCurrent, updatedTarget] = await Promise.all([
        aboutUsService.updateItem(selected.id, current.id, {
          ...current,
          sort_order: target.sort_order,
        }),
        aboutUsService.updateItem(selected.id, target.id, {
          ...target,
          sort_order: current.sort_order,
        }),
      ])
      patchSection(selected.id, {
        items: selected.items.map((item) =>
          item.id === updatedCurrent.id
            ? updatedCurrent
            : item.id === updatedTarget.id
              ? updatedTarget
              : item
        ),
      })
      void invalidatePublicAbout()
    } catch {
      setNotice("Unable to change item order.")
    }
  }
  const moveGalleryImage = async (imageId: number, direction: -1 | 1) => {
    if (!selected) return
    const images = [...selected.gallery_images].sort(
      (a, b) => a.sort_order - b.sort_order
    )
    const currentIndex = images.findIndex((image) => image.id === imageId)
    const nextIndex = currentIndex + direction
    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= images.length) return

    const current = images[currentIndex]
    const target = images[nextIndex]
    try {
      const [updatedCurrent, updatedTarget] = await Promise.all([
        aboutUsService.updateGalleryImage(selected.id, current.id, {
          ...current,
          sort_order: target.sort_order,
        }),
        aboutUsService.updateGalleryImage(selected.id, target.id, {
          ...target,
          sort_order: current.sort_order,
        }),
      ])
      patchSection(selected.id, {
        gallery_images: selected.gallery_images.map((image) =>
          image.id === updatedCurrent.id
            ? updatedCurrent
            : image.id === updatedTarget.id
              ? updatedTarget
              : image
        ),
      })
      void invalidatePublicAbout()
    } catch {
      setNotice("Unable to change gallery image order.")
    }
  }
  const saveGalleryImage = async (
    imageId: number,
    altText: string,
    caption: string
  ): Promise<boolean> => {
    if (!selected) return false
    const image = selected.gallery_images.find((entry) => entry.id === imageId)
    if (!image) return false
    try {
      const updated = await aboutUsService.updateGalleryImage(selected.id, imageId, {
        ...image,
        alt_text: altText,
        caption,
      })
      patchSection(selected.id, {
        gallery_images: selected.gallery_images.map((entry) =>
          entry.id === updated.id ? updated : entry
        ),
      })
      setNotice("Gallery image details saved.")
      void invalidatePublicAbout()
      return true
    } catch {
      setNotice("Unable to save gallery image details.")
      return false
    }
  }
  const moveFaq = async (faqId: number, direction: -1 | 1): Promise<boolean> => {
    if (!about) return false
    const faqs = [...about.faqs].sort((a, b) => a.sort_order - b.sort_order)
    const currentIndex = faqs.findIndex((faq) => faq.id === faqId)
    const nextIndex = currentIndex + direction
    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= faqs.length) return false
    const reordered = [...faqs]
    ;[reordered[currentIndex], reordered[nextIndex]] = [reordered[nextIndex], reordered[currentIndex]]
    try {
      const updatedFaqs = await Promise.all(reordered.map((faq, index) =>
        aboutUsService.updateFaq(faq.id, { ...faq, sort_order: index })
      ))
      updateCachedAbout((cached) =>
        cached
          ? {
              ...cached,
              faqs: updatedFaqs,
            }
          : cached
      )
      setNotice("Question order saved.")
      void invalidatePublicAbout()
      return true
    } catch {
      setNotice("Unable to change question order.")
      return false
    }
  }

  if (isLoading)
    return (
      <div className="py-16 text-center text-brand-gray-3">
        Loading About Us editor…
      </div>
    )
  if (!about)
    return (
      <CreateAboutPage
        onCreate={async (title) => {
          const created = await aboutUsService.save({
            title,
            description: "",
            phone: [],
            email: [],
            address: [],
          })
          updateCachedAbout(() => created)
          void invalidatePublicAbout()
        }}
      />
    )

  return (
    <div className="mx-auto max-w-7xl pb-12">
      <header className="sticky top-0 z-20 -mx-4 border-b border-[#e3e9df] bg-[#f8faf6]/95 px-4 py-4 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
              Website content
            </p>
            <h2 className="mt-1 font-serif text-3xl tracking-[-0.05em] text-brand">
              About Us
            </h2>
            <p className="mt-1 text-xs text-brand-light">
              {hasUnsavedChanges
                ? "Unsaved changes"
                : about?.is_published
                  ? "Published"
                  : "Draft only — not visible on the public website"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              className="inline-flex h-9 items-center gap-1 rounded-full border border-[#dce4da] bg-white px-3 text-sm font-medium text-brand"
              href="/about?preview=1"
              rel="noreferrer"
              target="_blank"
            >
              <Eye size={16} /> Preview
            </a>
            <Button
              isDisabled={isSaving || isPublishing || !hasUnsavedChanges}
              onPress={() => void cancel()}
              variant="outline"
            >
              <X size={16} /> Cancel
            </Button>
            <Button
              isDisabled={isSaving || isPublishing || !hasUnsavedChanges}
              onPress={() => void saveChanges()}
              variant="outline"
            >
              <SaveLabel label="Save all" state={saveStates.overall ?? "idle"} />
            </Button>
            <Button
              isDisabled={isSaving || isPublishing}
              onPress={() => void publishChanges()}
            >
              <Check size={16} /> {isPublishing ? "Publishing…" : "Publish"}
            </Button>
          </div>
        </div>
      </header>
      {error || notice ? (
        <Alert
          className={`mt-6 ${error || notice.startsWith("Unable") ? "border-red-200 bg-red-50 text-red-700" : "border-[#d8e5d3] bg-[#f3f8ef] text-brand-4"}`}
        >
          <AlertDescription>{error || notice}</AlertDescription>
        </Alert>
      ) : null}
      <section className="mt-6 overflow-hidden border border-[#d8e5d3] bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e3e9df] bg-[#f5f8f1] px-5 py-3">
          <div>
            <p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
              Visual page canvas
            </p>
            <p className="mt-1 text-xs text-brand-light">
              This is the live draft in the exact approved public About Us layout.
            </p>
          </div>
          {selected ? (
            <Button
              onPress={() =>
                document
                  .getElementById("about-section-controls")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              size="sm"
              variant="outline"
            >
              Edit {cmsSectionName(selected)}
            </Button>
          ) : null}
        </div>
        {visualDraft ? (
          <AboutUsContent
            about={visualDraft}
            onEditSection={(sectionType) => {
              const section = orderedSections.find(
                (entry) => entry.section_type === sectionType
              )
              if (!section) return
              setSelectedId(section.id)
              window.setTimeout(() => {
                document
                  .getElementById("about-section-controls")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }, 0)
            }}
          />
        ) : null}
      </section>
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(280px,.72fr)_minmax(0,1.28fr)]">
        <aside className="border border-[#e3e9df] bg-white p-4">
          <p className="px-2 text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
            Page sections
          </p>
          <div className="mt-3 space-y-2">
            {orderedSections.map((section, index) => (
              <button
                className={`w-full border p-4 text-left transition-colors ${selectedId === section.id ? "border-brand-3 bg-[#f3f8ef]" : "border-[#e3e9df] bg-white hover:bg-[#f7faf4]"}`}
                key={section.id}
                onClick={() => setSelectedId(section.id)}
                type="button"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold tracking-[0.12em] text-brand-gray-3 uppercase">
                    {index + 1}. {cmsSectionName(section)}
                  </span>
                  {section.is_active ? (
                    <Eye size={16} className="text-brand-3" />
                  ) : (
                    <EyeSlash size={16} className="text-brand-gray-3" />
                  )}
                </div>
                <p className="mt-2 font-serif text-xl text-brand">
                  {section.title || "Untitled section"}
                </p>
                <p className="mt-1 text-xs text-brand-light">
                  {section.items.length} content items
                  {approvedImageCount(section) > 0
                    ? ` · ${approvedImageCount(section)} images`
                    : ""}
                </p>
              </button>
            ))}
          </div>
          <div className="mt-5 border-t border-[#e3e9df] pt-4">
            <p className="text-xs font-semibold text-brand">Restore a missing page section</p>
            <p className="mt-1 text-xs leading-5 text-brand-light">
              These fixed sections keep the approved public About Us layout intact.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sectionTemplates
                .filter(
                  (template) =>
                    !orderedSections.some(
                      (section) => section.section_type === template.section_type
                    )
                )
                .map((template) => (
                  <Button
                    isDisabled={isCreatingSection}
                    key={template.section_type}
                    onPress={() => void createSection(template)}
                    size="sm"
                    variant="outline"
                  >
                    <Plus size={14} /> {template.label}
                  </Button>
                ))}
            </div>
          </div>
        </aside>
        {selected && draft ? (
          <section className="border border-[#e3e9df] bg-white" id="about-section-controls">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#e3e9df] p-5">
              <div>
                <p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
                  Editing section
                </p>
                <h3 className="mt-1 font-serif text-3xl text-brand">
                  {draft.cms_title?.trim() || cmsSectionName(selected)}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  isDisabled={saveStates[`section:${selected.id}`] === "saving" || isUpdatingSection || !hasSelectedDraftChanges}
                  onPress={() => void saveSelectedDraft()}
                  size="sm"
                >
                  <SaveLabel label="Save" state={saveStates[`section:${selected.id}`] ?? "idle"} />
                </Button>
                <Button
                  isDisabled={isUpdatingSection}
                  onPress={() => void toggleVisibility()}
                  size="sm"
                  variant="outline"
                >
                  {draft.is_active ? <EyeSlash size={15} /> : <Eye size={15} />}
                  {draft.is_active ? "Hide" : "Show"}
                </Button>
              </div>
            </div>
            <div className="space-y-6 p-5">
              <EditorField
                label="Section name (shown in the CMS)"
                value={draft.cms_title ?? ""}
                onChange={(cms_title) => updateDraft({ cms_title })}
              />
              <EditorField
                label="Public section label (shown above the heading)"
                value={draft.eyebrow ?? ""}
                onChange={(eyebrow) => updateDraft({ eyebrow })}
              />
              <EditorField
                label={selected.section_type === "hero" ? "Heading accent" : "Heading"}
                value={draft.title ?? ""}
                onChange={(title) => updateDraft({ title })}
              />
              {selected.section_type === "hero" && contactDraft ? (
                <EditorField
                  label="Main heading"
                  value={contactDraft.title}
                  onChange={(title) => {
                    setSaveStates((current) => ({ ...current, contact: "idle" }))
                    setContactDraft({ ...contactDraft, title })
                  }}
                />
              ) : null}
              <EditorArea
                label="Description"
                value={draft.description ?? ""}
                onChange={(description) => updateDraft({ description })}
              />
              {selected.section_type === "hero" ||
              selected.section_type === "local_feature" ||
              selected.section_type === "faq" ? (
                <div className="border-t border-[#e3e9df] pt-5">
                  <p className="text-xs font-semibold text-brand">Buttons</p>
                  <div className="mt-3 space-y-3">
                    {(draft.actions ?? []).map((action, index) => (
                      <div className="grid gap-3 sm:grid-cols-2" key={index}>
                        <Input
                          aria-label="Button label"
                          value={action.label}
                          onChange={(event) =>
                            updateDraft({
                              actions: (draft.actions ?? []).map(
                                (entry, entryIndex) =>
                                  entryIndex === index
                                    ? { ...entry, label: event.target.value }
                                    : entry
                              ),
                            })
                          }
                        />
                        <Input
                          aria-label="Button URL"
                          value={action.href}
                          onChange={(event) =>
                            updateDraft({
                              actions: (draft.actions ?? []).map(
                                (entry, entryIndex) =>
                                  entryIndex === index
                                    ? { ...entry, href: event.target.value }
                                    : entry
                              ),
                            })
                          }
                        />
                        <Button
                          aria-label="Remove button"
                          className="sm:col-span-2 sm:justify-self-start"
                          onPress={() =>
                            updateDraft({
                              actions: (draft.actions ?? []).filter(
                                (_, actionIndex) => actionIndex !== index
                              ),
                            })
                          }
                          size="sm"
                          variant="destructive"
                        >
                          <Trash size={14} /> Remove button
                        </Button>
                      </div>
                    ))}
                    <Button
                      onPress={() =>
                        updateDraft({
                          actions: [
                            ...(draft.actions ?? []),
                            { label: "", href: "" },
                          ],
                        })
                      }
                      size="sm"
                      variant="outline"
                    >
                      <Plus size={14} /> Add button
                    </Button>
                  </div>
                </div>
              ) : null}
              {selected.section_type === "culture" ? (
                <GalleryEditor
                  canAdd={selected.gallery_images.length < 6}
                  isUploading={isUploadingImage}
                  section={selected}
                  onAdd={addGalleryImage}
                  onRemove={removeGalleryImage}
                  onMove={moveGalleryImage}
                  onReplace={replaceGalleryImage}
                  onSave={saveGalleryImage}
                />
              ) : ["hero", "local_feature", "values"].includes(
                  selected.section_type
                ) ? (
                <div className="border-t border-[#e3e9df] pt-5">
                  <p className="mb-3 text-xs font-semibold text-brand">
                    Section image
                  </p>
                  <ImageUploader
                    existingImage={resolveMediaUrl(
                      (selected.media[0] ?? selected.gallery_images[0])?.url
                    )}
                    disabled={isUploadingImage}
                    label={
                      selected.media[0] || selected.gallery_images[0]
                        ? "Section image"
                        : "Add section image"
                    }
                    onChange={setPendingSectionImage}
                    previewAlt={
                      (selected.media[0] ?? selected.gallery_images[0])
                        ?.alt_text ??
                      selected.title ??
                      "About section"
                    }
                    value={pendingSectionImage}
                  />
                  {pendingSectionImage ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        isDisabled={isUploadingImage}
                        onPress={() => void replacePrimaryImage(pendingSectionImage)}
                        size="sm"
                      >
                        <Check size={15} /> Confirm replacement
                      </Button>
                      <Button
                        isDisabled={isUploadingImage}
                        onPress={() => setPendingSectionImage(null)}
                        size="sm"
                        variant="outline"
                      >
                        <X size={15} /> Keep current image
                      </Button>
                    </div>
                  ) : null}
                  {selected.media[0] || selected.gallery_images[0] ? (
                    <Button
                      className="mt-3"
                      isDisabled={isUploadingImage || Boolean(pendingSectionImage)}
                      onPress={() => void removePrimaryImage()}
                      size="sm"
                      variant="destructive"
                    >
                      <Trash size={15} /> Remove saved image
                    </Button>
                  ) : null}
                </div>
              ) : null}
              {selected.section_type !== "hero" &&
              selected.section_type !== "culture" &&
              selected.section_type !== "faq" ? (
                <ItemsEditor
                  items={selected.items}
                  onAdd={addItem}
                  onChange={setNewItem}
                  onRemove={async (id) => {
                    await aboutUsService.removeItem(selected.id, id)
                    patchSection(selected.id, {
                      items: selected.items.filter((item) => item.id !== id),
                    })
                    void invalidatePublicAbout()
                    setNotice("Content item removed.")
                  }}
                  onSave={saveItem}
                  onMove={moveItem}
                  value={newItem}
                  canAdd={
                    selected.section_type !== "introduction" ||
                    selected.items.length < 6
                  }
                />
              ) : null}
              {selected.section_type === "faq" ? (
                <FaqEditor
                  faqs={about.faqs}
                  onRemove={async (id) => {
                    try {
                      await aboutUsService.removeFaq(id)
                      const remaining = about.faqs
                        .filter((faq) => faq.id !== id)
                        .sort((first, second) => first.sort_order - second.sort_order)
                      const reordered = await Promise.all(
                        remaining.map((faq, index) =>
                          aboutUsService.updateFaq(faq.id, {
                            ...faq,
                            sort_order: index,
                          })
                        )
                      )
                      updateCachedAbout((current) => current ? {
                        ...current,
                        faqs: reordered,
                      } : current)
                      void invalidatePublicAbout()
                      setNotice("Question removed successfully.")
                      return true
                    } catch {
                      setNotice("Unable to remove this question. Please try again.")
                      return false
                    }
                  }}
                  onSave={saveFaq}
                  onMove={moveFaq}
                />
              ) : null}
            </div>
          </section>
        ) : null}
      </div>
      {contactDraft ? (
        <ContactSettings
          draft={contactDraft}
          isSaving={isSaving}
          saveState={saveStates.contact ?? "idle"}
          onChange={(next) => {
            setSaveStates((current) => ({ ...current, contact: "idle" }))
            setContactDraft(next)
          }}
          onSave={() => void saveContact()}
        />
      ) : null}
    </div>
  )
}

function EditorField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-semibold text-brand">{label}</span>
      <Input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}
function EditorArea({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-semibold text-brand">{label}</span>
      <RichTextEditor
        height={260}
        minHeight={180}
        onChange={(nextValue) => onChange(nextValue ?? "")}
        placeholder="Write this section's description…"
        value={value}
      />
    </label>
  )
}

function ItemsEditor({
  items,
  value,
  onChange,
  onAdd,
  onSave,
  onRemove,
  onMove,
  canAdd,
}: {
  items: AboutItem[]
  value: { title: string; description: string; icon: string; link_url: string }
  onChange: (value: { title: string; description: string; icon: string; link_url: string }) => void
  onAdd: () => void
  onSave: (item: AboutItem) => Promise<boolean>
  onRemove: (id: number) => Promise<void>
  onMove: (id: number, direction: -1 | 1) => Promise<void>
  canAdd: boolean
}) {
  const [editing, setEditing] = useState<
    Record<number, { title: string; description: string; icon: string; link_url: string }>
  >({})
  const [saveStates, setSaveStates] = useState<Record<number, SaveState>>({})
  return (
    <section className="border-t border-[#e3e9df] pt-5">
      <p className="text-xs font-semibold text-brand">Content items</p>
      <div className="mt-3 space-y-3">
        {items.map((item) => {
          const current = editing[item.id] ?? {
            title: item.title,
            description: item.description ?? "",
            icon: item.icon ?? "",
            link_url: item.link_url ?? "",
          }
          return (
            <div className="border border-[#e3e9df] p-4" key={item.id}>
              <Input
                value={current.title}
                onChange={(event) =>
                  { setSaveStates((states) => ({ ...states, [item.id]: "idle" })); setEditing({ ...editing, [item.id]: { ...current, title: event.target.value } }) }
                }
              />
              <Textarea
                className="mt-2 min-h-24"
                placeholder="Item description"
                value={current.description}
                onChange={(event) =>
                  { setSaveStates((states) => ({ ...states, [item.id]: "idle" })); setEditing({ ...editing, [item.id]: { ...current, description: event.target.value } }) }
                }
              />
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <Input
                  placeholder="Optional icon name"
                  value={current.icon}
                  onChange={(event) =>
                  { setSaveStates((states) => ({ ...states, [item.id]: "idle" })); setEditing({ ...editing, [item.id]: { ...current, icon: event.target.value } }) }
                  }
                />
                <Input
                  placeholder="Optional link URL"
                  value={current.link_url}
                  onChange={(event) =>
                  { setSaveStates((states) => ({ ...states, [item.id]: "idle" })); setEditing({ ...editing, [item.id]: { ...current, link_url: event.target.value } }) }
                  }
                />
              </div>
              <div className="mt-3 flex gap-2">
                <Button
                  aria-label="Move item up"
                  onPress={() => void onMove(item.id, -1)}
                  size="icon-sm"
                  variant="outline"
                >
                  <CaretUp size={15} />
                </Button>
                <Button
                  aria-label="Move item down"
                  onPress={() => void onMove(item.id, 1)}
                  size="icon-sm"
                  variant="outline"
                >
                  <CaretDown size={15} />
                </Button>
                <Button
                  isDisabled={saveStates[item.id] === "saving"}
                  onPress={async () => {
                    setSaveStates((states) => ({ ...states, [item.id]: "saving" }))
                    const saved = await onSave({ ...item, ...current })
                    setSaveStates((states) => ({ ...states, [item.id]: saved ? "saved" : "idle" }))
                  }}
                  size="sm"
                >
                  <SaveLabel label="Save" state={saveStates[item.id] ?? "idle"} />
                </Button>
                <Button
                  onPress={() => void onRemove(item.id)}
                  size="sm"
                  variant="destructive"
                >
                  <Trash size={15} /> Remove
                </Button>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-4 border border-dashed border-[#cfdccb] p-4">
        <Input
          placeholder="New item heading"
          value={value.title}
          onChange={(event) =>
            onChange({ ...value, title: event.target.value })
          }
        />
        <Textarea
          className="mt-2 min-h-24"
          placeholder="New item description"
          value={value.description}
          onChange={(event) =>
            onChange({ ...value, description: event.target.value })
          }
        />
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <Input
            placeholder="Optional icon name"
            value={value.icon}
            onChange={(event) => onChange({ ...value, icon: event.target.value })}
          />
          <Input
            placeholder="Optional link URL"
            value={value.link_url}
            onChange={(event) => onChange({ ...value, link_url: event.target.value })}
          />
        </div>
        <Button className="mt-3" isDisabled={!canAdd} onPress={onAdd} size="sm" variant="outline">
          <Plus size={15} /> Add item
        </Button>
      </div>
    </section>
  )
}

function GalleryEditor({
  section,
  onAdd,
  onRemove,
  isUploading,
  onMove,
  onReplace,
  onSave,
  canAdd,
}: {
  section: AboutSection
  onAdd: (file: File | null, sortOrder?: number) => Promise<void>
  onRemove: (id: number) => Promise<boolean>
  isUploading: boolean
  onMove: (id: number, direction: -1 | 1) => Promise<void>
  onReplace: (id: number, file: File) => Promise<boolean>
  onSave: (id: number, altText: string, caption: string) => Promise<boolean>
  canAdd: boolean
}) {
  const [details, setDetails] = useState<
    Record<number, { altText: string; caption: string }>
  >({})
  const [pendingImage, setPendingImage] = useState<{
    file: File
    sortOrder: number
  } | null>(null)
  const [pendingReplacement, setPendingReplacement] = useState<{
    id: number
    file: File
    preview: string
  } | null>(null)
  const [saveStates, setSaveStates] = useState<Record<number, SaveState>>({})
  useEffect(
    () => () => {
      if (pendingReplacement) URL.revokeObjectURL(pendingReplacement.preview)
    },
    [pendingReplacement]
  )
  return (
    <section className="border-t border-[#e3e9df] pt-5">
      <p className="mb-3 text-xs font-semibold text-brand">Image gallery</p>
      <p className="mb-3 text-xs text-brand-light">
        {section.gallery_images.length} of 6 photos uploaded
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {section.gallery_images.map((image) => {
          const current = details[image.id] ?? {
            altText: image.alt_text ?? "",
            caption: image.caption ?? "",
          }
          return (
          <div className="relative border border-[#e3e9df] p-2" key={image.id}>
            <Image
              alt={image.alt_text ?? section.title ?? "Gallery image"}
              className="aspect-[4/3] w-full object-cover"
              height={480}
              src={resolveMediaUrl(image.url)}
              unoptimized
              width={640}
            />
            <Button
              aria-label="Remove gallery image"
              className="absolute top-2 right-2 bg-white"
              isDisabled={isUploading}
              onPress={() => void onRemove(image.id)}
              size="icon-sm"
              variant="destructive"
            >
              <Trash size={14} />
            </Button>
            <div className="mt-2 grid grid-cols-[auto_auto_minmax(0,1fr)] items-center gap-1.5">
              <Button aria-label="Move gallery image up" isDisabled={isUploading} onPress={() => void onMove(image.id, -1)} size="icon-xs" variant="outline">
                <CaretUp size={15} />
              </Button>
              <Button aria-label="Move gallery image down" isDisabled={isUploading} onPress={() => void onMove(image.id, 1)} size="icon-xs" variant="outline">
                <CaretDown size={15} />
              </Button>
              <Button
                className="min-w-0 w-full px-2 text-xs"
                isDisabled={isUploading}
                onPress={() =>
                  document.getElementById(`gallery-replace-${image.id}`)?.click()
                }
                size="sm"
                variant="outline"
              >
                Replace image
              </Button>
              <input
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                id={`gallery-replace-${image.id}`}
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (file)
                    setPendingReplacement({
                      id: image.id,
                      file,
                      preview: URL.createObjectURL(file),
                    })
                  event.target.value = ""
                }}
                type="file"
              />
            </div>
            {pendingReplacement?.id === image.id ? (
              <div className="mt-2 rounded border border-[#d8e5d3] bg-[#f5f8f1] p-2">
                <Image
                  alt="New gallery image preview"
                  className="aspect-[4/3] w-full object-cover"
                  height={480}
                  src={pendingReplacement.preview}
                  unoptimized
                  width={640}
                />
                <div className="mt-2 flex flex-col gap-2">
                  <Button
                    className="w-full min-w-0 px-2 text-xs"
                    isDisabled={isUploading}
                    onPress={async () => {
                      const replaced = await onReplace(image.id, pendingReplacement.file)
                      if (replaced) setPendingReplacement(null)
                    }}
                    size="sm"
                  >
                    <Check size={14} /> Confirm
                  </Button>
                  <Button
                    className="w-full min-w-0 px-2 text-xs"
                    isDisabled={isUploading}
                    onPress={() => setPendingReplacement(null)}
                    size="sm"
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : null}
            <Input
              className="mt-2"
              placeholder="Image description for accessibility"
              value={current.altText}
              onChange={(event) =>
                { setSaveStates((states) => ({ ...states, [image.id]: "idle" })); setDetails({ ...details, [image.id]: { ...current, altText: event.target.value } }) }
              }
            />
            <Input
              className="mt-2"
              placeholder="Optional image caption"
              value={current.caption}
              onChange={(event) =>
                { setSaveStates((states) => ({ ...states, [image.id]: "idle" })); setDetails({ ...details, [image.id]: { ...current, caption: event.target.value } }) }
              }
            />
            <Button className="mt-2 w-full px-2 text-xs" isDisabled={saveStates[image.id] === "saving"} onPress={async () => {
              setSaveStates((states) => ({ ...states, [image.id]: "saving" }))
              const saved = await onSave(image.id, current.altText, current.caption)
              setSaveStates((states) => ({ ...states, [image.id]: saved ? "saved" : "idle" }))
            }} size="sm" variant="outline">
              <SaveLabel label="Save" state={saveStates[image.id] ?? "idle"} />
            </Button>
          </div>
          )
        })}
        {Array.from(
          { length: Math.max(0, 6 - section.gallery_images.length) },
          (_, index) => {
            const sortOrder = section.gallery_images.length + index
            const isPending = pendingImage?.sortOrder === sortOrder
            return (
              <div className="border border-dashed border-[#cfdccb] p-2" key={`empty-${sortOrder}`}>
                <ImageUploader
                  disabled={isUploading || !canAdd}
                  label={`Add photo ${sortOrder + 1} of 6`}
                  onChange={(file) =>
                    setPendingImage(file ? { file, sortOrder } : null)
                  }
                  previewAlt={`Gallery photo ${sortOrder + 1} preview`}
                  value={isPending ? pendingImage.file : null}
                />
                {isPending ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button
                      isDisabled={isUploading}
                      onPress={async () => {
                        await onAdd(pendingImage.file, sortOrder)
                        setPendingImage(null)
                      }}
                      size="sm"
                    >
                      <Check size={14} /> Confirm upload
                    </Button>
                    <Button
                      isDisabled={isUploading}
                      onPress={() => setPendingImage(null)}
                      size="sm"
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : null}
              </div>
            )
          }
        )}
      </div>
    </section>
  )
}

type FaqDraft = {
  id: number | null
  question: string
  answer: string
  sort_order: number
  is_active: boolean
}

function FaqEditor({
  faqs,
  onSave,
  onRemove,
  onMove,
}: {
  faqs: AboutFaq[]
  onSave: (entry: FaqDraft) => Promise<boolean>
  onRemove: (id: number) => Promise<boolean>
  onMove: (id: number, direction: -1 | 1) => Promise<boolean>
}) {
  const [items, setItems] = useState<FaqDraft[]>(() =>
    [...faqs].sort((first, second) => first.sort_order - second.sort_order).map((faq) => ({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
      sort_order: faq.sort_order,
      is_active: faq.is_active,
    }))
  )
  const [editingId, setEditingId] = useState<number | "new" | null>(null)
  const [draft, setDraft] = useState<FaqDraft | null>(null)
  const [validationError, setValidationError] = useState("")
  const [saveStates, setSaveStates] = useState<Record<string, SaveState>>({})

  useEffect(() => {
    setItems(
      [...faqs].sort((first, second) => first.sort_order - second.sort_order).map((faq) => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        sort_order: faq.sort_order,
        is_active: faq.is_active,
      }))
    )
  }, [faqs])

  const stateFor = (key: string): SaveState => saveStates[key] ?? "idle"
  const setState = (key: string, state: SaveState) => {
    setSaveStates((current) => ({ ...current, [key]: state }))
  }

  const openAdd = () => {
    setValidationError("")
    setDraft({ id: null, question: "", answer: "", sort_order: items.length, is_active: true })
    setEditingId("new")
  }

  const openEdit = (faq: FaqDraft) => {
    setValidationError("")
    setDraft({ ...faq })
    setEditingId(faq.id)
  }

  const saveDraft = async () => {
    if (!draft || editingId === null) return
    if (!draft.question.trim() || !draft.answer.trim()) {
      setValidationError("Every FAQ needs both a question and an answer.")
      return
    }

    setValidationError("")
    const key = editingId === "new" ? "new" : String(editingId)
    setState(key, "saving")
    const saved = await onSave(draft)
    setState(key, saved ? "saved" : "idle")
    if (saved) {
      setDraft(null)
      setEditingId(null)
    }
  }

  const move = async (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction
    const item = items[index]
    if (!item || item.id === null || targetIndex < 0 || targetIndex >= items.length) return

    const previous = items
    const reordered = [...items]
    ;[reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]]
    setItems(reordered)
    setState(String(item.id), "saving")
    const saved = await onMove(item.id, direction)
    setState(String(item.id), saved ? "saved" : "idle")
    if (!saved) setItems(previous)
  }

  const remove = async (faq: FaqDraft) => {
    if (faq.id === null) return
    setState(String(faq.id), "saving")
    const saved = await onRemove(faq.id)
    setState(String(faq.id), saved ? "saved" : "idle")
    if (saved) {
      setItems((current) => current.filter((item) => item.id !== faq.id))
      if (editingId === faq.id) {
        setEditingId(null)
        setDraft(null)
      }
    }
  }

  return (
    <section className="border-t border-[#e3e9df] pt-5">
      <p className="text-xs font-semibold text-brand">Questions and answers</p>
      <div className="mt-3 space-y-3">
        {items.map((faq, index) => {
          const key = String(faq.id)
          const isEditing = editingId === faq.id
          const state = stateFor(key)
          return <div className="border border-[#e3e9df] p-4" key={faq.id}>
            {isEditing && draft ? <>
              <Input aria-label={`Question ${index + 1}`} placeholder="Question" value={draft.question} onChange={(event) => { setState(key, "idle"); setDraft({ ...draft, question: event.target.value }) }} />
              <Textarea className="mt-2 min-h-24" placeholder="Answer" value={draft.answer} onChange={(event) => { setState(key, "idle"); setDraft({ ...draft, answer: event.target.value }) }} />
              <div className="mt-3 flex flex-wrap gap-2"><Button isDisabled={state === "saving"} onPress={() => void saveDraft()} size="sm"><SaveLabel label="Save" state={state} /></Button><Button onPress={() => { setEditingId(null); setDraft(null); setValidationError("") }} size="sm" variant="outline">Cancel</Button></div>
            </> : <>
              <div className="flex gap-3"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-yellow-bg text-xs font-bold text-brand-4">{index + 1}</span><div className="min-w-0"><p className="font-semibold text-brand">{faq.question}</p><p className="mt-1 text-sm leading-6 text-brand-light">{faq.answer}</p></div></div>
              <div className="mt-3 flex flex-wrap gap-2"><Button onPress={() => openEdit(faq)} size="sm" variant="outline">Edit</Button><Button isDisabled={index === 0 || state === "saving"} onPress={() => void move(index, -1)} size="sm" variant="outline"><CaretUp size={15} /> Move up</Button><Button isDisabled={index === items.length - 1 || state === "saving"} onPress={() => void move(index, 1)} size="sm" variant="outline"><CaretDown size={15} /> Move down</Button><Button isDisabled={state === "saving"} onPress={() => void remove(faq)} size="sm" variant="destructive"><Trash size={15} /> {state === "saving" ? "Removing…" : "Remove"}</Button></div>
            </>}
          </div>
        })}
        {editingId === "new" && draft ? <div className="border border-[#e3e9df] p-4"><Input aria-label="New question" placeholder="Question" value={draft.question} onChange={(event) => { setState("new", "idle"); setDraft({ ...draft, question: event.target.value }) }} /><Textarea className="mt-2 min-h-24" placeholder="Answer" value={draft.answer} onChange={(event) => { setState("new", "idle"); setDraft({ ...draft, answer: event.target.value }) }} /><div className="mt-3 flex flex-wrap gap-2"><Button isDisabled={stateFor("new") === "saving"} onPress={() => void saveDraft()} size="sm"><SaveLabel label="Save" state={stateFor("new")} /></Button><Button onPress={() => { setEditingId(null); setDraft(null); setValidationError("") }} size="sm" variant="outline">Cancel</Button></div></div> : null}
      </div>
      {validationError ? (
        <Alert className="mt-4 border-[#f1d3ba] bg-brand-peach-bg text-brand-orange-3">
          <AlertDescription>{validationError}</AlertDescription>
        </Alert>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          isDisabled={editingId !== null}
          onPress={openAdd}
          size="sm"
          variant="outline"
        >
          <Plus size={15} /> Add question
        </Button>
      </div>
    </section>
  )
}

function ContactSettings({
  draft,
  onChange,
  onSave,
  isSaving,
  saveState,
}: {
  draft: AboutUsInput
  onChange: (draft: AboutUsInput) => void
  onSave: () => void
  isSaving: boolean
  saveState: SaveState
}) {
  const change = (
    field: "phone" | "email" | "address",
    index: number,
    value: string
  ) =>
    onChange({
      ...draft,
      [field]: (draft[field] ?? []).map((entry, entryIndex) =>
        entryIndex === index ? value : entry
      ),
    })
  const add = (field: "phone" | "email" | "address") =>
    onChange({ ...draft, [field]: [...(draft[field] ?? []), ""] })
  const remove = (field: "phone" | "email" | "address", index: number) =>
    onChange({
      ...draft,
      [field]: (draft[field] ?? []).filter(
        (_, entryIndex) => entryIndex !== index
      ),
    })
  return (
    <section className="mt-8 border border-[#e3e9df] bg-white p-5">
      <p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
        Optional settings
      </p>
      <h3 className="mt-1 font-serif text-3xl text-brand">
        Contact information
      </h3>
      <p className="mt-2 text-sm text-brand-light">
        These optional details appear in the existing public contact area when
        provided.
      </p>
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {(["phone", "email", "address"] as const).map((field) => (
          <div key={field}>
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-brand capitalize">
                {field === "phone"
                  ? "Phone number"
                  : field === "email"
                    ? "Email address"
                    : "Physical address"}
              </p>
              <Button
                onPress={() => add(field)}
                size="xs"
                type="button"
                variant="outline"
              >
                <Plus size={13} /> Add
              </Button>
            </div>
            <div className="mt-2 space-y-2">
              {(draft[field] ?? []).map((entry, index) => (
                <div className="flex gap-2" key={`${field}-${index}`}>
                  <Input
                    type={field === "email" ? "email" : "text"}
                    value={entry}
                    onChange={(event) =>
                      change(field, index, event.target.value)
                    }
                  />
                  <Button
                    aria-label={`Remove ${field}`}
                    onPress={() => remove(field, index)}
                    size="icon-sm"
                    variant="destructive"
                  >
                    <Trash size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Button className="mt-5" isDisabled={isSaving} onPress={onSave}>
        <SaveLabel label="Save" state={saveState} />
      </Button>
    </section>
  )
}
