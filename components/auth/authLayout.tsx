import Link from "next/link"
import { ArrowRight, Leaf } from "@phosphor-icons/react/dist/ssr"

import { MiniSvg } from "@/components/shared/miniSvg"

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#fbfcf8] text-brand">
      <header className="border-b border-white/80 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">
          <Link
            aria-label="Prevent Plastic home"
            className="group flex items-center gap-2.5"
            href="/"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-brand-yellow-bg text-brand-2 shadow-sm transition-transform group-hover:rotate-[-8deg]">
              <Leaf aria-hidden="true" size={23} weight="fill" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[19px] font-bold tracking-[-0.06em] text-brand transition-colors group-hover:text-brand-2">
                preventplastic
              </span>
              <span className="mt-1 text-[9px] font-semibold tracking-[0.2em] text-brand-gray-3 uppercase">
                good things, again
              </span>
            </span>
          </Link>
          <Link
            className="inline-flex items-center gap-1.5 rounded-full border border-[#dce4da] bg-white/70 px-4 py-2 text-xs font-semibold text-brand-5 transition-all hover:-translate-y-0.5 hover:border-brand-3 hover:bg-brand-yellow-bg"
            href="/"
          >
            Back to home
            <ArrowRight aria-hidden="true" size={14} />
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1440px] items-start gap-6 px-4 py-5 sm:px-8 sm:py-8 lg:h-[calc(100dvh-76px)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:overflow-hidden lg:px-12 lg:py-10">
        <section className="relative hidden min-h-[620px] overflow-hidden rounded-[32px] border border-white/70 bg-[#eef4e9] px-7 py-8 shadow-[0_28px_70px_-48px_rgba(38,74,55,0.48)] lg:block lg:h-full lg:min-h-0 lg:px-10 lg:py-10">
          <div aria-hidden="true" className="absolute -top-24 -right-20 size-72 rounded-full border-[26px] border-[#dfe7d9]" />
          <div aria-hidden="true" className="absolute top-12 right-12 size-3 rounded-full bg-brand-orange/70" />
          <div aria-hidden="true" className="absolute top-20 right-20 size-1.5 rounded-full bg-brand-3/70" />
          <div aria-hidden="true" className="absolute -bottom-28 -left-20 size-80 rounded-full bg-[#dcebd6]" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p className="flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-brand-4 uppercase">
                <span className="size-2 rounded-full bg-brand-orange" /> Good things, again
              </p>
              <h1 className="mt-4 max-w-md font-serif text-[44px] leading-[0.98] tracking-[-0.06em] text-brand sm:text-[52px]">
                A lighter way
                <br />
                <span className="text-brand-3 italic">to live.</span>
              </h1>
              <p className="mt-5 max-w-[22rem] text-sm leading-6 text-brand-light">
                Give good things another chapter. Find pre-loved treasures,
                support local makers, and repair what matters.
              </p>
              <p className="mt-5 text-[11px] font-semibold tracking-[0.08em] text-brand-3 uppercase">
                Little choices, lasting change
              </p>
            </div>
            <div className="mt-8 flex min-h-0 flex-1 items-center justify-center">
              <MiniSvg
                className="pointer-events-none h-[min(38vh,22rem)] w-[min(38vh,22rem)] object-contain opacity-95"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2 border-t border-white/75 pt-10 mt-4">
              {["Buy better", "Sell locally", "Repair more"].map((label) => (
                <span
                  className="min-w-[112px] rounded-full border border-white/80 bg-white/80 px-3.5 py-2 text-center text-[11px] font-semibold text-brand-4 shadow-sm"
                  key={label}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>
        <div className="flex w-full items-start justify-center lg:h-full lg:min-h-0 lg:overflow-y-auto lg:px-2 lg:py-2">{children}</div>
      </main>
    </div>
  )
}

export function AuthPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-[28px] border border-[#e1e8de] bg-white/85 p-6 shadow-[0_24px_70px_-42px_rgba(27,65,56,0.45)] backdrop-blur-xl sm:p-8 ${className}`}>
      {children}
    </section>
  )
}
