"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  CaretDown,
  ChartLineUp,
  GearSix,
  Heart,
  Leaf,
  List,
  MapPin,
  Package,
  SignOut,
  Storefront,
  Tag,
  UsersThree,
  X,
} from "@phosphor-icons/react/dist/ssr"
import type { ElementType } from "react"

import { Button } from "@/components/ui/button"
import { useDashboardLogout } from "@/hooks/useDashboardLogout"

export type DashboardNavItem = {
  href: string
  label: string
  icon: DashboardIconName
  section?: "manage" | "account"
  children?: DashboardNavItem[]
}

export type DashboardIconName =
  | "chart"
  | "gear"
  | "heart"
  | "map-pin"
  | "package"
  | "storefront"
  | "tag"
  | "users"

const iconMap: Record<DashboardIconName, ElementType> = {
  chart: ChartLineUp,
  gear: GearSix,
  heart: Heart,
  "map-pin": MapPin,
  package: Package,
  storefront: Storefront,
  tag: Tag,
  users: UsersThree,
}

function isNavigationActive(pathname: string, href: string) {
  const isDashboardHome = href.split("/").filter(Boolean).length === 1

  return (
    pathname === href || (!isDashboardHome && pathname.startsWith(`${href}/`))
  )
}

type DashboardLayoutProps = {
  children: React.ReactNode
  roleLabel: string
  eyebrow: string
  title: string
  navigation: DashboardNavItem[]
}

