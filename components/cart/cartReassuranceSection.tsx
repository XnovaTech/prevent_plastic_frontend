import {
  ChatCircleDots,
  Leaf,
  Storefront,
} from "@phosphor-icons/react/dist/ssr"

import { cartPageMock } from "@/mock/cartPageMock"

const reassuranceIcons = {
  leaf: Leaf,
  storefront: Storefront,
  chat: ChatCircleDots,
}

export function CartReassuranceSection() {
  return (
    <section className="px-4 pb-16 sm:px-8 sm:pb-20 lg:px-12">
      <div className="mx-auto max-w-[1440px] rounded-[26px] border border-[#e7eae2] bg-[#f1f3eb] p-5 sm:p-7">
        <div className="grid gap-4 md:grid-cols-3" data-aos="fade-up">
          {cartPageMock.reassurance.map((item) => {
            const Icon = reassuranceIcons[item.icon]

            return (
              <div className="flex items-start gap-3" key={item.title}>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[13px] bg-[#e8f0e3] text-[#3c6950]">
                  <Icon aria-hidden="true" size={19} weight="duotone" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold text-[#263d34]">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[10px] leading-5 text-[#7d867f]">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
