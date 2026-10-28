import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { ReactElement } from "react"
import { ArrowRight, Share, Storefront, Users } from "@phosphor-icons/react/dist/ssr"

import { AosInitializer } from "@/components/shared/aosInitializer"
import { SectionBrowseLink } from "@/components/shared/sectionBrowseLink"
import { SiteFooter } from "@/components/shared/siteFooter"
import { SiteHeader } from "@/components/shared/siteHeader"

export const metadata: Metadata = {
  title: "About us — Prevent Plastic",
  description:
    "Our story, mission, team, and partners. Prevent Plastic is a circular marketplace for pre-loved things and local makers.",
}

type Partner = {
  name: string
  initials: string
  tone: keyof typeof toneClasses
}

type TeamMember = {
  name: string
  role: string
  bio: string
  image: string
  tone: keyof typeof toneClasses
}

type ValueItem = {
  title: string
  description: string
  icon: ReactElement
}

const toneClasses: Record<string, string> = {
  sage: "bg-[#e8eee5] text-[#38684f]",
  peach: "bg-[#f8ebe5] text-[#a65e46]",
  lavender: "bg-[#f0edf6] text-[#695381]",
  butter: "bg-[#f5f1df] text-[#8a7440]",
}

const partners: Partner[] = [
  { name: "Yangon City Development", initials: "YCD", tone: "sage" },
  { name: "Mandalay Green Hub", initials: "MGH", tone: "peach" },
  { name: "Bago Eco Collective", initials: "BEC", tone: "lavender" },
  { name: "Naypyidaw Reuse Network", initials: "NRN", tone: "butter" },
  { name: "Mawlamyine Green Circle", initials: "MGC", tone: "sage" },
  { name: "Pathein Upcycle Co", initials: "PUC", tone: "peach" },
]

const teamMembers: TeamMember[] = [
  {
    name: "Aye Chan",
    role: "Founder & CEO",
    bio: "Started Prevent Plastic in 2023 after years buying and selling pre-loved goods in Yangon markets.",
    image: "/products/ceramicPlates.jpg",
    tone: "sage",
  },
  {
    name: "Thiri Myat",
    role: "Head of Design",
    bio: "Makes sure every screen feels considered, clean, and easy to use on any device.",
    image: "/products/woodenWallShelf.jpg",
    tone: "lavender",
  },
  {
    name: "Ko Zaw",
    role: "Operations Lead",
    bio: "Keeps local pickup and delivery running smoothly across towns.",
    image: "/products/deskLamp.jpg",
    tone: "butter",
  },
  {
    name: "Su Su Hlaing",
    role: "Community Lead",
    bio: "Works directly with local sellers and fixers to grow the reuse network.",
    image: "/products/succulentPot.jpg",
    tone: "peach",
  },
]

const values: ValueItem[] = [
  {
    title: "Circular by design",
    description: "Every listing is built to keep useful things in circulation longer — not in landfill.",
    icon: <Share size={18} weight="fill" />,
  },
  {
    title: "Local first",
    description: "We partner with nearby shops and independent sellers so goods don't travel far.",
    icon: <Storefront size={18} weight="fill" />,
  },
  {
    title: "Honest condition",
    description: "Clear condition notes and real photos so buyers know exactly what they're getting.",
    icon: <Users size={18} weight="fill" />,
  },
]

