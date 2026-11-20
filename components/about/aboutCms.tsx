"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import {
  ArrowDown,
  ArrowUp,
  Check,
  Eye,
  EyeSlash,
  FloppyDisk,
  Plus,
  Trash,
  X,
} from "@phosphor-icons/react"

import { ImageUploader } from "@/components/shared/imageUploader"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAboutUs } from "@/hooks/useAboutUs"
import { resolveMediaUrl } from "@/lib/media"
import { aboutUsService } from "@/services/aboutUsService"
import type {
  AboutAction,
  AboutFaq,
  AboutItem,
  AboutSection,
  AboutSectionInput,
  AboutUsInput,
} from "@/types/aboutUs"

const sectionNames: Record<string, string> = {
  hero: "Our Story",
  introduction: "Why Pre-Loved",
  local_feature: "Local Finds, All Together",
  values: "What Guides Us",
  culture: "Why Work With Us",
  faq: "A Few Quick Answers",
}

const actionDefaults: Record<string, AboutAction[]> = {
  hero: [
    { label: "Explore the market", href: "/products" },
    { label: "Meet local shops", href: "/shops" },
  ],
  local_feature: [{ label: "Meet local shops", href: "/shops" }],
}

function sectionForm(section: AboutSection): AboutSectionInput {
  return {
    section_type: section.section_type,
    eyebrow: section.eyebrow ?? "",
    title: section.title ?? "",
    description: section.description ?? "",
    layout_type: section.layout_type ?? "",
    actions: section.actions ?? actionDefaults[section.section_type] ?? [],
    sort_order: section.sort_order,
    is_active: section.is_active,
  }
}

function list(values?: string[] | null) {
  return values?.length ? values : [""]
}

