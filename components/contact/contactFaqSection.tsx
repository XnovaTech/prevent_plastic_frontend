import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { contactPageMock } from "@/mock/contactPageMock"

export function ContactFaqSection() {
  return (
    <section className="py-16 sm:py-20" id="faq">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-12">
          <div data-aos="fade-up">
            <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-brand-gray-5 uppercase">
              A FEW QUICK ANSWERS
            </p>
            <h2 className="font-serif text-[32px] leading-tight tracking-[-0.04em] text-brand sm:text-[40px]">
              Before you write
            </h2>
            <p className="mt-3 max-w-sm text-[13px] leading-6 text-[#748078]">
              The things people ask us most, gathered in one calm little place.
            </p>
          </div>

          <Accordion
            allowsMultipleExpanded
            className="gap-0 rounded-[22px] border-[#e7eae2] bg-white/70"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {contactPageMock.faqs.map((faq) => (
              <AccordionItem id={faq.id} key={faq.id}>
                <AccordionTrigger className="px-5 py-5 text-left text-[13px] font-semibold text-brand-6 hover:no-underline sm:text-sm">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5 text-[12px] leading-6 text-[#748078]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
