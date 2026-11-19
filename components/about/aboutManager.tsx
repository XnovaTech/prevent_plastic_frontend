"use client"

import { useMemo, useState, type FormEvent } from "react"
import {
  Check,
  ImageSquare,
  PencilSimple,
  Plus,
  Trash,
} from "@phosphor-icons/react"

import { ImageUploader } from "@/components/shared/imageUploader"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAboutUs } from "@/hooks/useAboutUs"
import { aboutUsService } from "@/services/aboutUsService"
import type {
  AboutSection,
  AboutSectionInput,
  AboutUsInput,
} from "@/types/aboutUs"

const sectionPresets = [
  {
    value: "hero",
    label: "1. Hero",
    publicTitle: "Good things deserve another chapter",
    layout: "hero",
    imageLabel: "Hero image (right side)",
    imageHint: "Upload one landscape image for the right side of the opening card.",
    itemLabel: "Not used in this section",
  },
  {
    value: "introduction",
    label: "2. Why pre-loved",
    publicTitle: "Good finds have more to give",
    layout: "split",
    imageLabel: "No image required",
    imageHint: "Add the six benefit cards below. They appear in the two-column grid.",
    itemLabel: "Benefit card",
  },
  {
    value: "local_feature",
    label: "3. Local feature",
    publicTitle: "A little closer to home",
    layout: "feature",
    imageLabel: "Local feature image",
    imageHint: "Upload one landscape image. It appears beside the Discover local sellers card.",
    itemLabel: "Overlay card content",
  },
  {
    value: "values",
    label: "4. Values",
    publicTitle: "Thoughtful by nature. Local by choice.",
    layout: "split",
    imageLabel: "Values image (left side)",
    imageHint: "Upload one portrait or landscape image for the left side of this section.",
    itemLabel: "Value point",
  },
  {
    value: "culture",
    label: "5. Gallery",
    publicTitle: "Good people, good work",
    layout: "gallery",
    imageLabel: "Gallery images",
    imageHint: "Upload six images to match the 3 × 2 photo grid on the public page.",
    itemLabel: "Optional image caption",
  },
  {
    value: "faq",
    label: "6. FAQ introduction",
    publicTitle: "Good to know",
    layout: "faq",
    imageLabel: "No image required",
    imageHint: "Use the FAQ editor below to add questions and answers.",
    itemLabel: "Not used in this section",
  },
] as const

const pageBlueprint = [
  { type: "hero", image: "1 hero image", content: "Opening heading and description" },
  { type: "introduction", image: "No image", content: "6 benefit cards" },
  { type: "local_feature", image: "1 feature image", content: "1 overlay card" },
  { type: "values", image: "1 values image", content: "4 value points" },
  { type: "culture", image: "6 gallery images", content: "Gallery heading and intro" },
  { type: "faq", image: "No image", content: "FAQ heading + questions" },
] as const

const blankSection: AboutSectionInput = {
  section_type: "hero",
  eyebrow: "",
  title: "",
  description: "",
  layout_type: "hero",
  sort_order: 0,
  is_active: true,
}

function sectionLabel(sectionType: string) {
  return sectionPresets.find((preset) => preset.value === sectionType)?.label ?? sectionType
}

function sectionHelp(sectionType: string) {
  return sectionPresets.find((preset) => preset.value === sectionType)?.imageHint
}

function sectionPreset(sectionType: string) {
  return sectionPresets.find((preset) => preset.value === sectionType)
}

function sectionFieldLabels(sectionType: string) {
  switch (sectionType) {
    case "hero":
      return { eyebrow: "Hero eyebrow", title: "Hero highlighted line", description: "Hero description" }
    case "introduction":
      return { eyebrow: "Why pre-loved eyebrow", title: "Why pre-loved heading", description: "Why pre-loved introduction" }
    case "local_feature":
      return { eyebrow: "Local feature eyebrow", title: "Local feature heading", description: "Local feature description" }
    case "values":
      return { eyebrow: "Values eyebrow", title: "Values heading", description: "Values introduction" }
    case "culture":
      return { eyebrow: "Gallery eyebrow", title: "Gallery heading", description: "Gallery introduction" }
    case "faq":
      return { eyebrow: "FAQ eyebrow", title: "FAQ heading", description: "FAQ introduction" }
    default:
      return { eyebrow: "Eyebrow", title: "Heading", description: "Section description" }
  }
}

