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
        <div className="relative overflow-hidden rounded-[28px] border border-[#e3e9df] bg-[linear-gradient(135deg,rgba(239,245,235,0.9),rgba(255,255,255,0.88)_52%,rgba(250,243,235,0.86))] px-5 py-8 shadow-[0_20px_60px_-48px_rgba(38,74,55,0.4)] sm:rounded-[36px] sm:px-10 sm:py-11 lg:px-16 lg:py-12">
          <div className="pointer-events-none absolute -top-10 left-6 h-24 w-24 rounded-full bg-[#d9f09b]/35 blur-3xl sm:left-10" />
          <div className="pointer-events-none absolute -bottom-14 right-10 h-28 w-28 rounded-full bg-[#f5b89c]/20 blur-3xl sm:right-16" />

          <div className="relative z-10 mx-auto flex max-w-[1040px] flex-col items-center text-center">
            <div className="relative mb-5">
              <div className="relative inline-flex flex-col items-center gap-1 rounded-[999px] px-10 py-6 sm:px-14 sm:py-7">
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-6 -inset-y-6 h-[calc(100%+48px)] w-[calc(100%+48px)]"
                  preserveAspectRatio="none"
                  viewBox="0 0 360 90"
                >
                  <path
                    d="M 38 14 C 68 6, 112 8, 180 10 C 248 12, 292 10, 322 16 C 330 28, 328 46, 322 62 C 292 72, 248 74, 180 72 C 112 70, 68 72, 38 64 C 32 48, 32 28, 38 14 Z"
                    fill="none"
                    stroke="#7fa98a"
                    strokeDasharray="5 9"
                    strokeLinecap="round"
                    strokeWidth="2"
                  />
                  <path
                    d="M 46 22 C 78 16, 118 18, 180 20 C 242 22, 282 20, 314 24 C 320 34, 318 48, 314 58 C 282 66, 242 68, 180 66 C 118 64, 78 66, 46 58 C 42 44, 42 32, 46 22 Z"
                    fill="rgba(217, 240, 155, 0.25)"
                  />
                  <path
                    d="M 27 52 C 19 45, 18 36, 21 29 M 21 39 C 13 39, 10 34, 10 30 C 16 29, 20 32, 21 39 Z M 22 34 C 22 27, 27 23, 32 23 C 33 29, 29 33, 22 34 Z"
                    fill="none"
                    stroke="#7fa98a"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M 333 52 C 341 45, 342 36, 339 29 M 339 39 C 347 39, 350 34, 350 30 C 344 29, 340 32, 339 39 Z M 338 34 C 338 27, 333 23, 328 23 C 327 29, 331 33, 338 34 Z"
                    fill="none"
                    stroke="#7fa98a"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.6"
                  />
                </svg>
                <h2 className="relative font-serif text-[24px] leading-tight tracking-[-0.02em] text-brand sm:text-[25px] md:text-[36px]">
                  ဘာလိုလဲ • ဘာရှာလဲ • ဝင်ကြည့်လေ
                </h2>
                {/* <span className="relative text-[9px] font-semibold tracking-[0.28em] text-[#5f7f6a] uppercase sm:text-[10px]">
                  Second life starts here
                </span> */}
              </div>
            </div>

          

            <div className="mt-6 w-full rounded-[24px] border border-[#e1e8de] bg-white/75 p-2 shadow-[0_12px_35px_-24px_rgba(38,74,55,0.5)] backdrop-blur-sm sm:mt-8 sm:rounded-full sm:p-1.5">
              <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative min-w-0 flex-1">
                  <MagnifyingGlass
                    aria-hidden="true"
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-[#7a8a80] sm:left-5"
                    size={19}
                  />
                  <Input
                    aria-label="ရှာဖွေလိုသော ပစ္စည်း"
                    className="h-12 w-full rounded-full border-0 bg-transparent pl-11 pr-4 text-[13px] text-brand shadow-none placeholder:text-[#8a958b] focus-visible:ring-2 focus-visible:ring-[#9fbea2] sm:h-12 sm:pl-12 sm:text-sm"
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="ရှာလိုသောပစ္စည်းအမည် သို့မဟုတ် အမျိုးအစားကို ရိုက်ထည့်ပါ..."
                    value={searchQuery}
                  />
                </div>
                <Button
                  className="h-12 w-full rounded-full bg-brand-2 px-6 text-xs font-bold text-white transition-colors hover:bg-brand-3 sm:w-auto sm:min-w-[150px] sm:px-8 sm:text-sm"
                  size="lg"
                >
                  ရှာဖွေရန်
                  <MagnifyingGlass aria-hidden="true" size={17} weight="bold" />
                </Button>
              </div>
            </div>

            <div className="mt-5 w-full sm:mt-6">
             
              <div
                aria-label="အမျိုးအစားအလိုက် စစ်ထုတ်ရန်"
                className="flex gap-2 overflow-x-auto px-1 pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0"
                role="group"
              >
                {quickFilters.map((filter) => {
                  const isActive = activeFilter === filter.id

                  return (
                    <button
                      aria-pressed={isActive}
                      className={`inline-flex h-10 shrink-0 items-center rounded-full px-4 text-[12px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39745b] ${
                        isActive
                          ? "bg-brand-2 text-white shadow-sm"
                          : "border border-[#d4e0d1] bg-white/85 text-[#3f5849] hover:border-[#9db89a] hover:bg-white"
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
      </div>
    </section>
  )
}
