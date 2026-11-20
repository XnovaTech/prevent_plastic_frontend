"use client"

import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react"
import type { ComponentType } from "react"

import { useAboutUs } from "@/hooks/useAboutUs"

type FooterContactGroup = {
  icon: ComponentType<{ size?: number; weight?: "bold" }>
  label: string
  values: string[]
  valueType: "address" | "email" | "phone"
}

function contactValues(values?: string[] | null) {
  return values?.map((value) => value.trim()).filter(Boolean) ?? []
}

export function FooterContactDetails() {
  const { about, error, isLoading } = useAboutUs("public")

  if (isLoading || error || !about) {
    return null
  }

  const availableContactGroups: FooterContactGroup[] = [
    {
      icon: Phone,
      label: "Phone",
      valueType: "phone",
      values: contactValues(about.phone),
    },
    {
      icon: EnvelopeSimple,
      label: "Email",
      valueType: "email",
      values: contactValues(about.email),
    },
    {
      icon: MapPin,
      label: "Address",
      valueType: "address",
      values: contactValues(about.address),
    },
  ]
  const contactGroups = availableContactGroups.filter(
    (group) => group.values.length > 0,
  )

  if (!contactGroups.length) {
    return null
  }

  return (
    <address className="w-full max-w-sm border-l border-[#e5e7df] pl-5 not-italic md:justify-self-center">
      <dl className="space-y-3">
        {contactGroups.map(({ icon: Icon, label, valueType, values }) => (
          <div
            className="grid grid-cols-[92px_minmax(0,1fr)] items-start gap-x-3"
            key={valueType}
          >
            <dt className="flex items-center gap-1.5 pt-0.5 text-[10px] font-bold tracking-[0.13em] text-brand-3 uppercase">
              <Icon aria-hidden="true" size={14} weight="bold" />
              {label}
            </dt>
            <dd className="min-w-0 space-y-1 text-xs leading-5 font-medium text-[#59675f]">
              {values.map((value) => {
                if (valueType === "phone") {
                  return (
                    <a
                      className="block break-words transition-colors hover:text-brand-3"
                      href={`tel:${value.replace(/\s+/g, "")}`}
                      key={value}
                    >
                      {value}
                    </a>
                  )
                }

                if (valueType === "email") {
                  return (
                    <a
                      className="block break-all transition-colors hover:text-brand-3"
                      href={`mailto:${value}`}
                      key={value}
                    >
                      {value}
                    </a>
                  )
                }

                return <p key={value}>{value}</p>
              })}
            </dd>
          </div>
        ))}
      </dl>
    </address>
  )
}
