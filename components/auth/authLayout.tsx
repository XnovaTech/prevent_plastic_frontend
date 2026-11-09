import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Leaf } from "@phosphor-icons/react/dist/ssr"

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

      <main className="mx-auto grid max-w-[1440px] items-center gap-6 px-4 py-5 sm:px-8 sm:py-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:px-12 lg:py-10">
        <section className="relative hidden min-h-[620px] overflow-hidden rounded-[32px] bg-[#f0eef8] px-7 py-8 md:block md:px-10 md:py-10 lg:min-h-[680px]">
          <div className="absolute -top-20 -right-24 size-64 rounded-full bg-[#e5e0f3]" />
          <div className="absolute -bottom-28 -left-20 size-72 rounded-full bg-[#e8f1e3]" />
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
              <p className="text-[10px] font-bold tracking-[0.16em] text-brand-4 uppercase">
                Good things, again
              </p>
              <h1 className="mt-4 max-w-md font-serif text-[44px] leading-[1.02] tracking-[-0.055em] text-brand sm:text-[52px]">
                Find things
                <br />
                <span className="text-brand-3 italic">less waste.</span>
              </h1>
              <p className="mt-5 max-w-sm text-sm leading-6 text-brand-light">
                Join a friendly marketplace for pre-loved finds, local makers,
                and everyday repair.
              </p>
            </div>
            <div className="relative mt-10 flex min-h-[270px] items-end justify-center">
              <div className="absolute bottom-0 h-52 w-52 rounded-full bg-white/75 shadow-[0_20px_45px_-30px_rgba(38,74,55,0.4)]" />
              <Image
                alt=""
                aria-hidden="true"
                className="relative z-10 h-64 w-64 object-contain"
                height={320}
                src="/gif/mini.gif"
                width={320}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {["Buy better", "Sell locally", "Repair more"].map((label) => (
                <span
                  className="rounded-full border border-white/80 bg-white/70 px-3.5 py-2 text-[11px] font-semibold text-brand-4"
                  key={label}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>
        <div className="flex items-center justify-center">{children}</div>
      </main>
    </div>
  )
}
