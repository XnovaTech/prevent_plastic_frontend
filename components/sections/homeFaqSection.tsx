import { AboutFaqSection } from "@/components/sections/aboutFaqSection"
import { contactPageMock } from "@/mock/contactPageMock"

const homeFaqIntro = {
  eyebrow: "FREQUENTLY ASKED QUESTIONS",
  title: "See the answers",
  description:
    "Find the questions people ask most, with their answers gathered together in one place.",
} as const

export function HomeFaqSection() {
  return <AboutFaqSection faqs={contactPageMock.faqs} intro={homeFaqIntro} />
}
