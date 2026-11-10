import {
  ArrowRight,
  ChartLineUp,
  Storefront,
  Tag,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    label: "Active vendors",
    value: "05",
    note: "+2 this month",
    icon: Storefront,
  },
  {
    label: "Pending review",
    value: "02",
    note: "Needs attention",
    icon: ChartLineUp,
  },
  { label: "Categories", value: "05", note: "All active", icon: Tag },
  {
    label: "Registered users",
    value: "10",
    note: "+8 this month",
    icon: UsersThree,
  },
]

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-[1280px]">
      <section className="relative overflow-hidden rounded-[28px] bg-[#f0eef8] px-6 py-7 sm:px-8 sm:py-9">
        <div className="absolute -right-12 -bottom-20 size-56 rounded-full bg-white/50" />
        <div className="relative z-10 max-w-xl">
          <Badge
            className="border-0 bg-white/70 text-brand-4"
            variant="outline"
          >
            Monday, workspace overview
          </Badge>
          <h2 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.05em] text-brand sm:text-5xl">
            A little order goes a long way.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-6 text-brand-light">
            Keep the marketplace welcoming, useful, and full of good things
            worth passing on.
          </p>
        </div>
      </section>
      <section
        className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Admin statistics"
      >
        {stats.map(({ icon: Icon, label, note, value }) => (
          <Card
            className="gap-0 rounded-[22px] border border-[#e4e9df] bg-white shadow-none"
            key={label}
            size="sm"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center rounded-full bg-brand-yellow-bg text-brand-3">
                  <Icon size={18} weight="fill" />
                </span>
                <span className="text-2xl font-bold tracking-[-0.04em] text-brand">
                  {value}
                </span>
              </div>
              <p className="mt-5 text-sm font-semibold text-brand-5">{label}</p>
              <p className="mt-1 text-xs text-brand-gray-3">{note}</p>
            </CardContent>
          </Card>
        ))}
      </section>
      <section className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-[24px] border border-[#e4e9df] bg-white shadow-none">
          <div className="flex items-center justify-between border-b border-[#edf0ea] px-6 py-5">
            <div>
              <p className="text-[10px] font-bold tracking-[0.14em] text-brand-gray-3 uppercase">
                Needs a look
              </p>
              <h2 className="mt-1 text-lg font-bold text-brand">
                Recent vendor applications
              </h2>
            </div>
            <Button
              className="text-xs font-bold text-brand-3 hover:text-brand-orange"
              size="sm"
              variant="ghost"
            >
              View all
            </Button>
          </div>
          <CardContent className="p-0">
            {["Demo Vendor", "Demo Vendor 2", "Demo Vendor 3"].map(
              (vendor, index) => (
                <div
                  className="flex items-center justify-between gap-4 border-b border-[#edf0ea] px-6 py-4 last:border-b-0"
                  key={vendor}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f0eef8] text-xs font-bold text-brand-3">
                      {vendor.slice(-1)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-brand">
                        {vendor}
                      </p>
                      <p className="mt-1 text-xs text-brand-gray-3">
                        {index === 0 ? "Business" : "Individual"} · submitted
                        today
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">Pending</Badge>
                </div>
              )
            )}
          </CardContent>
        </Card>
        <Card className="rounded-[24px] border border-[#e4e9df] bg-white shadow-none">
          <CardContent className="p-6">
            <p className="text-[10px] font-bold tracking-[0.14em] text-brand-gray-3 uppercase">
              Quick start
            </p>
            <h2 className="mt-1 text-lg font-bold text-brand">
              Keep things moving
            </h2>
            <div className="mt-5 flex flex-col gap-2">
              <a
                className="flex items-center justify-between rounded-2xl bg-brand-yellow-bg px-4 py-3 text-sm font-semibold text-brand-3 hover:bg-[#e3efdc]"
                href="#vendors"
              >
                Review vendors <ArrowRight size={16} />
              </a>
              <a
                className="flex items-center justify-between rounded-2xl border border-[#e4e9df] px-4 py-3 text-sm font-semibold text-brand-5 hover:bg-brand-yellow-bg"
                href="#categories"
              >
                Edit categories <ArrowRight size={16} />
              </a>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
