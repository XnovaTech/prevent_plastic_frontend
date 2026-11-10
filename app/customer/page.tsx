import { Heart, Package, ShoppingBagOpen } from "@phosphor-icons/react/dist/ssr"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function CustomerPage() {
  return (
    <div className="mx-auto max-w-[1280px]">
      <section className="rounded-[28px] bg-[#f0eef8] px-6 py-8 sm:px-8">
        <Badge className="border-0 bg-white/70 text-brand-4" variant="outline">
          Your saved corner
        </Badge>
        <h2 className="mt-4 max-w-xl font-serif text-4xl leading-[1.02] tracking-[-0.05em] text-brand sm:text-5xl">
          Keep the good finds close.
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-6 text-brand-light">
          Follow your orders, revisit saved pieces, and keep discovering useful
          things.
        </p>
      </section>
      <section
        className="mt-7 grid gap-4 sm:grid-cols-3"
        aria-label="Customer shortcuts"
      >
        {[
          { label: "Orders", note: "Track your finds", icon: Package },
          { label: "Wishlist", note: "Saved for later", icon: Heart },
          {
            label: "Your bag",
            note: "Ready when you are",
            icon: ShoppingBagOpen,
          },
        ].map(({ icon: Icon, label, note }) => (
          <Card
            className="rounded-[22px] border border-[#e4e9df] bg-white shadow-none"
            key={label}
          >
            <CardContent className="p-5">
              <span className="flex size-10 items-center justify-center rounded-full bg-brand-yellow-bg text-brand-3">
                <Icon size={19} weight="fill" />
              </span>
              <p className="mt-5 text-sm font-semibold text-brand">{label}</p>
              <p className="mt-1 text-xs text-brand-gray-3">{note}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}