function sectionUsesItems(sectionType: string) {
  return ["introduction", "local_feature", "values"].includes(sectionType)
}

function sectionUsesImage(sectionType: string) {
  return ["hero", "local_feature", "values", "culture"].includes(sectionType)
}

function listValue(values?: string[] | null) {
  return values?.length ? values : [""]
}

function ContactListField({
  label,
  type = "text",
  values,
  onChange,
}: {
  label: string
  type?: "text" | "email"
  values: string[]
  onChange: (values: string[]) => void
}) {
  const update = (index: number, value: string) =>
    onChange(
      values.map((item, itemIndex) => (itemIndex === index ? value : item))
    )
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold text-brand">{label}</span>
        <Button
          className="text-brand-3"
          onPress={() => onChange([...values, ""])}
          size="xs"
          type="button"
          variant="outline"
        >
          <Plus size={13} /> Add
        </Button>
      </div>
      {values.map((value, index) => (
        <div className="flex gap-2" key={`${label}-${index}`}>
          <Input
            type={type}
            value={value}
            onChange={(event) => update(index, event.target.value)}
            placeholder={`Add ${label.toLowerCase()}`}
          />
          <Button
            aria-label={`Remove ${label.toLowerCase()}`}
            isDisabled={values.length === 1}
            onPress={() =>
              onChange(values.filter((_, itemIndex) => itemIndex !== index))
            }
            size="icon-sm"
            type="button"
            variant="destructive"
          >
            <Trash size={14} />
          </Button>
        </div>
      ))}
    </div>
  )
}

