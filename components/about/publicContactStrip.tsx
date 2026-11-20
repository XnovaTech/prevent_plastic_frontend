import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react"
import type { ComponentType, ReactNode } from "react"

import type { AboutUs } from "@/types/aboutUs"

export function PublicContactStrip({ about }: { about: AboutUs }) {
  const phoneNumbers = about.phone?.filter(Boolean) ?? []
  const emailAddresses = about.email?.filter(Boolean) ?? []
  const addresses = about.address?.filter(Boolean) ?? []

  if (!phoneNumbers.length && !emailAddresses.length && !addresses.length) {
    return null
  }

  return (
    <section className="bg-brand py-16 text-white sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(260px,.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16">
          <div>
            <p className="text-[10px] font-bold tracking-[0.16em] text-brand-green uppercase">
              Stay in touch
            </p>
            <h2 className="mt-2 max-w-[310px] font-serif text-4xl leading-tight sm:text-[42px]">
              Let’s make good things last.
            </h2>
          </div>
          <div className="lg:ml-auto lg:w-full">
            <ContactGroup icon={Phone} label="Phone">
              {phoneNumbers.map((phone) => (
                <a
                  className="block text-base leading-6 font-semibold !text-white transition-opacity hover:opacity-70"
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  key={phone}
                >
                  {phone}
                </a>
              ))}
            </ContactGroup>
            <ContactGroup icon={EnvelopeSimple} label="Email">
              {emailAddresses.map((email) => (
                <a
                  className="block text-base leading-6 font-semibold break-words !text-white transition-opacity hover:opacity-70"
                  href={`mailto:${email}`}
                  key={email}
                >
                  {email}
                </a>
              ))}
            </ContactGroup>
            <ContactGroup icon={MapPin} label="Address">
              {addresses.map((address) => (
                <p
                  className="text-base leading-6 font-semibold text-white"
                  key={address}
                >
                  {address}
                </p>
              ))}
            </ContactGroup>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactGroup({
  icon: Icon,
  label,
  children,
}: {
  icon: ComponentType<{ size?: number; weight?: "bold" }>
  label: string
  children: ReactNode
}) {
  return (
    <div className="grid min-w-0 grid-cols-[minmax(112px,.6fr)_minmax(0,1.4fr)] items-start gap-5 py-5 first:pt-0 last:pb-0">
      <div className="flex items-center gap-2 pt-1 text-[10px] leading-none font-bold tracking-[0.14em] text-brand-green uppercase">
        <Icon size={17} weight="bold" />
        {label}
      </div>
      <div className="min-h-6 space-y-2 leading-6">{children}</div>
    </div>
  )
}
