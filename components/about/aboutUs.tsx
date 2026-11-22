"use client"

import { useState, type ReactNode } from "react"

import { AboutCultureSection } from "@/components/sections/aboutCultureSection"
import { AboutFaqSection } from "@/components/sections/aboutFaqSection"
import { AboutHeroSection } from "@/components/sections/aboutHeroSection"
import { AboutIntroductionSection } from "@/components/sections/aboutIntroductionSection"
import { AboutValuesSection } from "@/components/sections/aboutValuesSection"
import { useAboutUs } from "@/hooks/useAboutUs"
import { resolveMediaUrl } from "@/lib/media"
import type { AboutPageContent } from "@/types/aboutPage"
import type { AboutSection, AboutUs } from "@/types/aboutUs"

function plainText(value?: string | null) {
  return (
    value
      ?.replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim() ?? ""
  )
}

function sectionByType(about: AboutUs, type: string) {
  const normalizedType = type.replace(/[\s-]/g, "_").toLowerCase()

  return about.sections.find(
    (section) =>
      section.section_type.replace(/[\s-]/g, "_").toLowerCase() ===
      normalizedType
  )
}

function emptySection(type: string): AboutSection {
  return {
    id: 0,
    section_type: type,
    cms_title: null,
    eyebrow: null,
    title: null,
    description: null,
    layout_type: null,
    actions: [],
    sort_order: 0,
    is_active: true,
    items: [],
    media: [],
    gallery_images: [],
  }
}

type AboutImage = {
  id: string
  src: string
  alt: string
  caption: string
}

function resolveAboutImage(
  image?: {
    id?: number
    url?: string | null
    alt_text?: string | null
    caption?: string | null
  } | null
): AboutImage | null {
  const source = image?.url?.trim()
  if (!source || !/^(?:\/|https?:\/\/|blob:|data:)/i.test(source)) {
    return null
  }

  return {
    id: String(image?.id ?? source),
    src: resolveMediaUrl(source),
    alt: image?.alt_text ?? "",
    caption: image?.caption ?? "",
  }
}

function imageFor(section: AboutSection | undefined): AboutImage | null {
  return (
    section?.media.map(resolveAboutImage).find(Boolean) ??
    section?.gallery_images.map(resolveAboutImage).find(Boolean) ??
    null
  )
}

/**
 * Renders the reference About layout entirely from the public About API.
 * Section names match the presets in the admin dashboard.
 */
export function AboutUsLayoutPage() {
  const [isPreview] = useState(
    () =>
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("preview") === "1"
  )
  const { about, error, isLoading } = useAboutUs(
    isPreview ? "admin" : "public"
  )
  if (isLoading)
    return (
      <div className="px-4 py-28 text-center text-sm text-brand-gray-3">
        Loading our story…
      </div>
    )
  if (error)
    return (
      <div className="px-4 py-28 text-center text-sm text-brand-light">
        {error}
      </div>
    )
  if (!about)
    return (
      <div className="px-4 py-28 text-center text-sm text-brand-light">
        Our story is being prepared.
      </div>
    )
  return <AboutUsContent about={about} />
}

/**
 * The approved public canvas without data fetching. The admin visual editor
 * reuses this exact component so draft content is always previewed in the
 * same structure as the public page.
 */
type AboutUsContentProps = {
  about: AboutUs
  onEditSection?: (sectionType: string) => void
}

function EditableSection({
  sectionType,
  onEdit,
  children,
}: {
  sectionType: string
  onEdit?: (sectionType: string) => void
  children: ReactNode
}) {
  if (!onEdit) return <>{children}</>

  return (
    <div
      className="group relative cursor-pointer"
      onClick={(event) => {
        if (event.target instanceof HTMLElement && event.target.closest("a")) {
          event.preventDefault()
        }
        onEdit(sectionType)
      }}
    >
      <span className="pointer-events-none absolute top-3 right-3 z-10 rounded-full border border-brand-3/30 bg-white/95 px-3 py-1 text-[10px] font-bold tracking-[0.12em] text-brand-3 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
        Edit section
      </span>
      <div className="transition-shadow group-hover:ring-2 group-hover:ring-brand-3/35 group-hover:ring-inset">
        {children}
      </div>
    </div>
  )
}

