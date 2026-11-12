import {
  ArrowRight,
  CheckCircle,
  Package,
  Plus,
  ShoppingBagOpen,
  TrendUp,
} from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { LinkButton } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { label: "Shop visits", value: "248", note: "+18% this week", icon: TrendUp },
  {
    label: "Active products",
    value: "12",
    note: "3 need photos",
    icon: Package,
  },
  { label: "Orders", value: "08", note: "2 to pack", icon: ShoppingBagOpen },
]

export default function VendorPage() {
  return (
    <div className="mx-auto max-w-[1280px]">
      <section className="relative overflow-hidden rounded-[28px] bg-[#edf5e9] px-6 py-7 sm:px-8 sm:py-9">
        <div className="absolute -top-16 right-10 size-40 rounded-full bg-white/50" />
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Badge
              className="border-0 bg-white/70 text-brand-4"
              variant="outline"
            >
              Your shop is active
            </Badge>
            <h2 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.05em] text-brand sm:text-5xl">
              Make your good finds easy to love.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-6 text-brand-light">
              Add a new piece, keep your shop fresh, and see how your community
              is finding you.
            </p>
          </div>
          <LinkButton
            href="/vendor/products/new"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-2 px-5 text-xs font-bold text-white transition-transform hover:-translate-y-0.5"
            size="lg"
          >
            <Plus size={17} weight="bold" /> Add product
          </LinkButton>
        </div>
      </section>
      <section
        className="mt-7 grid gap-4 sm:grid-cols-3"
        aria-label="Vendor statistics"
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
                Your latest activity
              </p>
              <h2 className="mt-1 text-lg font-bold text-brand">
                Shop checklist
              </h2>
            </div>
            <Badge variant="outline">2 of 4 done</Badge>
          </div>
          <CardContent className="p-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 rounded-2xl bg-brand-yellow-bg px-4 py-3 text-sm font-semibold text-brand-3">
                <CheckCircle size={19} weight="fill" /> Add your first shop
                cover
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-brand-yellow-bg px-4 py-3 text-sm font-semibold text-brand-3">
                <CheckCircle size={19} weight="fill" /> Add your contact details
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-[#e4e9df] px-4 py-3 text-sm font-semibold text-brand-light">
                <span className="size-[19px] rounded-full border border-[#cfd9cd]" />{" "}
                Add three more products
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-[#e4e9df] px-4 py-3 text-sm font-semibold text-brand-light">
                <span className="size-[19px] rounded-full border border-[#cfd9cd]" />{" "}
                Share your shop link
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[24px] border border-[#e4e9df] bg-white shadow-none">
          <CardContent className="p-6">
            <p className="text-[10px] font-bold tracking-[0.14em] text-brand-gray-3 uppercase">
              Helpful next step
            </p>
            <h2 className="mt-1 text-lg font-bold text-brand">
              Fresh listings get noticed.
            </h2>
            <p className="mt-3 text-sm leading-6 text-brand-light">
              Clear photos and a short, honest description help buyers know what
              makes each piece special.
            </p>
            <a
              className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-brand-3 hover:text-brand-orange"
              href="#products"
            >
              Manage products <ArrowRight size={15} />
            </a>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
