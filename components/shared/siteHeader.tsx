"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Leaf,
  MagnifyingGlass,
  Storefront,
  X,
} from "@phosphor-icons/react/dist/ssr"

import { CartIndicator } from "@/components/shared/cartIndicator"
import { SeedlingIcon } from "@/components/ui/seedlingIcon"
import { homePageMock } from "@/mock/homePageMock"

type SiteHeaderProps = {
  activeHref?: string
}

export function SiteHeader({ activeHref = "/" }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [leafFilled, setLeafFilled] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/70 backdrop-blur-xl transition-colors duration-300">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">
          <Link
            aria-label="Prevent Plastic home"
            className="flex shrink-0 items-center gap-2.5 group cursor-pointer"
            href="/"
            onClick={() => setLeafFilled((prev) => !prev)}
          >
            <span
              className={`group-hover:scale-105 transition-transform duration-300 flex size-10 items-center justify-center rounded-full ${leafFilled ? "bg-brand-2" : "bg-white/90"} text-brand-green shadow-lg shadow-brand-green/20`}
            >
              <Leaf
                aria-hidden="true"
                size={26}
                weight={leafFilled ? "fill" : "regular"}
                style={{ color: leafFilled ? "#39745b" : "#173e36" }}
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[20px] font-bold tracking-[-0.06em] text-[#173e36] group-hover:text-brand-2 transition-colors">
                preventplastic
              </span>
              <span className="mt-1 text-[10px] font-semibold tracking-[0.22em] text-[#6d827a] uppercase">
                good things, again
              </span>
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-6 lg:flex"
          >
            {homePageMock.navigation.map((item) => (
              <Link
                key={item.label}
                className={`relative px-3 py-2 text-[15px] font-medium transition-all duration-300 ${
                  item.href === activeHref
                    ? "text-brand-2"
                    : "text-[#56645e]"
                } hover:text-brand-2`}
                href={item.href}
              >
                <span className="block relative">
                  {item.label}
                  {item.href === activeHref && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-2 rounded-full" />
                  )}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              aria-label="Browse products"
              className="relative group hidden size-10 items-center justify-center rounded-full text-[#344a42] transition-all duration-300 hover:bg-[#eaf0e7] hover:scale-110 hover:shadow-sm sm:flex"
              href="/#popular"
            >
              <MagnifyingGlass aria-hidden="true" size={22} />
            </Link>
            <Link
              aria-label="Browse the shop"
              className="relative group flex size-10 items-center justify-center rounded-full text-[#344a42] transition-all duration-300 hover:bg-[#eaf0e7] hover:scale-110 hover:shadow-sm"
              href="/sme"
            >
              <Storefront aria-hidden="true" size={22} />
            </Link>
            <Link
              aria-label="Wishlist"
              className="relative group flex size-10 items-center justify-center rounded-full text-[#344a42] transition-all duration-300 hover:bg-[#eaf0e7] hover:scale-110 hover:shadow-sm"
              href="/wishlist"
            >
              <SeedlingIcon size={22} />
            </Link>
            <CartIndicator />
            <span className="hidden h-7 w-px bg-[#e4e7df] sm:block" />
            <Link
              className="relative group hidden items-center gap-1.5 rounded-full border border-[#dce4da] px-3.5 py-2 text-xs font-semibold text-[#344a42] transition-all duration-300 hover:border-[#174e46] hover:bg-[#f1f5ed] hover:-translate-y-0.5 hover:shadow-sm sm:flex"
              href="/#sme"
            >
              <span>Sell with us</span>
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">↗</span>
            </Link>
          </div>

          <button
            aria-label="Toggle menu"
            className="lg:hidden flex size-9 items-center justify-center rounded-full text-[#344a42] transition-colors hover:bg-[#eaf0e7]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X aria-hidden="true" size={18} weight="bold" />
            ) : (
              <svg
                aria-hidden="true"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {mobileOpen && (
          <div
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-md lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <div className="absolute top-6 right-6">
              <button
                aria-label="Close menu"
                className="flex size-9 items-center justify-center rounded-full text-[#344a42] transition-colors hover:bg-[#eaf0e7]"
                onClick={() => setMobileOpen(false)}
              >
                <X aria-hidden="true" size={18} weight="bold" />
              </button>
            </div>
            <nav
              aria-label="Mobile navigation"
              className="mx-auto max-w-sm mt-20 px-6 space-y-6 text-lg font-medium"
            >
              {homePageMock.navigation.map((item) => (
                <Link
                  key={item.label}
                  className={`block py-3 rounded-xl transition-colors ${
                    item.href === activeHref
                      ? "text-brand-2 bg-brand-2/10"
                      : "text-[#56645e] hover:text-brand-2 hover:bg-white/50"
                  }`}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-6 border-t border-[#e4e7df]">
                <Link
                  className="block py-3 rounded-xl text-xs font-semibold text-[#344a42] transition-colors hover:bg-white/50 hover:border-brand-2 border-transparent"
                  href="/#sme"
                >
                  Sell with us
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