export default function Page() {
  return (
    <div className="min-h-screen bg-transparent text-brand">
      <AosInitializer />
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        href="#main-content"
      >
        Skip to content
      </a>
      <SiteHeader activeHref="/about" />
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative px-4 pt-10 pb-16 sm:px-8 sm:pt-14 sm:pb-20 lg:px-12" id="about-hero">
          <div className="relative mx-auto max-w-[1440px] min-h-[480px] sm:min-h-[560px] lg:min-h-[620px] overflow-hidden rounded-[32px] sm:rounded-[40px]">
            <Image
              alt="Team working together in a community marketplace space"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
              fill
              sizes="100vw"
              src="/products/woodenStool.jpg"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/50" />
            <div className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-8 lg:px-12">
              <div className="text-center max-w-[640px]">
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-brand-green/90 backdrop-blur-sm uppercase"
                >
                  <span className="size-1.5 rounded-full bg-brand-green" />
                  Our Story
                </span>
                <h1 className="mt-5 font-serif text-[40px] leading-[1.05] tracking-[-0.06em] text-white sm:mt-7 sm:text-[52px] lg:text-[64px]">
                  Prevent Plastic<br />
                  <span className="relative inline-block italic text-[#d9f09b]">
                    A little marketplace for pre-loved things.
                    <span className="absolute right-0 -bottom-1 h-[2px] w-[70%] bg-[#e17b5d] rounded-full opacity-60" />
                  </span>
                </h1>
                <p className="mt-5 max-w-[480px] mx-auto text-[13px] leading-7 text-white/80 sm:mt-7 sm:text-[14px]">
                  We believe the most sustainable thing you can buy is something
                  that already exists. Prevent Plastic connects local makers,
                  independent sellers, and conscious buyers to give well-loved
                  things a second chapter.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4 sm:mt-12">
                  <Link
                    className="flex h-11 items-center gap-2.5 rounded-full bg-white px-5 text-[12px] font-bold text-brand transition-all hover:bg-brand-2 hover:text-white hover:-translate-y-1 hover:shadow-lg"
                    href="/"
                  >
                    <ArrowRight aria-hidden="true" size={14} /> Start browsing
                  </Link>
                  <Link
                    className="flex h-11 items-center gap-2.5 rounded-full border border-white/40 bg-black/10 px-5 text-[12px] font-bold text-white transition-all hover:bg-white/20 hover:-translate-y-1 hover:shadow-md"
                    href="/contact"
                  >
                    Get in touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slogan / Mission Section */}
        <section className="px-4 pb-20 sm:px-8 sm:pb-24 lg:px-12" id="mission">
          <div className="mx-auto max-w-[1440px]">
            <div className="text-center max-w-[560px] mx-auto" data-aos="fade-up">
              <span className="mb-4 inline-block rounded-full border border-[#d8e0d7] bg-white/60 px-4 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-brand-gray-3 uppercase backdrop-blur-sm">
                Our Mission
              </span>
              <h2 className="mt-5 font-serif text-[34px] leading-tight tracking-[-0.04em] text-brand sm:text-[42px]">
                Buy well. Pass it on.<br />
                <span className="relative inline-block italic text-[#39745b]">
                  Repeat.
                  <span className="absolute right-0 -bottom-1 h-[2px] w-[50%] bg-[#d9f09b] rounded-full" />
                </span>
              </h2>
              <p className="mt-6 max-w-[480px] mx-auto text-[13px] leading-7 text-brand-light sm:mt-8 sm:text-[14px]">
                Every new product carries a footprint — materials, energy,
                transport, waste. When you choose pre-loved, you skip all of
                that. A ceramic plate, a denim jacket, a wooden stool: they have
                stories worth continuing.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-4 pb-24 sm:px-8 sm:pb-32 lg:px-12 bg-[#f0f3eb]/30" id="values">
          <div className="mx-auto max-w-[1440px]">
            <div className="text-center mb-16 sm:mb-20" data-aos="fade-up">
              <span className="inline-block text-[10px] font-bold tracking-[0.18em] text-brand-2 uppercase">
                Our Values
              </span>
              <h2 className="mt-4 font-serif text-[32px] leading-tight tracking-[-0.04em] text-brand sm:text-[40px]">
                What guides us
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-3" data-aos="fade-up">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/60 p-8 sm:p-10 backdrop-blur-xl transition-all duration-500 hover:border-brand-2 hover:shadow-xl hover:shadow-brand-2/20 hover:-translate-y-2"
                  data-aos="zoom-in"
                >
                  <div className="mb-6 flex size-12 items-center justify-center rounded-full bg-white text-brand-green shadow-sm">
                    {value.icon}
                  </div>
                  <h3 className="mb-3 font-serif text-[22px] leading-tight tracking-[-0.04em] text-brand sm:text-[26px]">
                    {value.title}
                  </h3>
                  <p className="text-[12px] leading-6 text-brand-light">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners / Sponsors Section */}
        <section className="px-4 pb-24 sm:px-8 sm:pb-32 lg:px-12" id="partners">
          <div className="mx-auto max-w-[1440px]">
            <div className="text-center mb-16 sm:mb-20" data-aos="fade-up">
              <span className="inline-block text-[10px] font-bold tracking-[0.18em] text-brand-2 uppercase">
                Partners &amp; Sponsors
              </span>
              <h2 className="mt-4 font-serif text-[32px] leading-tight tracking-[-0.04em] text-brand sm:text-[40px]">
                Working together for less waste
              </h2>
              <p className="mt-5 max-w-[520px] mx-auto text-[12px] leading-6 text-brand-light sm:mt-7 sm:text-[13px]">
                We collaborate with city development committees, green collectives,
                and reuse networks across towns to keep circular trade local and
                accessible.
              </p>
            </div>

            <div className="relative overflow-hidden" data-aos="fade-up" data-aos-delay="100">
              <div className="flex flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16 py-12 sm:py-16 md:py-20">
                {partners.map((partner) => (
                  <div
                    key={partner.name}
                    className="flex items-center justify-center min-w-[140px] sm:min-w-[180px] group cursor-default"
                  >
                    <div
                      className={`flex size-24 sm:size-32 items-center justify-center rounded-full border border-white/60 bg-white/50 backdrop-blur-md transition-all duration-500 group-hover:border-brand-2 group-hover:shadow-xl group-hover:shadow-brand-2/20 group-hover:-translate-y-2`}
                    >
                      <span
                        className={`text-base sm:text-xl font-bold tracking-tighter ${toneClasses[partner.tone]}`}
                      >
                        {partner.initials}
                      </span>
                    </div>
                    <p className="mt-4 text-[11px] font-medium text-brand-6 text-center leading-snug sm:mt-5 sm:text-[12px]">
                      {partner.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-20 sm:mt-28 text-center" data-aos="fade-up" data-aos-delay="200">
              <p className="text-[12px] leading-6 text-brand-light">
                Interested in partnering with us?
                <Link
                  className="ml-2 text-[12px] font-semibold text-brand-2 hover:text-brand-orange underline underline-offset-4"
                  href="/contact"
                >
                  Get in touch
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-4 pb-24 sm:px-8 sm:pb-32 lg:px-12 bg-[#f0f3eb]/30" id="team">
          <div className="mx-auto max-w-[1440px]">
            <div className="text-center mb-16 sm:mb-20" data-aos="fade-up">
              <span className="inline-block text-[10px] font-bold tracking-[0.18em] text-brand-2 uppercase">
                Local Leadership
              </span>
              <h2 className="mt-4 font-serif text-[32px] leading-tight tracking-[-0.04em] text-brand sm:text-[40px]">
                Led by people who actually<br />
                <span className="relative inline-block italic text-[#39745b]">
                  use the marketplace.
                  <span className="absolute right-0 -bottom-1 h-[2px] w-[60%] bg-[#e17b5d] rounded-full" />
                </span>
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" data-aos="fade-up">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/60 p-6 sm:p-8 backdrop-blur-xl transition-all duration-500 group hover:border-brand-2 hover:shadow-xl hover:shadow-brand-2/20 hover:-translate-y-2"
                  data-aos="zoom-in"
                >
                  <div className="relative aspect-[3/4] sm:aspect-auto mb-6">
                    <Image
                      alt={`${member.name}, ${member.role}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1200px) 30vw, 280px"
                      src={member.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand/60 via-brand/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-3 left-3 right-3 flex justify-end gap-2">
                      <span
                        className={`flex size-6 items-center justify-center rounded-full bg-white text-[#173e36] text-[9px] font-bold shadow-sm ${toneClasses[member.tone]}`}
                      >
                        {member.tone.charAt(0).toUpperCase() + member.tone.slice(1)}
                      </span>
                    </div>
                  </div>
                  <h3 className="mb-1 font-serif text-[18px] leading-tight tracking-[-0.04em] text-brand sm:text-[22px]">
                    {member.name}
                  </h3>
                  <p className="mb-3 text-[11px] font-semibold text-brand-2 uppercase tracking-[0.12em]">
                    {member.role}
                  </p>
                  <p className="text-[12px] leading-6 text-brand-light">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-4 pb-28 sm:px-8 sm:pb-36 lg:px-12" id="contact">
          <div className="mx-auto max-w-[1440px]">
            <div className="relative overflow-hidden rounded-[40px] sm:rounded-[48px] bg-brand p-8 sm:p-12 md:p-16 text-center" data-aos="fade-up">
              <span className="relative z-10 inline-flex items-center gap-2 rounded-full border border-white/30 bg-brand-2/40 px-3 py-1 text-[10px] font-semibold tracking-[0.16em] text-brand-green uppercase backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-brand-green" />
                Join the community
              </span>
              <h2 className="relative z-10 mt-6 font-serif text-[38px] leading-[1.05] tracking-[-0.06em] text-white sm:mt-8 sm:text-[48px]">
                Ready to give good things<br />
                <span className="relative inline-block italic text-[#d9f09b]">
                  another day?
                </span>
              </h2>
              <div className="relative z-10 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  className="flex h-12 items-center gap-2.5 rounded-full bg-white px-6 text-[12px] font-bold text-brand transition-all hover:bg-brand-2 hover:text-white hover:-translate-y-1 hover:shadow-lg"
                  href="/"
                >
                  <ArrowRight aria-hidden="true" size={14} /> Start browsing
                </Link>
                <Link
                  className="flex h-12 items-center gap-2.5 rounded-full border border-white/40 px-6 text-[12px] font-bold text-white transition-all hover:bg-white/20 hover:-translate-y-1 hover:shadow-md"
                  href="/contact"
                >
                  Get in touch
                  <ArrowRight aria-hidden="true" size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <SectionBrowseLink
          href="/contact"
          label="Contact us"
          placement="footer"
          screen="mobile"
        />
      </main>
      <SiteFooter />
    </div>
  )
}
