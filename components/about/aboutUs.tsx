"use client"

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
  const { about, error, isLoading } = useAboutUs("public")
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
  const hero = sectionByType(about, "hero")
  const introduction = sectionByType(about, "introduction")
  const localFeature = sectionByType(about, "local_feature")
  const values = sectionByType(about, "values")
  const culture = sectionByType(about, "culture")
  const faq = sectionByType(about, "faq")
  const heroImage = imageFor(hero)
  const localFeatureImage = imageFor(localFeature)
  const valuesImage = imageFor(values)
  const cultureImages = culture
    ? [...culture.gallery_images, ...culture.media]
        .map(resolveAboutImage)
        .filter((image): image is AboutImage => image !== null)
    : []
  const heroContent: AboutPageContent["hero"] | null =
    hero && heroImage
      ? {
          eyebrow: hero.eyebrow || "",
          title: about.title,
          highlight: hero.title || "",
          description: plainText(hero.description || about.description),
          primaryAction: hero.actions?.[0] ?? { label: "Explore the market", href: "/products" },
          secondaryAction: hero.actions?.[1] ?? { label: "Meet local shops", href: "/shops" },
          image: heroImage.src,
          imageAlt: heroImage.alt,
          imageLabel: heroImage.caption || hero.eyebrow || "",
        }
      : null
  const introductionContent: AboutPageContent["introduction"] | null =
    introduction &&
    localFeature &&
    localFeatureImage &&
    Boolean(introduction.title?.trim()) &&
    Boolean(introduction.description?.trim()) &&
    introduction.items.length > 0 &&
    Boolean(localFeature.title?.trim()) &&
    Boolean(localFeature.description?.trim()) &&
    localFeature.items.length > 0
      ? {
          eyebrow: introduction.eyebrow || "",
          title: introduction.title || "",
          description: plainText(introduction.description),
          benefits: introduction.items.map((item) => ({
            id: String(item.id),
            title: item.title,
            description: item.description || "",
          })),
          featureEyebrow: localFeature.eyebrow || "",
          featureTitle: localFeature.title || "",
          featureDescription: plainText(localFeature.description),
          featureImage: localFeatureImage.src,
          featureImageAlt: localFeatureImage.alt,
          featureCardTitle: localFeature.items[0]?.title || "",
          featureCardDescription: localFeature.items[0]?.description || "",
          featureAction: localFeature.actions?.[0] ?? { label: "Meet local shops", href: "/shops" },
        }
      : null
  const valuesContent: AboutPageContent["values"] | null =
    values &&
    valuesImage &&
    Boolean(values.title?.trim()) &&
    Boolean(values.description?.trim()) &&
    values.items.length > 0
      ? {
          eyebrow: values.eyebrow || "",
          title: values.title || "",
          description: plainText(values.description),
          image: valuesImage.src,
          imageAlt: valuesImage.alt,
          points: values.items.map((item) => ({
            id: String(item.id),
            title: item.title,
            description: item.description || "",
          })),
        }
      : null
  const cultureContent: AboutPageContent["culture"] | null =
    culture &&
    cultureImages.length > 0 &&
    Boolean(culture.title?.trim()) &&
    Boolean(culture.description?.trim())
    ? {
        eyebrow: culture.eyebrow || "",
        title: culture.title || "",
        description: plainText(culture.description),
        cards: cultureImages.map((image, index) => ({
            id: String(image.id),
            title: culture.items[index]?.title || "",
            description: culture.items[index]?.description || "",
            image: image.src,
            imageAlt: image.alt,
          })
        ),
      }
    : null
  const faqIntro: AboutPageContent["faqIntro"] | null =
    faq && Boolean(faq.title?.trim()) && Boolean(faq.description?.trim())
      ? {
          eyebrow: faq.eyebrow || "",
          title: faq.title || "",
          description: plainText(faq.description),
        }
      : null
  const faqs = about.faqs.map((entry) => ({
    id: String(entry.id),
    question: entry.question,
    answer: plainText(entry.answer),
  }))
  return (
    <>
      {heroContent ? <AboutHeroSection content={heroContent} /> : null}
      {introductionContent ? (
        <AboutIntroductionSection content={introductionContent} />
      ) : null}
      {valuesContent ? <AboutValuesSection content={valuesContent} /> : null}
      {cultureContent ? <AboutCultureSection content={cultureContent} /> : null}
      {faqs.length && faqIntro ? (
        <AboutFaqSection faqs={faqs} intro={faqIntro} />
      ) : null}
    </>
  )
}

