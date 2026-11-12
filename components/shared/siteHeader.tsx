"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  Leaf,
  List,
  MagnifyingGlass,
  MapPin,
  ShoppingBagOpen,
  SignIn,
  SignOut,
  X,
} from "@phosphor-icons/react/dist/ssr"

import { CartIndicator } from "@/components/shared/cartIndicator"
import { getAppRole, getDashboardPath } from "@/lib/auth"
import { SeedlingIcon } from "@/components/ui/seedlingIcon"
import { catalogPageMock } from "@/mock/catalogPageMock"
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { homePageMock } from "@/mock/homePageMock"
import { useCartStore } from "@/stores/cartStore"
import { useWishlistStore } from "@/stores/wishlistStore"
import { authService } from "@/services/authService"
import { useAuthStore } from "@/stores/authStore"

type SiteHeaderProps = {
  activeHref?: string
}

const navDescriptions: Record<string, string> = {
  "/": "Good things, again",
  "/shops": "Local shops & makers",
  "/products": `Products(${catalogPageMock.individual.products
    .slice(0, 3)
    .map((p) => p.name)
    .join(", ")}...${catalogPageMock.individual.products.length - 3}+ more)`,
  "/repair": "Fix, mend & care",
  "/about": "Why we started",
  "/blog": "The journal",
  "/contact": "Say hello",
}