export function DashboardLayout({
  children,
  roleLabel,
  eyebrow,
  title,
  navigation,
}: DashboardLayoutProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigationRef = useRef<HTMLElement>(null)
  const [navigationThumb, setNavigationThumb] = useState({
    height: 0,
    isVisible: false,
    top: 0,
  })
  const [expandedNavigation, setExpandedNavigation] = useState<
    Record<string, boolean>
  >({})
  const { isLoggingOut, logout } = useDashboardLogout()
  const updateNavigationThumb = useCallback(() => {
    const navigationElement = navigationRef.current
    if (!navigationElement) {
      return
    }

    const { clientHeight, scrollHeight, scrollTop } = navigationElement
    const isVisible = scrollHeight > clientHeight + 1
    const height = isVisible
      ? Math.max(28, (clientHeight * clientHeight) / scrollHeight)
      : 0
    const top = isVisible
      ? (scrollTop / (scrollHeight - clientHeight)) * (clientHeight - height)
      : 0

    setNavigationThumb({ height, isVisible, top })
  }, [])

  useEffect(() => {
    const navigationElement = navigationRef.current
    if (!navigationElement) {
      return
    }

    const animationFrame = window.requestAnimationFrame(updateNavigationThumb)
    const resizeObserver = new ResizeObserver(updateNavigationThumb)
    resizeObserver.observe(navigationElement)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
    }
  }, [expandedNavigation, pathname, updateNavigationThumb])

  return (
    <div className="min-h-screen bg-[#f7f9f4] text-brand">
      <div className="flex min-h-screen">
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-[270px] flex-col border-r border-[#e3e9df] bg-white px-5 py-6 shadow-xl shadow-brand/5 transition-transform lg:fixed lg:translate-x-0 lg:shadow-none ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between">
            <Link className="flex items-center gap-2.5" href="/">
              <span className="flex size-10 items-center justify-center rounded-full bg-brand-yellow-bg text-brand-2">
                <Leaf aria-hidden="true" size={23} weight="fill" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[18px] font-bold tracking-[-0.06em]">
                  preventplastic
                </span>
                <span className="mt-1 text-[8px] font-semibold tracking-[0.18em] text-brand-gray-3 uppercase">
                  {roleLabel} space
                </span>
              </span>
            </Link>
            <Button
              aria-label="Close dashboard menu"
              className="text-brand-light hover:bg-brand-yellow-bg lg:hidden"
              onPress={() => setMenuOpen(false)}
              size="icon"
              variant="ghost"
            >
              <X size={18} />
            </Button>
          </div>
          <div className="mt-10 rounded-[22px] bg-[#f0eef8] px-4 py-4">
            <p className="text-[10px] font-bold tracking-[0.14em] text-brand-4 uppercase">
              {eyebrow}
            </p>
            <p className="mt-1 text-sm font-semibold text-brand">{title}</p>
          </div>
          <div className="relative mt-8 min-h-0 flex-1">
            <nav
              aria-label={`${roleLabel} navigation`}
              className="dashboard-sidebar-scroll flex h-full min-h-0 flex-col gap-1 overflow-y-auto pr-2"
              onScroll={updateNavigationThumb}
              ref={navigationRef}
            >
            <p className="mb-2 px-3 text-[10px] font-bold tracking-[0.15em] text-brand-gray-3 uppercase">
              Manage
            </p>
            {navigation.map(
              (
                { children: nestedItems, href, label, icon, section },
                index
              ) => {
                const isFirstAccountItem =
                  section === "account" &&
                  navigation[index - 1]?.section !== "account"
                const active = isNavigationActive(pathname, href)
                const hasActiveChild = nestedItems?.some((item) =>
                  isNavigationActive(pathname, item.href)
                )
                const isExpanded =
                  expandedNavigation[href] ?? Boolean(hasActiveChild)
                const Icon = iconMap[icon]
                return (
                  <div key={href}>
                    {isFirstAccountItem && (
                      <p className="mt-5 mb-2 px-3 text-[10px] font-bold tracking-[0.15em] text-brand-gray-3 uppercase">
                        Account
                      </p>
                    )}
                    <div
                      className={`flex items-center text-sm transition-colors ${nestedItems ? "text-brand-light" : active ? "rounded-2xl bg-brand-2 font-semibold text-white shadow-sm" : "rounded-2xl font-semibold text-brand-light hover:bg-brand-yellow-bg hover:text-brand-3"}`}
                    >
                      {nestedItems ? (
                        <button
                          aria-expanded={isExpanded}
                          aria-label={`Toggle ${label} navigation`}
                          className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left font-medium"
                          onClick={() =>
                            setExpandedNavigation((current) => ({
                              ...current,
                              [href]: !isExpanded,
                            }))
                          }
                          type="button"
                        >
                          <span className="flex min-w-0 items-center gap-3">
                            <Icon
                              aria-hidden="true"
                              size={18}
                              weight="regular"
                            />
                            {label}
                          </span>
                          <CaretDown
                            aria-hidden="true"
                            className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                            size={15}
                            weight="bold"
                          />
                        </button>
                      ) : (
                        <Link
                          className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3"
                          href={href}
                          onClick={() => setMenuOpen(false)}
                        >
                          <Icon
                            aria-hidden="true"
                            size={18}
                            weight={active ? "fill" : "regular"}
                          />
                          {label}
                        </Link>
                      )}
                    </div>
                    {nestedItems && isExpanded && (
                      <div className="mt-1 ml-5 border-l border-[#dce4da] pl-3">
                        {nestedItems.map((item) => {
                          const ChildIcon = iconMap[item.icon]
                          const childActive =
                            pathname === item.href ||
                            (item.href === "/admin/blog" &&
                              pathname.startsWith("/admin/blog/") &&
                              !pathname.startsWith("/admin/blog/categories"))

                          return (
                            <Link
                              className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold transition-colors ${childActive ? "bg-brand-2 text-white shadow-sm" : "text-brand-light hover:bg-brand-yellow-bg hover:text-brand-3"}`}
                              href={item.href}
                              key={item.href}
                              onClick={() => setMenuOpen(false)}
                            >
                              <ChildIcon
                                aria-hidden="true"
                                size={15}
                                weight={childActive ? "fill" : "regular"}
                              />
                              {item.label}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              }
            )}
            </nav>
            {navigationThumb.isVisible ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 h-full w-1 rounded-full bg-[#edf1eb]"
              >
                <span
                  className="absolute inset-x-0 rounded-full bg-[#8fa298]/55 transition-[height,transform] duration-150"
                  style={{
                    height: `${navigationThumb.height}px`,
                    transform: `translateY(${navigationThumb.top}px)`,
                  }}
                />
              </span>
            ) : null}
          </div>
          <div className="mt-5 shrink-0 space-y-2 border-t border-[#edf1eb] pt-5">
            <Button
              className="w-full justify-center rounded-2xl border-[#f0d4d0] text-brand-orange-3 hover:bg-brand-peach-bg"
              isDisabled={isLoggingOut}
              onPress={() => void logout()}
              variant="outline"
            >
              <SignOut aria-hidden="true" size={16} />
              {isLoggingOut ? "Logging out…" : "Log out"}
            </Button>
            <Link
              className="block rounded-2xl border border-[#dce4da] px-4 py-3 text-center text-xs font-bold text-brand-3 transition-colors hover:bg-brand-yellow-bg"
              href="/"
            >
              Back to storefront
            </Link>
          </div>
        </aside>
        {menuOpen && (
          <button
            aria-label="Close dashboard menu overlay"
            className="fixed inset-0 z-40 bg-brand/20 backdrop-blur-sm lg:hidden"
            onClick={() => setMenuOpen(false)}
            type="button"
          />
        )}
        <div className="min-w-0 flex-1 lg:ml-[270px]">
          <header className="sticky top-0 z-30 border-b border-white/80 bg-[#f7f9f4]/85 px-4 py-4 backdrop-blur-xl sm:px-8 lg:px-10">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Button
                  aria-label="Open dashboard menu"
                  className="border-[#dce4da] bg-white text-brand-3 lg:hidden"
                  onPress={() => setMenuOpen(true)}
                  size="icon"
                  variant="outline"
                >
                  <List size={18} />
                </Button>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.15em] text-brand-gray-3 uppercase">
                    {eyebrow}
                  </p>
                  <h1 className="mt-0.5 text-lg font-bold tracking-[-0.03em] text-brand sm:text-xl">
                    {title}
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Button
                  aria-label="Notifications"
                  className="relative border-[#dce4da] bg-white text-brand-4 hover:bg-brand-yellow-bg"
                  size="icon"
                  variant="outline"
                >
                  <Bell size={18} />
                  <span className="absolute top-2 right-2 size-1.5 rounded-full bg-brand-orange" />
                </Button>
                <div className="flex size-9 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-brand-3">
                  N
                </div>
              </div>
            </div>
          </header>
          <main className="px-4 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
