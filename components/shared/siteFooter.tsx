import Link from "next/link"
import { Leaf } from "@phosphor-icons/react/dist/ssr"

import { FooterContactDetails } from "@/components/shared/footerContactDetails"

export function SiteFooter({
  showContactDetails = true,
}: {
  showContactDetails?: boolean
}) {
  return (
    <footer className="border-t border-[#e5e7df] bg-[#fbfaf6]/65 backdrop-blur-xl">
      <div
        className={`mx-auto grid max-w-[1440px] gap-10 px-4 py-12 sm:px-8 lg:px-12 ${
          showContactDetails
            ? "md:grid-cols-[minmax(0,1.15fr)_minmax(270px,0.85fr)_auto]"
            : "md:grid-cols-[1.3fr_0.7fr]"
        }`}
      >
        <div>
          <Link
            aria-label="Prevent Plastic home"
            className="inline-flex items-center gap-2.5"
            href="/"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-brand-2 text-brand-green">
              <Leaf aria-hidden="true" size={18} weight="fill" />
            </span>
            <span className="text-[16px] font-bold tracking-[-0.06em] text-[#173e36]">
              preventplastic
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-xs leading-6 text-[#748078]">
            A little marketplace for pre-loved things, local makers, and
            thoughtful everyday living.
          </p>
        </div>
        {showContactDetails ? (
          <div className="md:self-center">
            <FooterContactDetails />
          </div>
        ) : null}
        <div className="flex flex-col justify-between gap-5 md:items-end">
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-[#59675f]"
          >
            <Link href="/">Home</Link>
            <Link href="/blog">Journal</Link>
            <Link href="/shops">For merchants</Link>
            <Link href="/about">About us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy &amp; Policy</Link>
          </nav>
          {!showContactDetails ? (
            <p className="text-[10px] text-brand-gray-3">
              Contact details are placeholders until confirmed.
            </p>
          ) : null}
          <p className="text-[10px] text-brand-gray-3">
            Prevent Plastic · Mock storefront for design review
          </p>
        </div>
      </div>
    </footer>
  )
}
