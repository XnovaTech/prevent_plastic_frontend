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
    font-size:clamp(30px,6vw,56px);
    line-height:2;
    clip-path: inset(-40px 100% -40px -10px);
    animation: reveal .9s steps(22) .2s forwards;
    color:var(--green);
  }
  .w { display:inline-block; white-space:nowrap; animation: wave 1.8s ease-in-out infinite; }
  .w1 { animation-delay:1.2s; }
  .w2 { animation-delay:1.45s; }
  .w3 { animation-delay:1.7s; }
  .dot { display:inline-block; margin:0 .3em; color:var(--leaf); }
  @keyframes reveal { to { clip-path: inset(-40px -40px -40px -10px); } }
  @keyframes wave { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
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
    <section className="px-4 pb-10 sm:px-8 sm:pb-12 lg:px-12" id="search-filter">
      <div className="relative mx-auto max-w-[1440px]">
        <div className="relative overflow-hidden rounded-[28px] border border-[#e3e9df] bg-[linear-gradient(135deg,rgba(239,245,235,0.9),rgba(255,255,255,0.88)_52%,rgba(250,243,235,0.86))] px-5 py-8 shadow-[0_20px_60px_-48px_rgba(38,74,55,0.4)] sm:rounded-[36px] sm:px-10 sm:py-11 lg:px-16 lg:py-12">
          <div className="pointer-events-none absolute -top-10 left-6 h-24 w-24 rounded-full bg-[#d9f09b]/35 blur-3xl sm:left-10" />
          <div className="pointer-events-none absolute -bottom-14 right-10 h-28 w-28 rounded-full bg-[#f5b89c]/20 blur-3xl sm:right-16" />

          <div className="relative z-10 mx-auto flex max-w-[1040px] flex-col items-center text-center">
            <div className="relative mb-5">
              <div className="relative inline-flex flex-col items-center gap-1 rounded-[999px] px-10 py-6 sm:px-14 sm:py-7">
                <style>{style}</style>
                <h2 className="relative txt sm:text-[25px] md:text-[36px]">
                  <span className="w w1">ဘာလိုလဲ</span><span className="dot">၊</span><span className="w w2">ဘာရှာလဲ</span><span className="dot">၊</span><span className="w w3">ဝင်ကြည့်လေ</span>
                </h2>
         
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
                    className="h-12 w-full rounded-full border-0 bg-transparent pl-11 pr-4 text-[13px] text-brand shadow-none placeholder:text-[#8a958b] focus-visible:ring-2 focus-visible:ring-[#9fbea2] sm:h-12 sm:pl-12 sm:text-sm placeholder-burmese"
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="ရှာလိုသောပစ္စည်းအမည် သို့မဟုတ် အမျိုးအစားကို ရိုက်ထည့်ပါ..."
                    value={searchQuery}
                  />
                </div>
                <Button
                  className="h-12 w-full rounded-full bg-brand-2 px-6 text-xs font-bold text-white transition-colors hover:bg-brand-3 sm:w-auto sm:min-w-[150px] sm:px-8 sm:text-sm btn-burmese"
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