export function SiteHeader({ activeHref = "/" }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [leafFilled, setLeafFilled] = useState(false)
  const user = useAuthStore((state) => state.user)
  const clearUser = useAuthStore((state) => state.clearUser)
  const bagCount = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  )
  const wishCount = useWishlistStore((state) => state.items.length)

  const closeMenu = () => setMenuOpen(false)
  const appRole = getAppRole(user)
  const accountHref = appRole ? getDashboardPath(appRole) : "/customer"

  const handleLogout = async () => {
    try {
      await authService.logout()
    } finally {
      clearUser()
      closeMenu()
    }
  }

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)")
    const handleChange = () => {
      if (desktop.matches) setMenuOpen(false)
    }

    desktop.addEventListener("change", handleChange)

    return () => desktop.removeEventListener("change", handleChange)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-xl transition-colors duration-300">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">
          <Link
            aria-label="Prevent Plastic home"
            className="group flex shrink-0 cursor-pointer items-center gap-2.5"
            href="/"
            onClick={() => setLeafFilled((prev) => !prev)}
          >
            <span
              className={`flex size-10 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 ${leafFilled ? "bg-brand-2" : "bg-white/90"} text-brand-green shadow-lg shadow-brand-green/20`}
            >
              <Leaf
                aria-hidden="true"
                size={26}
                weight={leafFilled ? "fill" : "regular"}
                style={{ color: leafFilled ? "#39745b" : "#173e36" }}
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[20px] font-bold tracking-[-0.06em] text-[#173e36] transition-colors group-hover:text-brand-2">
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
                  item.href === activeHref ? "text-brand-2" : "text-[#56645e]"
                } } hover:text-brand-2`}
                href={item.href}
              >
                <span className="relative block">
                  {item.label}
                  {item.href === activeHref && (
                    <span className="absolute right-0 -bottom-1 left-0 h-0.5 rounded-full bg-brand-2" />
                  )}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              aria-label="Browse products"
              className="group relative hidden size-10 items-center justify-center rounded-full text-[#344a42] transition-all duration-300 hover:scale-110 hover:bg-[#eaf0e7] hover:shadow-sm sm:flex"
              href="/#popular"
            >
              <MagnifyingGlass aria-hidden="true" size={22} />
            </Link>
            <Link
              aria-label={`Wishlist, ${wishCount} items`}
              className="group relative hidden size-10 items-center justify-center rounded-full text-[#344a42] transition-all duration-300 hover:scale-110 hover:bg-[#eaf0e7] hover:shadow-sm sm:flex"
              href="/wishlist"
            >
              <SeedlingIcon size={22} />
              {wishCount > 0 && (
                <span className="absolute top-0.5 right-0.5 flex size-[17px] items-center justify-center rounded-full bg-[#e98869] text-[9px] font-bold text-white">
                  {wishCount}
                </span>
              )}
            </Link>
            <CartIndicator />
            <span className="hidden h-7 w-px bg-[#e4e7df] sm:block" />
            {user ? (
              <div className="hidden items-center gap-1 rounded-full border border-[#dce4da] bg-white/75 p-1 md:flex">
                <Link
                  className="flex items-center gap-2 rounded-full px-2.5 py-1.5 text-xs font-semibold text-brand-3 transition-colors hover:bg-brand-yellow-bg"
                  href={accountHref}
                >
                  <span className="flex size-6 items-center justify-center rounded-full bg-brand-green text-[10px] font-bold text-brand-3">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="max-w-20 truncate">{user.name}</span>
                </Link>
                <button
                  aria-label="Log out"
                  className="flex size-8 items-center justify-center rounded-full text-brand-light transition-colors hover:bg-brand-peach-bg hover:text-brand-orange-3"
                  onClick={handleLogout}
                  type="button"
                >
                  <SignOut aria-hidden="true" size={16} />
                </button>
              </div>
            ) : (
              <div className="hidden items-center gap-1 rounded-full border border-[#dce4da] bg-white/75 p-1 md:flex">
                <Link
                  className="rounded-full px-3 py-1.5 text-xs font-semibold text-brand-3 transition-colors hover:bg-brand-yellow-bg"
                  href="/login"
                >
                  Log in
                </Link>
                <Link
                  className="rounded-full bg-brand-2 px-3.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-brand-3"
                  href="/register"
                >
                  Join
                </Link>
              </div>
            )}
          </div>

          <button
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            aria-label="Open menu"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#dce4da] bg-white/70 text-[#344a42] transition-colors hover:border-[#b9cbb8] hover:bg-[#eaf0e7] lg:hidden"
            onClick={() => setMenuOpen(true)}
            type="button"
          >
            <List aria-hidden="true" size={18} weight="bold" />
          </button>
        </div>
      </header>

      <Sheet
        className="w-[88vw] max-w-[360px] rounded-l-[26px] border-l border-[#e3e8df] bg-[#fbfaf6] shadow-[0_30px_80px_-30px_rgba(23,62,54,0.45)] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-[side=right]:data-entering:translate-x-full data-[side=right]:data-exiting:translate-x-full sm:max-w-[360px]"
        isOpen={menuOpen}
        onOpenChange={setMenuOpen}
        showCloseButton={false}
        side="right"
      >
        <div className="flex h-full min-h-0 flex-col" id="mobile-menu">
          <SheetHeader className="flex shrink-0 flex-row items-center justify-between gap-3 border-b border-[#e9ece4] px-5 py-3.5">
            <SheetTitle className="sr-only">Site menu</SheetTitle>
            <SheetDescription className="sr-only">
              Browse the marketplace, manage your account, or join the
              community.
            </SheetDescription>

            <Link
              aria-label="Prevent Plastic home"
              className="flex items-center gap-2"
              href="/"
              onClick={closeMenu}
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-brand-2 text-brand-green">
                <Leaf aria-hidden="true" size={16} weight="fill" />
              </span>
              <span className="text-[15px] font-bold tracking-[-0.06em] text-[#173e36]">
                preventplastic
              </span>
            </Link>

            <SheetClose
              aria-label="Close menu"
              className="size-9 rounded-full border-[#dfe6dc] bg-white text-[#344a42] hover:border-brand-2 hover:bg-[#f1f5ed]"
              size="icon"
              variant="outline"
            >
              <X aria-hidden="true" size={15} weight="bold" />
            </SheetClose>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
            <nav aria-label="Mobile navigation">
              <ul className="space-y-1">
                {homePageMock.navigation.map((item, index) => {
                  const isActive = item.href === activeHref

                  return (
                    <li
                      className="mobile-nav-item"
                      key={item.label}
                      style={{ animationDelay: `${index * 45}ms` }}
                    >
                      <Link
                        aria-current={isActive ? "page" : undefined}
                        className={`group flex items-center gap-3 rounded-[16px] px-3 py-2.5 transition-colors duration-200 ${
                          isActive
                            ? "bg-brand-2/10"
                            : "hover:bg-white focus-visible:bg-white"
                        } } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2`}
                        href={item.href}
                        onClick={closeMenu}
                      >
                        <span
                          className={`w-5 shrink-0 text-[9px] font-bold tabular-nums ${
                            isActive ? "text-brand-2" : "text-[#b3bdb4]"
                          } }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={`block font-serif text-[12px] leading-tight tracking-[-0.03em] ${
                              isActive ? "text-brand-2" : "text-[#2b3d36]"
                            } }`}
                          >
                            {item.label}
                          </span>
                          <span className="mt-0.5 block text-[9px] font-medium tracking-[0.05em] text-[#8b988f]">
                            {navDescriptions[item.href] ?? ""}
                          </span>
                        </span>
                        {isActive ? (
                          <span
                            aria-hidden="true"
                            className="size-1.5 shrink-0 rounded-full bg-brand-2"
                          />
                        ) : (
                          <ArrowUpRight
                            aria-hidden="true"
                            className="shrink-0 text-[#c2cbc3] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-2"
                            size={15}
                          />
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="mt-6">
              <p className="px-1 text-[9px] font-bold tracking-[0.18em] text-brand-gray-4 uppercase">
                Quick links
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {[
                  {
                    href: "/#search-filter",
                    label: "Search finds",
                    meta: "Home search",
                    icon: <MagnifyingGlass aria-hidden="true" size={16} />,
                  },
                  {
                    href: "/wishlist",
                    label: "Wishlist",
                    meta: "Saved finds",
                    icon: <SeedlingIcon size={18} />,
                  },
                  {
                    href: "/cart",
                    label: "Your bag",
                    meta:
                      bagCount === 0
                        ? "Empty"
                        : `${bagCount} item${bagCount === 1 ? "" : "s"}`,
                    icon: <ShoppingBagOpen aria-hidden="true" size={16} />,
                  },
                  {
                    href: "/repair",
                    label: "Repair map",
                    meta: "Find a fixer",
                    icon: <MapPin aria-hidden="true" size={16} />,
                  },
                ].map((link, index) => (
                  <Link
                    className="mobile-nav-item flex items-center gap-2.5 rounded-[16px] border border-[#e6ebe1] bg-white/70 px-3 py-2.5 transition-colors duration-200 hover:border-[#c7d8c7] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2"
                    href={link.href}
                    key={link.label}
                    onClick={closeMenu}
                    style={{
                      animationDelay: `${240 + index * 45}ms`,
                    }}
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#eef3ea] text-brand-2">
                      {link.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[9px] font-semibold text-[#2b3d36]">
                        {link.label}
                      </span>
                      <span className="block truncate text-[9px] text-[#8b988f]">
                        {link.meta}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div
              className="mobile-nav-item mt-6 overflow-hidden rounded-[20px] bg-[linear-gradient(140deg,#f0eef8,#edf5e9)] p-4"
              style={{ animationDelay: "440ms" }}
            >
              {user ? (
                <>
                  <p className="text-[9px] font-bold tracking-[0.18em] text-brand-4 uppercase">
                    Your account
                  </p>
                  <p className="mt-1 font-serif text-[19px] leading-tight tracking-[-0.02em] text-brand">
                    Welcome back, {user.name}
                  </p>
                  <Link
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-2 px-3 py-2 text-[11px] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                    href={accountHref}
                    onClick={closeMenu}
                  >
                    Open dashboard{" "}
                    <ArrowUpRight aria-hidden="true" size={13} weight="bold" />
                  </Link>
                  <button
                    className="mt-3 ml-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-3 hover:text-brand-orange-3"
                    onClick={handleLogout}
                    type="button"
                  >
                    <SignOut aria-hidden="true" size={13} /> Log out
                  </button>
                </>
              ) : (
                <>
                  <p className="text-[9px] font-bold tracking-[0.18em] text-brand-4 uppercase">
                    Welcome in
                  </p>
                  <p className="mt-1 font-serif text-[19px] leading-tight tracking-[-0.02em] text-brand">
                    Find your next good thing
                  </p>
                  <p className="mt-1.5 text-[11px] leading-5 text-brand-light">
                    Save finds, follow your orders, and join the community.
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <Link
                      className="inline-flex items-center gap-1.5 rounded-full bg-brand-2 px-3 py-2 text-[11px] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                      href="/register"
                      onClick={closeMenu}
                    >
                      Create account{" "}
                      <ArrowUpRight
                        aria-hidden="true"
                        size={13}
                        weight="bold"
                      />
                    </Link>
                    <Link
                      className="inline-flex items-center gap-1.5 rounded-full border border-white bg-white/70 px-3 py-2 text-[11px] font-semibold text-brand-3"
                      href="/login"
                      onClick={closeMenu}
                    >
                      <SignIn aria-hidden="true" size={13} /> Log in
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          <SheetFooter className="mt-auto shrink-0 border-t border-[#e9ece4] px-5 py-3.5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[9px] font-semibold tracking-[0.16em] text-brand-gray-4 uppercase">
                Good things, again
              </p>
              <Link
                className="inline-flex items-center gap-1 text-[10px] font-semibold text-brand-3 hover:text-brand-2"
                href="/contact"
                onClick={closeMenu}
              >
                Contact
                <ArrowUpRight aria-hidden="true" size={11} />
              </Link>
            </div>
          </SheetFooter>
        </div>
      </Sheet>
    </>
  )
}