export function AboutCms() {
  const { about, error, isLoading, updateCachedAbout } = useAboutUs("admin")
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [drafts, setDrafts] = useState<Record<number, AboutSectionInput>>({})
  const [contactDraft, setContactDraft] = useState<AboutUsInput | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [isUpdatingSection, setIsUpdatingSection] = useState(false)
  const [notice, setNotice] = useState("")
  const [newItem, setNewItem] = useState({ title: "", description: "" })
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" })

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
      setSelectedId((current) => current ?? about.sections[0]?.id ?? null)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [about])

  const selected = useMemo(
    () => about?.sections.find((section) => section.id === selectedId) ?? null,
    [about, selectedId]
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

  const updateDraft = (patch: Partial<AboutSectionInput>) => {
    if (!selected || !draft) return
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

  const sectionFields = (section: AboutSection): Partial<AboutSection> => ({
    section_type: section.section_type,
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

  const saveChanges = async () => {
    if (!about) return
    setIsSaving(true)
    setNotice("")
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
      }
      if (hasUnsavedContactChanges && contactDraft) {
        const updatedAbout = await aboutUsService.save(contactDraft)
        updateCachedAbout(() => updatedAbout)
      }
      setNotice("Saved. The public About Us page now uses these changes.")
    } catch {
      setNotice("Unable to save changes. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }
  const cancel = () => {
    resetDraftsFromCache()
    setNotice("Unsaved changes were discarded.")
  }
  const saveContact = async () => {
    if (!about || !contactDraft) return
    setIsSaving(true)
    setNotice("")
    try {
      const updatedAbout = await aboutUsService.save({
        ...contactDraft,
        title: about.title,
        description: about.description ?? "",
      })
      updateCachedAbout(() => updatedAbout)
      setNotice("Contact information saved.")
    } catch {
      setNotice("Unable to save contact information.")
    } finally {
      setIsSaving(false)
    }
  }
  const moveSection = async (direction: -1 | 1) => {
    if (!about || !selected) return
    const index = about.sections.findIndex(
      (section) => section.id === selected.id
    )
    const neighbour = about.sections[index + direction]
    if (!neighbour) return
    setIsUpdatingSection(true)
    try {
      await Promise.all([
        aboutUsService.updateSection(selected.id, {
          ...draft!,
          sort_order: neighbour.sort_order,
        }),
        aboutUsService.updateSection(neighbour.id, {
          ...sectionForm(neighbour),
          sort_order: selected.sort_order,
        }),
      ])
      updateCachedAbout((current) =>
        current
          ? {
              ...current,
              sections: current.sections
                .map((section) =>
                  section.id === selected.id
                    ? { ...section, sort_order: neighbour.sort_order }
                    : section.id === neighbour.id
                      ? { ...section, sort_order: selected.sort_order }
                      : section
                )
                .sort((first, second) => first.sort_order - second.sort_order),
            }
          : current
      )
      setNotice("Section order saved.")
    } catch {
      setNotice("Unable to move this section.")
    } finally {
      setIsUpdatingSection(false)
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
      const replacement = await aboutUsService.uploadMedia(selected.id, file)
      await Promise.all(
        selected.media.map((media) =>
          aboutUsService.removeMedia(selected.id, media.id)
        )
      )
      patchSection(selected.id, { media: [replacement] })
      setNotice("Image replaced.")
    } catch {
      setNotice("Unable to upload this image. Your existing image was kept.")
    } finally {
      setIsUploadingImage(false)
    }
  }
  const addGalleryImage = async (file: File | null) => {
    if (!selected || !file) return
    setIsUploadingImage(true)
    try {
      const image = await aboutUsService.uploadGalleryImage(selected.id, file)
      patchSection(selected.id, {
        gallery_images: [...selected.gallery_images, image],
      })
      setNotice("Gallery image added.")
    } catch {
      setNotice("Unable to upload this image.")
    } finally {
      setIsUploadingImage(false)
    }
  }
  const saveItem = async (item: AboutItem) => {
    if (!selected) return
    try {
      const updated = await aboutUsService.updateItem(selected.id, item.id, {
        title: item.title,
        description: item.description ?? "",
        icon: item.icon ?? null,
        sort_order: item.sort_order,
        is_active: item.is_active,
      })
      patchSection(selected.id, {
        items: selected.items.map((entry) =>
          entry.id === updated.id ? updated : entry
        ),
      })
      setNotice("Content item saved.")
    } catch {
      setNotice("Unable to save this item.")
    }
  }
  const addItem = async () => {
    if (!selected || !newItem.title.trim()) return
    try {
      const item = await aboutUsService.createItem(selected.id, {
        title: newItem.title,
        description: newItem.description,
        icon: null,
        sort_order: selected.items.length,
        is_active: true,
      })
      patchSection(selected.id, { items: [...selected.items, item] })
      setNewItem({ title: "", description: "" })
      setNotice("Content item added.")
    } catch {
      setNotice("Unable to add this item.")
    }
  }
  const saveFaq = async (
    id: number,
    question: string,
    answer: string,
    sortOrder: number,
    isActive: boolean
  ) => {
    try {
      const faq = await aboutUsService.updateFaq(id, {
        question,
        answer,
        sort_order: sortOrder,
        is_active: isActive,
      })
      updateCachedAbout((current) =>
        current
          ? {
              ...current,
              faqs: current.faqs.map((entry) =>
                entry.id === faq.id ? faq : entry
              ),
            }
          : current
      )
      setNotice("Answer saved.")
    } catch {
      setNotice("Unable to save this answer.")
    }
  }
  const addFaq = async () => {
    if (!about || !newFaq.question.trim() || !newFaq.answer.trim()) return
    try {
      const faq = await aboutUsService.createFaq({
        question: newFaq.question,
        answer: newFaq.answer,
        sort_order: about.faqs.length,
        is_active: true,
      })
      updateCachedAbout((current) =>
        current ? { ...current, faqs: [...current.faqs, faq] } : current
      )
      setNewFaq({ question: "", answer: "" })
      setNotice("Question added.")
    } catch {
      setNotice("Unable to add this question.")
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
      <div className="py-16 text-center text-brand-gray-3">
        About Us content is not available yet. Run the About Us seeder, then
        refresh this page.
      </div>
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
              {hasUnsavedChanges ? "Unsaved changes" : "All changes saved"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              className="inline-flex h-9 items-center gap-1 rounded-full border border-[#dce4da] bg-white px-3 text-sm font-medium text-brand"
              href="/about"
              rel="noreferrer"
              target="_blank"
            >
              <Eye size={16} /> Preview
            </a>
            <Button
              isDisabled={isSaving || !hasUnsavedChanges}
              onPress={() => void cancel()}
              variant="outline"
            >
              <X size={16} /> Cancel
            </Button>
            <Button
              isDisabled={isSaving || !hasUnsavedChanges}
              onPress={() => void saveChanges()}
            >
              <FloppyDisk size={16} /> {isSaving ? "Saving…" : "Save changes"}
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
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(280px,.72fr)_minmax(0,1.28fr)]">
        <aside className="border border-[#e3e9df] bg-white p-4">
          <p className="px-2 text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
            Page sections
          </p>
          <div className="mt-3 space-y-2">
            {about.sections.map((section, index) => (
              <button
                className={`w-full border p-4 text-left transition-colors ${selectedId === section.id ? "border-brand-3 bg-[#f3f8ef]" : "border-[#e3e9df] bg-white hover:bg-[#f7faf4]"}`}
                key={section.id}
                onClick={() => setSelectedId(section.id)}
                type="button"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold tracking-[0.12em] text-brand-gray-3 uppercase">
                    {index + 1}.{" "}
                    {sectionNames[section.section_type] ?? section.section_type}
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
                  {section.items.length} content items ·{" "}
                  {section.media.length + section.gallery_images.length} images
                </p>
              </button>
            ))}
          </div>
          <Button
            className="mt-4 w-full"
            isDisabled={isSaving}
            onPress={() =>
              void aboutUsService
                .initializeLayout()
                .then((updatedAbout) => {
                  updateCachedAbout(() => updatedAbout)
                  setNotice("Standard page sections are ready.")
                })
                .catch(() => setNotice("Unable to prepare standard sections."))
            }
            variant="outline"
          >
            <Plus size={16} /> Add missing standard sections
          </Button>
        </aside>
        {selected && draft ? (
          <section className="border border-[#e3e9df] bg-white">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#e3e9df] p-5">
              <div>
                <p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
                  Editing section
                </p>
                <h3 className="mt-1 font-serif text-3xl text-brand">
                  {sectionNames[selected.section_type] ?? selected.section_type}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  isDisabled={
                    !about.sections.findIndex(
                      (section) => section.id === selected.id
                    )
                  }
                  onPress={() => void moveSection(-1)}
                  size="icon-sm"
                  variant="outline"
                >
                  <ArrowUp size={15} />
                </Button>
                <Button
                  isDisabled={
                    about.sections.findIndex(
                      (section) => section.id === selected.id
                    ) ===
                    about.sections.length - 1
                  }
                  onPress={() => void moveSection(1)}
                  size="icon-sm"
                  variant="outline"
                >
                  <ArrowDown size={15} />
                </Button>
                <Button
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
                label="Section label"
                value={draft.eyebrow ?? ""}
                onChange={(eyebrow) => updateDraft({ eyebrow })}
              />
              <EditorField
                label="Heading"
                value={draft.title ?? ""}
                onChange={(title) => updateDraft({ title })}
              />
              <EditorArea
                label="Description"
                value={draft.description ?? ""}
                onChange={(description) => updateDraft({ description })}
              />
              {selected.section_type === "hero" ||
              selected.section_type === "local_feature" ? (
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
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {selected.section_type === "culture" ? (
                <GalleryEditor
                  isUploading={isUploadingImage}
                  section={selected}
                  onAdd={addGalleryImage}
                  onRemove={async (id) => {
                    await aboutUsService.removeGalleryImage(selected.id, id)
                    patchSection(selected.id, {
                      gallery_images: selected.gallery_images.filter(
                        (image) => image.id !== id
                      ),
                    })
                    setNotice("Gallery image removed.")
                  }}
                />
              ) : (
                <div className="border-t border-[#e3e9df] pt-5">
                  <p className="mb-3 text-xs font-semibold text-brand">
                    Section image
                  </p>
                  <ImageUploader
                    existingImage={resolveMediaUrl(selected.media[0]?.url)}
                    disabled={isUploadingImage}
                    label="Replace section image"
                    onChange={(file) => void replacePrimaryImage(file)}
                    previewAlt={
                      selected.media[0]?.alt_text ??
                      selected.title ??
                      "About section"
                    }
                  />
                </div>
              )}
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
                    setNotice("Content item removed.")
                  }}
                  onSave={saveItem}
                  value={newItem}
                />
              ) : null}
              {selected.section_type === "faq" ? (
                <FaqEditor
                  faqs={about.faqs}
                  onAdd={addFaq}
                  onRemove={async (id) => {
                    await aboutUsService.removeFaq(id)
                    updateCachedAbout((current) =>
                      current
                        ? {
                            ...current,
                            faqs: current.faqs.filter((faq) => faq.id !== id),
                          }
                        : current
                    )
                    setNotice("Question removed.")
                  }}
                  onSave={saveFaq}
                  value={newFaq}
                  onChange={setNewFaq}
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
          onChange={setContactDraft}
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
      <Textarea
        className="min-h-32"
        value={value}
        onChange={(event) => onChange(event.target.value)}
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
}: {
  items: AboutItem[]
  value: { title: string; description: string }
  onChange: (value: { title: string; description: string }) => void
  onAdd: () => void
  onSave: (item: AboutItem) => Promise<void>
  onRemove: (id: number) => Promise<void>
}) {
  const [editing, setEditing] = useState<
    Record<number, { title: string; description: string }>
  >({})
  return (
    <section className="border-t border-[#e3e9df] pt-5">
      <p className="text-xs font-semibold text-brand">Content items</p>
      <div className="mt-3 space-y-3">
        {items.map((item) => {
          const current = editing[item.id] ?? {
            title: item.title,
            description: item.description ?? "",
          }
          return (
            <div className="border border-[#e3e9df] p-4" key={item.id}>
              <Input
                value={current.title}
                onChange={(event) =>
                  setEditing({
                    ...editing,
                    [item.id]: { ...current, title: event.target.value },
                  })
                }
              />
              <Textarea
                className="mt-2 min-h-20"
                value={current.description}
                onChange={(event) =>
                  setEditing({
                    ...editing,
                    [item.id]: { ...current, description: event.target.value },
                  })
                }
              />
              <div className="mt-3 flex gap-2">
                <Button
                  onPress={() => void onSave({ ...item, ...current })}
                  size="sm"
                >
                  <Check size={15} /> Save item
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
          className="mt-2 min-h-20"
          placeholder="New item description"
          value={value.description}
          onChange={(event) =>
            onChange({ ...value, description: event.target.value })
          }
        />
        <Button className="mt-3" onPress={onAdd} size="sm" variant="outline">
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
}: {
  section: AboutSection
  onAdd: (file: File | null) => Promise<void>
  onRemove: (id: number) => Promise<void>
  isUploading: boolean
}) {
  return (
    <section className="border-t border-[#e3e9df] pt-5">
      <p className="mb-3 text-xs font-semibold text-brand">Image gallery</p>
      <ImageUploader
        disabled={isUploading}
        label="Add gallery image"
        onChange={(file) => void onAdd(file)}
        previewAlt="New gallery image"
      />
      <div className="mt-4 grid grid-cols-2 gap-3">
        {section.gallery_images.map((image) => (
          <div className="relative" key={image.id}>
            <Image
              alt={image.alt_text ?? "Gallery image"}
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
          </div>
        ))}
      </div>
    </section>
  )
}

function FaqEditor({
  faqs,
  value,
  onChange,
  onAdd,
  onSave,
  onRemove,
}: {
  faqs: AboutFaq[]
  value: { question: string; answer: string }
  onChange: (value: { question: string; answer: string }) => void
  onAdd: () => void
  onSave: (
    id: number,
    question: string,
    answer: string,
    sortOrder: number,
    isActive: boolean
  ) => Promise<void>
  onRemove: (id: number) => Promise<void>
}) {
  const [editing, setEditing] = useState<
    Record<number, { question: string; answer: string }>
  >({})
  return (
    <section className="border-t border-[#e3e9df] pt-5">
      <p className="text-xs font-semibold text-brand">Questions and answers</p>
      <div className="mt-3 space-y-3">
        {faqs.map((faq) => {
          const current = editing[faq.id] ?? {
            question: faq.question,
            answer: faq.answer,
          }
          return (
            <div className="border border-[#e3e9df] p-4" key={faq.id}>
              <Input
                value={current.question}
                onChange={(event) =>
                  setEditing({
                    ...editing,
                    [faq.id]: { ...current, question: event.target.value },
                  })
                }
              />
              <Textarea
                className="mt-2 min-h-20"
                value={current.answer}
                onChange={(event) =>
                  setEditing({
                    ...editing,
                    [faq.id]: { ...current, answer: event.target.value },
                  })
                }
              />
              <div className="mt-3 flex gap-2">
                <Button
                  onPress={() =>
                    void onSave(
                      faq.id,
                      current.question,
                      current.answer,
                      faq.sort_order,
                      faq.is_active
                    )
                  }
                  size="sm"
                >
                  <Check size={15} /> Save answer
                </Button>
                <Button
                  onPress={() => void onRemove(faq.id)}
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
          placeholder="New question"
          value={value.question}
          onChange={(event) =>
            onChange({ ...value, question: event.target.value })
          }
        />
        <Textarea
          className="mt-2 min-h-20"
          placeholder="Answer"
          value={value.answer}
          onChange={(event) =>
            onChange({ ...value, answer: event.target.value })
          }
        />
        <Button className="mt-3" onPress={onAdd} size="sm" variant="outline">
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
}: {
  draft: AboutUsInput
  onChange: (draft: AboutUsInput) => void
  onSave: () => void
  isSaving: boolean
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
        <FloppyDisk size={16} /> Save contact information
      </Button>
    </section>
  )
}
