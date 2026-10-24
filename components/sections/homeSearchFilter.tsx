"use client"

import { useState } from "react"
import { Funnel, MagnifyingGlass } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const quickFilters = [
  { id: "all", label: "အားလုံး" },
  { id: "clothes", label: "အဝတ်အစား" },
  { id: "home", label: "အိမ်သုံးပစ္စည်း" },
  { id: "books", label: "စာအုပ်" },
  { id: "accessories", label: "အသုံးအဆောင်" },
  { id: "repair", label: "ပြုပြင်ခွင့်" },
]

export function HomeSearchFilter() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="px-4 pb-10 sm:px-8 sm:pb-12 lg:px-12" id="search-filter">
      <div className="relative mx-auto max-w-[1440px]">
        <div className="relative overflow-hidden rounded-[28px] border border-[#d8e6d0] bg-[radial-gradient(circle_at_top,_#f6fbf1,_#f1f7ec)] px-5 py-7 shadow-[0_40px_80px_-60px_rgba(57,116,91,0.9)] sm:rounded-[32px] sm:px-8 sm:py-9 lg:px-12 lg:py-10">
          <div className="pointer-events-none absolute -top-10 left-6 h-20 w-20 rounded-full bg-[#d9f09b]/40 blur-3xl sm:left-10" />
          <div className="pointer-events-none absolute -bottom-14 right-10 h-24 w-24 rounded-full bg-[#f5b89c]/25 blur-3xl sm:right-16" />

          <div className="relative z-10 mx-auto flex max-w-[980px] flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="relative inline-flex flex-col items-center gap-1 rounded-[999px] px-6 py-3 sm:px-10 sm:py-4">
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-4 -inset-y-3 h-[calc(100%+24px)] w-[calc(100%+32px)]"
                  preserveAspectRatio="none"
                  viewBox="0 0 320 90"
                >
                  <path
                    d="M 18 14 C 48 6, 92 8, 160 10 C 228 12, 272 10, 302 16 C 310 28, 308 46, 302 62 C 272 72, 228 74, 160 72 C 92 70, 48 72, 18 64 C 12 48, 12 28, 18 14 Z"
                    fill="none"
                    stroke="#7fa98a"
                    strokeDasharray="6 10"
                    strokeLinecap="round"
                    strokeWidth="2.2"
                  />
                  <path
                    d="M 26 22 C 58 16, 98 18, 160 20 C 222 22, 262 20, 294 24 C 300 34, 298 48, 294 58 C 262 66, 222 68, 160 66 C 98 64, 58 66, 26 58 C 22 44, 22 32, 26 22 Z"
                    fill="rgba(217, 240, 155, 0.25)"
                  />
                </svg>
                <span className="relative font-serif text-[18px] tracking-[-0.02em] text-brand sm:text-[22px] md:text-[26px]">
                  ဘာလိုလဲ • ဘာရှာလဲ • ဝင်ကြည့်လေ
                </span>
                <span className="relative text-[9px] font-semibold tracking-[0.28em] text-[#5f7f6a] uppercase sm:text-[10px]">
                  Second life starts here
                </span>
              </div>
            </div>

            <p className="max-w-[620px] text-[12px] leading-6 text-brand-light sm:text-[13px] sm:leading-7">
              သင့်အတွက်လိုအပ်တာကို ရှာဖွေလိုက်ပါ။ အဝတ်အစား၊ အိမ်သုံးပစ္စည်းများနှင့် အခြားများစွာကို
              စျေးနှုန်းသက်သက်သာသာဖြင့် ရှာနိုင်ပါသည်။
            </p>

            <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-2">
              <div className="relative flex-1">
                <MagnifyingGlass
                  aria-hidden="true"
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-[#7a8a80]"
                  size={18}
                />
                <Input
                  className="h-12 w-full rounded-full border-[#c9d7c6] bg-white/90 pl-11 pr-4 text-[13px] text-brand shadow-sm placeholder:text-[#8a958b] focus-visible:border-[#7fa98a] focus-visible:ring-[#d9f09b]/60 sm:h-12"
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="ရှာလိုသောပစ္စည်းအမည် သို့မဟုတ် အမျိုးအစားကို ရိုက်ထည့်ပါ..."
                  value={searchQuery}
                />
              </div>
              <Button
                className="h-12 rounded-full bg-brand-2 px-6 text-[11px] font-bold tracking-[0.12em] text-white uppercase transition-transform hover:-translate-y-0.5 sm:px-8 sm:text-xs"
                size="lg"
              >
                ရှာဖွေရန်
                <MagnifyingGlass aria-hidden="true" size={16} weight="bold" />
              </Button>
            </div>

            <div className="mt-5 flex w-full flex-wrap items-center justify-center gap-2 sm:mt-6">
              <div className="mr-1 flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.16em] text-[#5f7f6a] uppercase">
                <Funnel aria-hidden="true" size={14} />
                စစ်ထုတ်မှု
              </div>
              {quickFilters.map((filter) => {
                const isActive = activeFilter === filter.id

                return (
                  <button
                    className={`inline-flex h-9 items-center rounded-full px-4 text-[11px] font-medium transition-all sm:h-9 ${
                      isActive
                        ? "bg-brand-2 text-white shadow-[0_12px_40px_-18px_rgba(57,116,91,1)]"
                        : "border border-[#c9d7c6] bg-white/80 text-[#3f5849] hover:-translate-y-0.5 hover:border-[#9db89a] hover:bg-white"
                    }`}
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    type="button"
                  >
                    {filter.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
