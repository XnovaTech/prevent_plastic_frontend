"use client"

import { useState } from "react"
import { MagnifyingGlass } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const style = `
  @font-face {
    font-family: "BurmeseHandwriting";
    src: url("/fonts/Burmese%20Handwriting.ttf") format("truetype");
    font-display: block;
  }
  :root { --green:#174f45; --leaf:#7fa88f; }
  .txt {
    font-family:"BurmeseHandwriting",sans-serif;
    font-size:clamp(28px,5.5vw,48px);
    line-height:1.5;
    clip-path: inset(-30px 100% -30px -8px);
    animation: reveal 1s steps(22) .2s forwards;
    color:var(--green);
  }
  .w { display:inline-block; white-space:nowrap; animation: wave 2s ease-in-out infinite; }
  .w1 { animation-delay:1.2s; }
  .w2 { animation-delay:1.5s; }
  .w3 { animation-delay:1.8s; }
  .dot { display:inline-block; margin:0 .35em; color:var(--leaf); }
  @keyframes reveal { to { clip-path: inset(-30px -30px -30px -8px); } }
  @keyframes wave { 0%,100% { transform:translateY(0) rotate(0); } 50% { transform:translateY(-10px) rotate(-2deg); } }
  .placeholder-burmese::placeholder {
    font-family:"BurmeseHandwriting",sans-serif;
  }
  .btn-burmese {
    font-family:"BurmeseHandwriting",sans-serif;
  }
`

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
    <section
      className="px-4 pb-10 sm:px-8 sm:pb-12 lg:px-12"
      id="search-filter"
    >
      <div className="relative mx-auto max-w-[1440px]">
        <div className="relative overflow-hidden rounded-[28px] border border-[#e3e9df] bg-[linear-gradient(135deg,rgba(239,245,235,0.9),rgba(255,255,255,0.88)_52%,rgba(250,243,235,0.86))] px-5 py-8 shadow-[0_20px_60px_-48px_rgba(38,74,55,0.4)] sm:rounded-[36px] sm:px-10 sm:py-11 lg:px-16 lg:py-12">
          <div className="relative z-10 mx-auto flex max-w-[1040px] flex-col items-center text-center">
            <div className="relative mb-8 w-full">
              <div className="relative inline-flex flex-col items-center gap-1 rounded-[999px] px-10 py-6 sm:px-14 sm:py-7">
                <style>{style}</style>
                <h2 className="txt relative sm:text-[25px] md:text-[36px]">
                  <span className="w w1">ဘာလိုလဲ</span>
                  <span className="dot">၊</span>
                  <span className="w w2">ဘာရှာလဲ</span>
                  <span className="dot">၊</span>
                  <span className="w w3">ဝင်ကြည့်လေ</span>
                </h2>

                {/* <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-[-12%] hidden h-12 w-12 -translate-y-1/2 rotate-6 text-brand-3 opacity-75 sm:block"
                  fill="none"
                  viewBox="0 0 64 64"
                >
                  <path
                    d="m43 16 8 2-2 8M51 18c-6-7-15-10-24-8M19 24l-2 8-8-3m7 4c2-9 9-16 17-19m20 29 5 7-8 5m2-8c-8 5-18 5-26 1"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  />
                  <path
                    d="m40 37-8-3m-8 6 8 3m7-27-3 8"
                    stroke="#df896b"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />
                </svg> */}
                 <svg
                  aria-hidden="true"
                   className="pointer-events-none absolute top-1/2 right-[-12%] hidden h-12 w-12 -translate-y-1/2 rotate-6 text-brand-3 opacity-75 sm:block"
                  fill="none"
                  viewBox="0 0 56 56"
                >
                  <path
                    d="M13 24h30l-3 25H16l-3-25Zm6 0v-5a9 9 0 0 1 18 0v5m-9 20V32m0 0c-7 0-10-4-10-10 7 0 10 4 10 10Zm0-5c0-6 3-9 10-9 0 6-3 9-10 9Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.2"
                  />
                  <path
                    d="m9 15 2 2m35 17 2 2"
                    stroke="#df896b"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />
                </svg>

                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-[-18%] left-[14%] hidden h-10 w-10 -rotate-6 text-[#82974f] opacity-80 md:block"
                  fill="none"
                  viewBox="0 0 56 56"
                >
                  <path
                    d="M13 24h30l-3 25H16l-3-25Zm6 0v-5a9 9 0 0 1 18 0v5m-9 20V32m0 0c-7 0-10-4-10-10 7 0 10 4 10 10Zm0-5c0-6 3-9 10-9 0 6-3 9-10 9Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.2"
                  />
                  <path
                    d="m9 15 2 2m35 17 2 2"
                    stroke="#df896b"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />
                </svg>

                <div className="absolute top-1/2 left-[-10%] h-12 w-12 -rotate-12 opacity-75 md:left-[-12%]">
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="#39745b"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M31 55c1-13 2-22 8-32M37 31c-12 1-19-5-19-16 11-1 19 5 19 16Zm3-10c0-11 7-18 18-17 0 11-7 18-18 17Zm-18-8 13 15m20-11L39 29" />
                  </svg>
                </div>
                <div className="hidden">
                  <svg
                    viewBox="0 0 64 64"
                    fill="none"
                    stroke="#39745b"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s-4 2-4-6s4-6 4-6s4 2 4 6s-4 6-4 6ZM18 14s2 2 2-2s-2-2-2-2s-2 2-2 2s2 2 2 2ZM6 14s2 2 2-2s-2-2-2-2s-2 2-2 2s2 2 2 2Z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-8 w-full rounded-[24px] border border-[#e1e8de] bg-white/75 p-2 shadow-[0_12px_35px_-24px_rgba(38,74,55,0.5)] backdrop-blur-sm sm:mt-10 sm:rounded-full sm:p-1.5">
              <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative min-w-0 flex-1">
                  <MagnifyingGlass
                    aria-hidden="true"
                    className="absolute top-1/2 left-4 -translate-y-1/2 text-[#7a8a80] sm:left-5"
                    size={19}
                  />
                  <Input
                    aria-label="ရှာဖွေလိုသော ပစ္စည်း"
                    className="placeholder-burmese h-12 w-full rounded-full border-0 bg-transparent pr-4 pl-11 text-[13px] text-brand shadow-none placeholder:text-[#8a958b] focus-visible:ring-2 focus-visible:ring-[#9fbea2] sm:h-12 sm:pl-12 sm:text-sm"
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="ရှာလိုသောပစ္စည်းအမည် သို့မဟုတ် အမျိုးအစားကို ရိုက်ထည့်ပါ..."
                    value={searchQuery}
                  />
                </div>
                <Button
                  className="btn-burmese h-12 w-full rounded-full bg-brand-2 px-6 text-xs font-bold text-white transition-colors hover:bg-brand-3 sm:w-auto sm:min-w-[150px] sm:px-8 sm:text-sm"
                  size="lg"
                >
                  ရှာဖွေရန်
                  <MagnifyingGlass aria-hidden="true" size={17} weight="bold" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
