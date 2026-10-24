import Link from "next/link"
import {
  Heart,
  Leaf,
  MagnifyingGlass,
  Storefront,
} from "@phosphor-icons/react/dist/ssr"

import { CartIndicator } from "@/components/shared/cartIndicator"
import { homePageMock } from "@/mock/homePageMock"

type SiteHeaderProps = {
  activeHref?: string
}

export function SiteHeader({ activeHref = "/" }: SiteHeaderProps) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#173e3614] bg-white/60 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">
          <Link
            aria-label="Prevent Plastic home"
            className="flex shrink-0 items-center gap-2.5"
            href="/"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-brand-2 text-brand-green">
              <Leaf aria-hidden="true" size={21} weight="fill" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[17px] font-bold tracking-[-0.06em] text-[#173e36]">
                preventplastic
              </span>
              <span className="mt-1 text-[9px] font-semibold tracking-[0.22em] text-[#6d827a] uppercase">
                good things, again
              </span>
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-7 lg:flex"
          >
            {homePageMock.navigation.map((item) => (
              <Link
                key={item.label}
                className={`text-[13px] font-medium transition-colors hover:text-[#247a65] ${
                  item.href === activeHref ? "text-brand-2" : "text-[#56645e]"
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              aria-label="Browse products"
              className="hidden size-10 items-center justify-center rounded-full text-[#344a42] transition-colors hover:bg-[#eaf0e7] sm:flex"
              href="/#popular"
            >
              <MagnifyingGlass aria-hidden="true" size={19} />
            </Link>
            <Link
              aria-label="Browse the shop"
              className="flex size-10 items-center justify-center rounded-full text-[#344a42] transition-colors hover:bg-[#eaf0e7]"
              href="/sme"
            >
              <Storefront aria-hidden="true" size={19} />
            </Link>
            <Link
              aria-label="Wishlist"
              className="flex size-10 items-center justify-center rounded-full text-[#344a42] transition-colors hover:bg-[#eaf0e7]"
              href="/wishlist"
            >
              <Heart aria-hidden="true" size={19} />
            </Link>
            <CartIndicator />
            <span className="hidden h-7 w-px bg-[#e4e7df] sm:block" />
            <Link
              className="hidden items-center gap-1.5 rounded-full border border-[#dce4da] px-3.5 py-2 text-xs font-semibold text-[#344a42] transition-colors hover:border-[#174e46] hover:bg-[#f1f5ed] sm:flex"
              href="/#sme"
            >
              <span>Sell with us</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <nav
          aria-label="Mobile navigation"
          className="flex gap-6 overflow-x-auto border-t border-[#173e360d] px-4 py-3 text-xs font-medium whitespace-nowrap text-[#56645e] sm:px-8 lg:hidden"
        >
          {homePageMock.navigation.map((item) => (
            <Link
              key={item.label}
              className={
                item.href === activeHref ? "font-semibold text-brand-2" : ""
              }
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  )
}
