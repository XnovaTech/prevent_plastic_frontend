"use client"

import Image from "next/image"
import { Leaf, MapPin, Phone, Sparkle } from "@phosphor-icons/react"

import { useAboutUs } from "@/hooks/useAboutUs"
import { PublicContactStrip } from "@/components/about/publicContactStrip"

function stripHtml(value?: string | null) {
  return (
    value
      ?.replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim() ?? ""
  )
}

export function PublicAboutPage() {
  const { about, error, isLoading } = useAboutUs("public")
  if (isLoading)
    return (
      <div className="mx-auto max-w-6xl px-4 py-28 text-center text-brand-gray-3">
        Loading our story…
      </div>
    )
  if (error)
    return (
      <div className="mx-auto max-w-3xl px-4 py-28 text-center text-brand-light">
        {error}
      </div>
    )
  if (!about)
    return (
      <div className="mx-auto max-w-3xl px-4 py-28 text-center">
        <p className="text-[10px] font-bold tracking-[0.16em] text-brand-gray-3 uppercase">
          Our story
        </p>
        <h1 className="mt-3 font-serif text-5xl tracking-[-0.05em] text-brand">
          We’re shaping our story.
        </h1>
        <p className="mt-5 text-brand-light">Please check back soon.</p>
      </div>
    )
  return (
    <div>
      <section className="relative overflow-hidden border-b border-[#e3e9df] bg-[#eff5e9] py-20 sm:py-28">
        <div className="absolute -top-24 right-[-5%] size-96 rounded-full border-[40px] border-[#dcebd6]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
          <p className="flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-brand-4 uppercase">
            <Sparkle size={14} /> Our story
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-none tracking-[-0.06em] text-brand sm:text-7xl">
            {about.title}
          </h1>
          {about.description ? (
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-light">
              {stripHtml(about.description)}
            </p>
          ) : null}
        </div>
      </section>
      <main>
        {about.sections.map((section, index) => (
          <section
            className={
              index % 2
                ? "bg-[#f7f9f4] py-16 sm:py-22"
                : "bg-white py-16 sm:py-22"
            }
            key={section.id}
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-8">
              <div className="max-w-2xl">
                <p className="text-[10px] font-bold tracking-[0.17em] text-brand-4 uppercase">
                  {section.eyebrow || section.section_type}
                </p>
                {section.title ? (
                  <h2 className="mt-3 font-serif text-4xl tracking-[-0.05em] text-brand sm:text-5xl">
                    {section.title}
                  </h2>
                ) : null}
                {section.description ? (
                  <div
                    className="mt-4 text-base leading-7 text-brand-light"
                    dangerouslySetInnerHTML={{ __html: section.description }}
                  />
                ) : null}
              </div>
              {section.items.length ? (
                <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {section.items.map((item) => (
                    <article
                      className="rounded-[24px] border border-[#e3e9df] bg-white p-5 shadow-sm"
                      key={item.id}
                    >
                      <span className="flex size-10 items-center justify-center rounded-2xl bg-brand-yellow-bg text-brand-3">
                        <Leaf size={20} weight="fill" />
                      </span>
                      <h3 className="mt-4 text-lg font-semibold text-brand">
                        {item.title}
                      </h3>
                      {item.description ? (
                        <p className="mt-2 text-sm leading-6 text-brand-light">
                          {item.description}
                        </p>
                      ) : null}
                    </article>
                  ))}
                </div>
              ) : null}
              {section.media.length || section.gallery_images.length ? (
                <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[...section.media, ...section.gallery_images].map(
                    (media) => (
                      <figure
                        className="overflow-hidden rounded-[24px] bg-[#edf4e9]"
                        key={media.id}
                      >
                        <Image
                          alt={
                            media.alt_text ||
                            section.title ||
                            "About Prevent Plastic"
                          }
                          className="aspect-[4/3] h-full w-full object-cover"
                          height={700}
                          src={media.url}
                          width={900}
                        />
                        {"caption" in media && media.caption ? (
                          <figcaption className="px-4 py-3 text-sm text-brand-light">
                            {media.caption}
                          </figcaption>
                        ) : null}
                      </figure>
                    )
                  )}
                </div>
              ) : null}
            </div>
          </section>
        ))}
        {about.faqs.length ? (
          <section className="bg-[#f0f5ec] py-16 sm:py-22">
            <div className="mx-auto max-w-3xl px-4 sm:px-8">
              <p className="text-[10px] font-bold tracking-[0.17em] text-brand-4 uppercase">
                Good to know
              </p>
              <h2 className="mt-3 font-serif text-4xl tracking-[-0.05em] text-brand">
                Questions, answered.
              </h2>
              <div className="mt-8 space-y-3">
                {about.faqs.map((faq) => (
                  <details
                    className="group rounded-2xl bg-white px-5 py-4"
                    key={faq.id}
                  >
                    <summary className="cursor-pointer list-none font-semibold text-brand">
                      {faq.question}
                    </summary>
                    <div
                      className="mt-3 text-sm leading-6 text-brand-light"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </details>
                ))}
              </div>
            </div>
          </section>
        ) : null}
        {false &&
        (about?.phone?.length ||
          about?.email?.length ||
          about?.address?.length) ? (
          <section className="bg-brand py-14 text-white">
            <div className="mx-auto flex max-w-6xl flex-wrap gap-8 px-4 sm:px-8">
              <div className="min-w-[220px] flex-1">
                <p className="text-[10px] font-bold tracking-[0.16em] text-brand-green uppercase">
                  Stay in touch
                </p>
                <h2 className="mt-2 font-serif text-4xl">
                  Let’s make good things last.
                </h2>
              </div>
              {about?.phone?.map((phone) => (
                <p className="flex items-center gap-2 text-sm" key={phone}>
                  <Phone size={18} /> {phone}
                </p>
              ))}
              {about?.email?.map((email) => (
                <p className="text-sm" key={email}>
                  {email}
                </p>
              ))}
              {about?.address?.map((address) => (
                <p className="flex items-center gap-2 text-sm" key={address}>
                  <MapPin size={18} /> {address}
                </p>
              ))}
            </div>
          </section>
        ) : null}
        {about.phone?.length || about.email?.length || about.address?.length ? (
          <PublicContactStrip about={about} />
        ) : null}
      </main>
    </div>
  )
}
