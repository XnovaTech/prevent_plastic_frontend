import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"

type SectionBrowseLinkProps = {
  href: string
  label: string
  placement: "header" | "footer"
  screen: "desktop" | "mobile"
}

export function SectionBrowseLink({
  href,
  label,
  placement,
  screen,
}: SectionBrowseLinkProps) {
  if (screen === "desktop") {
    return (
      <Link
        className={`${placement === "header" ? "mb-1" : "mt-8"} hidden shrink-0 items-center gap-2 text-xs font-semibold text-brand-3 transition-colors hover:text-brand-orange sm:flex`}
        href={href}
      >
        {label}
        <ArrowRight aria-hidden="true" size={16} />
      </Link>
    )
  }

  return (
    <Link
      className={`mx-auto ${placement === "footer" ? "mt-8" : ""} flex w-fit items-center gap-2 rounded-full border border-[#d8e0d7] px-5 py-3 text-xs font-semibold text-brand-3 transition-colors hover:bg-white sm:hidden`}
      href={href}
    >
      {label}
      <ArrowRight aria-hidden="true" size={15} />
    </Link>
  )
}
