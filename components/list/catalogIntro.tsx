import type { CatalogPageConfig } from "@/mock/catalogPageMock"

type CatalogIntroProps = {
  config: CatalogPageConfig
}

export function CatalogIntro({ config }: CatalogIntroProps) {
  return (
    <section className="bg-transparent px-4 pt-4 pb-2 sm:px-8 sm:pt-6 lg:px-12">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[28px] border border-white/70 bg-[#eef2e8]/75 px-5 py-8 backdrop-blur-2xl sm:rounded-[32px] sm:px-8 sm:py-10 lg:px-12">
        <div
          className="relative grid gap-7 md:grid-cols-[1fr_auto] md:items-end"
          data-aos="fade-up"
        >
          <div className="max-w-[760px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#31594a]/15 bg-white/45 px-3 py-1.5 text-[9px] font-bold tracking-[0.15em] text-[#496b57] uppercase sm:text-[10px]">
              <span className="size-1.5 rounded-full bg-[#df896b]" />
              {config.eyebrow}
            </span>
            <h1 className="mt-4 font-serif text-[38px] leading-[1.02] tracking-[-0.055em] text-[#203c33] sm:text-[48px] lg:text-[54px]">
              {config.title}
              <br />
              <span className="relative inline-block text-[#39745b] italic">
                {config.highlight}
                <span className="absolute right-0 -bottom-1 h-1.5 w-[94%] -rotate-2 rounded-[50%] border-b-2 border-[#e9a27e]" />
              </span>
            </h1>
            <p className="mt-4 max-w-[560px] text-[12px] leading-6 text-[#617067] sm:text-[13px]">
              {config.description}
            </p>
            <p className="mt-4 flex items-start gap-2 text-[10px] leading-5 text-[#7d867f]">
              <span
                aria-hidden="true"
                className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#df896b]"
              />
              {config.note}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:flex md:grid md:grid-cols-1">
            {config.stats.map((stat) => (
              <div
                className="min-w-[130px] rounded-[18px] border border-white/60 bg-white/55 px-4 py-3"
                key={stat.label}
              >
                <p className="font-serif text-[24px] leading-none tracking-[-0.04em] text-[#245b4d]">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[10px] text-[#6f7c73]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