export function AboutUsContent({ about, onEditSection }: AboutUsContentProps) {
  const hero = sectionByType(about, "hero") ?? emptySection("hero")
  const introduction =
    sectionByType(about, "introduction") ?? emptySection("introduction")
  const localFeature =
    sectionByType(about, "local_feature") ?? emptySection("local_feature")
  const values = sectionByType(about, "values") ?? emptySection("values")
  const culture = sectionByType(about, "culture") ?? emptySection("culture")
  const faq = sectionByType(about, "faq") ?? emptySection("faq")
  const heroImage = imageFor(hero)
  const localFeatureImage = imageFor(localFeature)
  const valuesImage = imageFor(values)
  const cultureImages = culture
    ? [...culture.gallery_images, ...culture.media]
        .map(resolveAboutImage)
        .filter((image): image is AboutImage => image !== null)
    : []
  const heroContent: AboutPageContent["hero"] = {
    eyebrow: hero.eyebrow || "",
    title: about.title,
    highlight: hero.title || "",
    description: plainText(hero.description || about.description),
    primaryAction: hero.actions?.[0],
    secondaryAction: hero.actions?.[1],
    image: heroImage?.src ?? null,
    imageAlt: heroImage?.alt ?? "",
    imageLabel: heroImage?.caption ?? "",
  }
  const introductionContent: AboutPageContent["introduction"] = {
    eyebrow: introduction.eyebrow || "",
    title: introduction.title || "",
    description: plainText(introduction.description),
    benefits: introduction.items.map((item) => ({
      id: String(item.id),
      title: item.title,
      description: item.description || "",
      href: item.link_url || undefined,
    })),
    featureEyebrow: localFeature.eyebrow || "",
    featureTitle: localFeature.title || "",
    featureDescription: plainText(localFeature.description),
    featureImage: localFeatureImage?.src ?? null,
    featureImageAlt: localFeatureImage?.alt ?? "",
    featureImageLabel: localFeatureImage?.caption ?? "",
    featureCardTitle: localFeature.items[0]?.title || "",
    featureCardDescription: localFeature.items[0]?.description || "",
    featureAction: localFeature.actions?.[0],
  }
  const valuesContent: AboutPageContent["values"] = {
    eyebrow: values.eyebrow || "",
    title: values.title || "",
    description: plainText(values.description),
    image: valuesImage?.src ?? null,
    imageAlt: valuesImage?.alt ?? "",
    imageLabel: valuesImage?.caption ?? "",
    points: values.items.map((item) => ({
      id: String(item.id),
      title: item.title,
      description: item.description || "",
      icon: item.icon || undefined,
    })),
  }
  const cultureContent: AboutPageContent["culture"] = {
    eyebrow: culture.eyebrow || "",
    title: culture.title || "",
    description: plainText(culture.description),
    cards: cultureImages.map((image, index) => ({
      id: String(image.id),
      title: culture.items[index]?.title || "",
      description: culture.items[index]?.description || "",
      image: image.src,
      imageAlt: image.alt,
      caption: image.caption || image.alt,
    })),
  }
  const faqIntro: AboutPageContent["faqIntro"] = {
    eyebrow: faq.eyebrow || "",
    title: faq.title || "",
    description: plainText(faq.description),
    action: faq.actions?.[0],
  }
  const faqs = about.faqs.map((entry) => ({
    id: String(entry.id),
    question: entry.question,
    answer: plainText(entry.answer),
  }))
  return (
    <>
      <EditableSection onEdit={onEditSection} sectionType="hero">
        <AboutHeroSection content={heroContent} />
      </EditableSection>
      <EditableSection onEdit={onEditSection} sectionType="introduction">
        <AboutIntroductionSection content={introductionContent} />
      </EditableSection>
      <EditableSection onEdit={onEditSection} sectionType="values">
        <AboutValuesSection content={valuesContent} />
      </EditableSection>
      <EditableSection onEdit={onEditSection} sectionType="culture">
        <AboutCultureSection content={cultureContent} />
      </EditableSection>
      <EditableSection onEdit={onEditSection} sectionType="faq">
        <AboutFaqSection
          animate={!onEditSection}
          faqs={faqs}
          intro={faqIntro}
        />
      </EditableSection>
    </>
  )
}
