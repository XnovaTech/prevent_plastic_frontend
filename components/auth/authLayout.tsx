import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Leaf } from "@phosphor-icons/react/dist/ssr"

type AuthLayoutProps = {
  children: React.ReactNode
  compact?: boolean
}

export function AuthLayout({ children, compact = false }: AuthLayoutProps) {
  return (
    <div className={`${compact ? "h-dvh overflow-hidden" : "min-h-screen"} bg-[#fbfcf8] text-brand`}>
      <header className="border-b border-white/80 bg-white/70 backdrop-blur-xl">
        <div className={`mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-12 ${compact ? "h-16" : "h-[76px]"}`}>
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

      <main className={`mx-auto grid max-w-[1440px] ${compact ? "items-center" : "items-start"} gap-6 px-4 py-5 sm:px-8 sm:py-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:px-12 ${compact ? "h-[calc(100dvh-64px)] overflow-hidden lg:gap-0 lg:bg-white lg:px-0 lg:py-0" : "lg:py-10"}`}>
        <section className={`relative hidden overflow-hidden rounded-[32px] border border-white/70 bg-[#eef4e9] px-7 py-8 shadow-[0_28px_70px_-48px_rgba(38,74,55,0.48)] lg:block lg:px-10 lg:py-10 ${compact ? "min-h-0 py-6 lg:h-full lg:rounded-none lg:border-y-0 lg:border-l-0 lg:border-r lg:border-r-[#dfe7dc] lg:px-8 lg:py-7 lg:shadow-none" : "min-h-[620px] lg:min-h-[680px]"}`}>
          <div aria-hidden="true" className="absolute -top-24 -right-20 size-72 rounded-full border-[26px] border-[#dfe7d9]" />
          <div aria-hidden="true" className="absolute top-12 right-12 size-3 rounded-full bg-brand-orange/70" />
          <div aria-hidden="true" className="absolute top-20 right-20 size-1.5 rounded-full bg-brand-3/70" />
          <div aria-hidden="true" className="absolute -bottom-28 -left-20 size-80 rounded-full bg-[#dcebd6]" />
          <Image
            alt=""
            aria-hidden="true"
            className="absolute top-8 right-6 w-32 opacity-80"
            height={100}
            src="/illustrations/marketDoodle.svg"
            width={150}
          />
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
            <div className={`relative flex items-end justify-center ${compact ? "mt-3 min-h-[180px]" : "mt-8 min-h-[270px]"}`}>
              <div aria-hidden="true" className={`absolute bottom-3 rounded-full border border-white/80 bg-[#f8fbf4]/75 shadow-[0_20px_45px_-30px_rgba(38,74,55,0.4)] ${compact ? "h-32 w-52" : "h-52 w-64"}`} />
              <span aria-hidden="true" className="absolute bottom-8 left-1/2 h-3 w-36 -translate-x-1/2 rounded-[100%] bg-brand/12 blur-sm" />
              <Image
                alt="A community member carrying a reusable bag"
                aria-hidden="true"
                className={`relative z-10 object-contain drop-shadow-[0_16px_18px_rgba(38,74,55,0.14)] ${compact ? "h-48 w-48" : "h-72 w-72"}`}
                height={1024}
                src="/illustrations/community-girl-cutout.png"
                width={1024}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2 border-t border-white/75 pt-4">
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
        <div className={`flex w-full items-center justify-center ${compact ? "lg:h-full lg:bg-white/80 lg:px-8" : ""}`}>{children}</div>
      </main>
    </div>
  )
}