export function AboutManager() {
  const { about, error, isLoading, refresh } = useAboutUs("admin")
  const [message, setMessage] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [sectionForm, setSectionForm] =
    useState<AboutSectionInput>(blankSection)
  const [editingSection, setEditingSection] = useState<number | null>(null)
  const [itemTitle, setItemTitle] = useState("")
  const [itemDescription, setItemDescription] = useState("")
  const [selectedSection, setSelectedSection] = useState<number | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const [sectionImage, setSectionImage] = useState<File | null>(null)

  const mainDefaults = useMemo<AboutUsInput>(
    () => ({
      title: about?.title ?? "",
      description: about?.description ?? "",
      phone: listValue(about?.phone),
      email: listValue(about?.email),
      address: listValue(about?.address),
    }),
    [about]
  )
  const [mainForm, setMainForm] = useState<AboutUsInput | null>(null)
  const currentMain = mainForm ?? mainDefaults
  const section =
    about?.sections.find((item) => item.id === selectedSection) ?? null
  const activePreset = sectionPreset(sectionForm.section_type)
  const selectedPreset = section ? sectionPreset(section.section_type) : null
  const fieldLabels = sectionFieldLabels(sectionForm.section_type)

  const startSection = (sectionType: string) => {
    const existing = about?.sections.find(
      (entry) => entry.section_type === sectionType
    )

    if (existing) {
      editSection(existing)
      return
    }

    const preset = sectionPreset(sectionType)
    setEditingSection(null)
    setSelectedSection(null)
    setSectionImage(null)
    setSectionForm({
      ...blankSection,
      section_type: sectionType,
      layout_type: preset?.layout ?? "",
    })
    document
      .getElementById("about-section-editor")
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const saveMain = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSaving(true)
    setMessage("")
    try {
      await aboutUsService.save(currentMain)
      setMainForm(null)
      setMessage("Main About Us details saved.")
      await refresh()
    } catch {
      setMessage("Unable to save the About Us details.")
    } finally {
      setIsSaving(false)
    }
  }
  const saveSection = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSaving(true)
    setMessage("")
    try {
      const matchingSection = about?.sections.find(
        (entry) => entry.section_type === sectionForm.section_type
      )
      const sectionId = editingSection ?? matchingSection?.id
      const saved = sectionId
        ? await aboutUsService.updateSection(sectionId, sectionForm)
        : await aboutUsService.createSection(sectionForm)
      if (sectionImage) {
        if (sectionForm.section_type === "culture") {
          await aboutUsService.uploadGalleryImage(saved.id, sectionImage)
        } else {
          await Promise.all(
            (matchingSection?.media ?? []).map((media) =>
              aboutUsService.removeMedia(saved.id, media.id)
            )
          )
          await aboutUsService.uploadMedia(saved.id, sectionImage)
        }
        setSectionImage(null)
      }
      setSectionForm(blankSection)
      setEditingSection(null)
      setSelectedSection(saved.id)
      setMessage("Section saved.")
      await refresh()
    } catch {
      setMessage("Unable to save the section.")
    } finally {
      setIsSaving(false)
    }
  }
  const editSection = (value: AboutSection) => {
    setSectionForm({
      section_type: value.section_type,
      eyebrow: value.eyebrow ?? "",
      title: value.title ?? "",
      description: value.description ?? "",
      layout_type: value.layout_type ?? "",
      sort_order: value.sort_order,
      is_active: value.is_active,
    })
    setEditingSection(value.id)
    setSelectedSection(value.id)
    document
      .getElementById("about-section-editor")
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  const removeSection = async (id: number) => {
    if (!window.confirm("Delete this section and all of its items and media?"))
      return
    await aboutUsService.removeSection(id)
    if (selectedSection === id) setSelectedSection(null)
    await refresh()
  }
  const resetAbout = async () => {
    if (
      !window.confirm(
        "Reset the entire About page? This permanently removes every section, image, gallery image, and FAQ."
      )
    )
      return
    setIsSaving(true)
    setMessage("")
    try {
      await aboutUsService.reset()
      setMainForm(null)
      setSelectedSection(null)
      setEditingSection(null)
      setSectionForm(blankSection)
      setImage(null)
      setSectionImage(null)
      setMessage("About Us has been reset. You can now create it from the beginning.")
      await refresh()
    } catch {
      setMessage("Unable to reset the About Us page.")
    } finally {
      setIsSaving(false)
    }
  }
  const initializeLayout = async () => {
    setIsSaving(true)
    setMessage("")
    try {
      await aboutUsService.initializeLayout()
      setMessage("All six About page sections are ready. Select a block to add its content and images.")
      await refresh()
    } catch {
      setMessage("Unable to prepare the standard About page sections.")
    } finally {
      setIsSaving(false)
    }
  }
  const addItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!section || !itemTitle.trim()) return
    await aboutUsService.createItem(section.id, {
      title: itemTitle,
      description: itemDescription || null,
      icon: null,
      sort_order: section.items.length,
      is_active: true,
    })
    setItemTitle("")
    setItemDescription("")
    await refresh()
  }
  const uploadImage = async () => {
    if (!section || !image) return
    await aboutUsService.uploadGalleryImage(section.id, image)
    setImage(null)
    await refresh()
  }
  const uploadMedia = async () => {
    if (!section || !image) return
    await Promise.all(
      section.media.map((media) =>
        aboutUsService.removeMedia(section.id, media.id)
      )
    )
    await aboutUsService.uploadMedia(section.id, image)
    setImage(null)
    await refresh()
  }

  if (isLoading)
    return (
      <div className="py-16 text-center text-brand-gray-3">
        Loading About Us&hellip;
      </div>
    )
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
          Website content
        </p>
        <h2 className="mt-1 font-serif text-4xl tracking-[-0.05em] text-brand">
          About Us
        </h2>
        <p className="mt-2 text-sm text-brand-light">
          Manage the story, flexible page sections, gallery, and frequently
          asked questions shown on the public About page.
        </p>
      </div>
      <Card className="rounded-[26px] border-[#d8e5d3] bg-[#f5f8f1] shadow-none">
        <CardHeader>
          <CardTitle className="text-brand">Public page blueprint</CardTitle>
          <p className="text-sm leading-6 text-brand-light">
            Create these blocks in order. Each block maps directly to the matching area in the About page design.
          </p>
          {about ? (
            <Button
              className="mt-3 w-fit bg-brand-2 text-white"
              isDisabled={isSaving}
              onPress={() => void initializeLayout()}
              type="button"
            >
              <Plus size={16} /> Initialize standard section layout
            </Button>
          ) : null}
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {pageBlueprint.map((step) => {
            const existingSection = about?.sections.find(
              (entry) => entry.section_type === step.type
            )

            return (
              <button
                className="rounded-2xl border border-[#dce7d7] bg-white/75 p-4 text-left transition-colors hover:border-brand-3 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2"
                key={step.type}
                onClick={() => startSection(step.type)}
                type="button"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-brand">
                    {sectionLabel(step.type)}
                  </p>
                  <span className={existingSection ? "rounded-full bg-[#dcefd5] px-2 py-1 text-[10px] font-bold text-brand-3 uppercase" : "rounded-full bg-[#eef0ec] px-2 py-1 text-[10px] font-bold text-brand-gray-3 uppercase"}>
                    {existingSection ? "Created" : "Needed"}
                  </span>
                </div>
                <p className="mt-2 text-xs text-brand-light">{step.content}</p>
                <p className="mt-1 text-xs font-medium text-brand-3">{step.image}</p>
                <p className="mt-3 text-xs font-semibold text-brand-2">
                  {existingSection ? "Edit section and images" : "Create this section"}
                </p>
              </button>
            )
          })}
        </CardContent>
      </Card>
      {error || message ? (
        <Alert
          className={
            error
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-[#d8e5d3] bg-[#f3f8ef] text-brand-4"
          }
        >
          <AlertDescription>{error || message}</AlertDescription>
        </Alert>
      ) : null}
          <Card className="rounded-[26px] border-[#e3e9df] bg-white shadow-none">
        <CardHeader>
          <CardTitle className="text-brand">Main story</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={saveMain}>
            <label className="space-y-1.5 sm:col-span-2">
              <span className="text-xs font-semibold text-brand">
                Page title
              </span>
              <Input
                value={currentMain.title}
                onChange={(event) =>
                  setMainForm({ ...currentMain, title: event.target.value })
                }
                placeholder="Why we started"
              />
            </label>
            <label className="space-y-1.5 sm:col-span-2">
              <span className="text-xs font-semibold text-brand">
                Opening description
              </span>
              <Textarea
                value={currentMain.description ?? ""}
                onChange={(event) =>
                  setMainForm({
                    ...currentMain,
                    description: event.target.value,
                  })
                }
                placeholder="Tell the Prevent Plastic story..."
              />
            </label>
            <ContactListField
              label="Phone"
              values={currentMain.phone ?? [""]}
              onChange={(phone) => setMainForm({ ...currentMain, phone })}
            />
            <ContactListField
              label="Email"
              type="email"
              values={currentMain.email ?? [""]}
              onChange={(email) => setMainForm({ ...currentMain, email })}
            />
            <div className="sm:col-span-2">
              <ContactListField
                label="Address"
                values={currentMain.address ?? [""]}
                onChange={(address) => setMainForm({ ...currentMain, address })}
              />
            </div>
            <Button
              className="w-fit bg-brand-2 text-white"
              isDisabled={isSaving}
              type="submit"
            >
              <Check size={16} /> {about ? "Save changes" : "Create About Us"}
            </Button>
            {about ? (
              <Button
                className="w-fit"
                isDisabled={isSaving}
                onPress={() => void resetAbout()}
                type="button"
                variant="destructive"
              >
                <Trash size={16} /> Reset About page
              </Button>
            ) : null}
          </form>
        </CardContent>
      </Card>
      {about ? (
        <>
          <Card
            className="rounded-[26px] border-[#e3e9df] bg-white shadow-none"
            id="about-section-editor"
          >
            <CardHeader>
              <CardTitle className="text-brand">
                {editingSection ? "Edit section" : "Add page section"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="grid gap-4 sm:grid-cols-2"
                onSubmit={saveSection}
              >
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-brand">
                    Page section
                  </span>
                  <Input
                    readOnly
                    value={activePreset?.label ?? sectionForm.section_type}
                  />
                  <p className="text-xs text-brand-gray-3">
                    Choose the matching block in the public page blueprint above.
                  </p>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <span className="text-xs font-semibold text-brand">
                    {activePreset?.imageLabel ?? "Section image"}
                  </span>
                  <p className="text-xs text-brand-gray-3">
                    {activePreset?.imageHint ??
                      "Upload the image for this section. It will be saved when you add or update the section."}
                  </p>
                  {activePreset?.value !== "introduction" &&
                  activePreset?.value !== "faq" ? (
                    <ImageUploader
                      label={`Upload ${activePreset?.imageLabel ?? "section image"}`}
                      onChange={setSectionImage}
                      previewAlt="New About section image preview"
                      value={sectionImage}
                    />
                  ) : null}
                </div>
                <label className="space-y-1.5 sm:col-span-2">
                  <span className="text-xs font-semibold text-brand">
                    {fieldLabels.eyebrow}
                  </span>
                  <Input
                    value={sectionForm.eyebrow ?? ""}
                    onChange={(event) =>
                      setSectionForm({
                        ...sectionForm,
                        eyebrow: event.target.value,
                      })
                    }
                  />
                </label>
                <label className="space-y-1.5 sm:col-span-2">
                  <span className="text-xs font-semibold text-brand">
                    {fieldLabels.title}
                  </span>
                  <Input
                    value={sectionForm.title ?? ""}
                    onChange={(event) =>
                      setSectionForm({
                        ...sectionForm,
                        title: event.target.value,
                      })
                    }
                  />
                </label>
                <label className="space-y-1.5 sm:col-span-2">
                  <span className="text-xs font-semibold text-brand">
                    {fieldLabels.description}
                  </span>
                  <Textarea
                    value={sectionForm.description ?? ""}
                    onChange={(event) =>
                      setSectionForm({
                        ...sectionForm,
                        description: event.target.value,
                      })
                    }
                  />
                </label>
                <div className="flex gap-2">
                  <Button
                    className="bg-brand-2 text-white"
                    isDisabled={isSaving}
                    type="submit"
                  >
                    <Plus size={16} />{" "}
                    {editingSection ? "Update section" : "Add section"}
                  </Button>
                  {editingSection ? (
                    <Button
                      onPress={() => {
                        setEditingSection(null)
                        setSectionForm(blankSection)
                      }}
                      type="button"
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  ) : null}
                </div>
              </form>
            </CardContent>
          </Card>
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="rounded-[26px] border-[#e3e9df] bg-white shadow-none">
              <CardHeader>
                <CardTitle className="text-brand">Page sections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {about.sections.length ? (
                  about.sections.map((entry) => (
                    <article
                      className={`rounded-2xl border p-4 ${selectedSection === entry.id ? "border-brand-3 bg-[#f3f8ef]" : "border-[#e3e9df]"}`}
                      key={entry.id}
                    >
                      <div className="flex justify-between gap-3">
                        <button
                          className="min-w-0 text-left"
                          onClick={() => setSelectedSection(entry.id)}
                          type="button"
                        >
                          <p className="text-[10px] font-bold tracking-[0.12em] text-brand-gray-3 uppercase">
                            {sectionLabel(entry.section_type)}
                          </p>
                          <p className="mt-1 truncate font-semibold text-brand">
                            {entry.title || "Untitled section"}
                          </p>
                          <p className="mt-1 text-xs text-brand-gray-3">
                            {entry.items.length} items{" "}
                            <span aria-hidden="true">&bull;</span>{" "}
                            {entry.gallery_images.length + entry.media.length}{" "}
                            images
                          </p>
                        </button>
                        <div className="flex gap-1">
                          <Button
                            aria-label="Edit section"
                            onPress={() => editSection(entry)}
                            size="icon-sm"
                            variant="outline"
                          >
                            <PencilSimple size={14} />
                          </Button>
                          <Button
                            aria-label="Delete section"
                            onPress={() => void removeSection(entry.id)}
                            size="icon-sm"
                            variant="destructive"
                          >
                            <Trash size={14} />
                          </Button>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="rounded-2xl bg-[#f7faf4] p-5 text-sm text-brand-gray-3">
                    Start with Hero, then add the other approved sections in
                    the same order as the public About page.
                  </p>
                )}
              </CardContent>
            </Card>
            <Card className="rounded-[26px] border-[#e3e9df] bg-white shadow-none">
              <CardHeader>
                <CardTitle className="text-brand">
                  {section
                    ? `Content for ${section.title || section.section_type}`
                    : "Select a section"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {section ? (
                  <div className="space-y-5">
                    {sectionUsesItems(section.section_type) ? (
                      <>
                        <form className="space-y-2" onSubmit={addItem}>
                      <p className="text-xs font-bold tracking-[0.12em] text-brand-gray-3 uppercase">
                        {selectedPreset?.itemLabel ?? "Content cards / points"}
                      </p>
                      <Input
                        value={itemTitle}
                        onChange={(event) => setItemTitle(event.target.value)}
                        placeholder={`${selectedPreset?.itemLabel ?? "Content item"} title`}
                      />
                      <Textarea
                        value={itemDescription}
                        onChange={(event) =>
                          setItemDescription(event.target.value)
                        }
                        placeholder={`${selectedPreset?.itemLabel ?? "Content item"} description`}
                      />
                      <Button className="bg-brand-2 text-white" type="submit">
                        <Plus size={16} /> Add {selectedPreset?.itemLabel ?? "item"}
                      </Button>
                        </form>
                        <div className="space-y-2">
                      {section.items.map((item) => (
                        <div
                          className="flex items-center justify-between rounded-xl bg-[#f7faf4] px-3 py-2"
                          key={item.id}
                        >
                          <span className="text-sm font-medium text-brand">
                            {item.title}
                          </span>
                          <Button
                            aria-label="Delete item"
                            onPress={() =>
                              void aboutUsService
                                .removeItem(section.id, item.id)
                                .then(refresh)
                            }
                            size="icon-xs"
                            variant="destructive"
                          >
                            <Trash size={13} />
                          </Button>
                        </div>
                      ))}
                        </div>
                      </>
                    ) : (
                      <p className="rounded-xl bg-[#f7faf4] p-3 text-sm text-brand-gray-3">
                        This approved page section does not use content cards.
                      </p>
                    )}
                    {sectionUsesImage(section.section_type) ? (
                    <div className="border-t border-[#edf0ea] pt-4">
                      <p className="mb-3 text-xs font-bold tracking-[0.12em] text-brand-gray-3 uppercase">
                        {selectedPreset?.imageLabel ?? "Images for this section"}
                      </p>
                      <p className="mb-3 text-xs leading-5 text-brand-gray-3">
                        {selectedPreset?.imageHint ??
                          "Upload the image used by this public page section."}
                      </p>
                      <ImageUploader
                        label="Choose an About page image"
                        onChange={setImage}
                        previewAlt="About section preview"
                        value={image}
                      />
                      <div className="mt-3 flex flex-wrap gap-2">
                        {section.section_type === "culture" ? (
                          <Button
                            className="bg-brand-2 text-white"
                            isDisabled={!image}
                            onPress={() => void uploadImage()}
                          >
                            <ImageSquare size={16} /> Add gallery image
                          </Button>
                        ) : (
                          <Button
                            className="bg-brand-2 text-white"
                            isDisabled={!image}
                            onPress={() => void uploadMedia()}
                          >
                            <ImageSquare size={16} /> Save section image
                          </Button>
                        )}
                      </div>
                      {section.media.length || section.gallery_images.length ? (
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          {section.media.map((media) => (
                            <div
                              className="group relative overflow-hidden rounded-xl bg-[#f7faf4]"
                              key={`media-${media.id}`}
                            >
                              <img
                                alt={media.alt_text || "Section media"}
                                className="aspect-[4/3] w-full object-cover"
                                src={media.url}
                              />
                              <Button
                                aria-label="Delete section image"
                                className="absolute top-2 right-2 bg-white/90"
                                onPress={() =>
                                  void aboutUsService
                                    .removeMedia(section.id, media.id)
                                    .then(refresh)
                                }
                                size="icon-xs"
                                variant="destructive"
                              >
                                <Trash size={13} />
                              </Button>
                            </div>
                          ))}
                          {section.gallery_images.map((galleryImage) => (
                            <div
                              className="group relative overflow-hidden rounded-xl bg-[#f7faf4]"
                              key={`gallery-${galleryImage.id}`}
                            >
                              <img
                                alt={galleryImage.alt_text || "Gallery image"}
                                className="aspect-[4/3] w-full object-cover"
                                src={galleryImage.url}
                              />
                              <Button
                                aria-label="Delete gallery image"
                                className="absolute top-2 right-2 bg-white/90"
                                onPress={() =>
                                  void aboutUsService
                                    .removeGalleryImage(
                                      section.id,
                                      galleryImage.id
                                    )
                                    .then(refresh)
                                }
                                size="icon-xs"
                                variant="destructive"
                              >
                                <Trash size={13} />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    ) : null}
                  </div>
                ) : (
                  <p className="text-sm text-brand-gray-3">
                    Choose a page section to add its cards and gallery images.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
          <AboutFaqManager faqs={about.faqs} refresh={refresh} />
        </>
      ) : null}
    </div>
  )
}

function AboutFaqManager({
  faqs,
  refresh,
}: {
  faqs: { id: number; question: string; answer: string }[]
  refresh: () => Promise<void>
}) {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!question.trim() || !answer.trim()) return
    await aboutUsService.createFaq({
      question,
      answer,
      sort_order: faqs.length,
      is_active: true,
    })
    setQuestion("")
    setAnswer("")
    await refresh()
  }
  return (
    <Card className="rounded-[26px] border-[#e3e9df] bg-white shadow-none">
      <CardHeader>
        <CardTitle className="text-brand">Frequently asked questions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5 lg:grid-cols-2">
        <form className="space-y-3" onSubmit={submit}>
          <Input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Question"
          />
          <Textarea
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="Answer"
          />
          <Button className="bg-brand-2 text-white" type="submit">
            <Plus size={16} /> Add FAQ
          </Button>
        </form>
        <div className="space-y-2">
          {faqs.map((faq) => (
            <div
              className="flex items-start justify-between gap-3 rounded-2xl bg-[#f7faf4] p-3"
              key={faq.id}
            >
              <div>
                <p className="font-semibold text-brand">{faq.question}</p>
                <p className="mt-1 text-sm text-brand-light">
                  {faq.answer.replace(/<[^>]+>/g, " ")}
                </p>
              </div>
              <Button
                aria-label="Delete FAQ"
                onPress={() =>
                  void aboutUsService.removeFaq(faq.id).then(refresh)
                }
                size="icon-xs"
                variant="destructive"
              >
                <Trash size={13} />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
