import type { Metadata } from "next"

import { ContactPage } from "@/components/contact/contactPage"

export const metadata: Metadata = {
  title: "Contact — Prevent Plastic",
  description:
    "Say hello to Prevent Plastic. Ask about a find, selling with us, repair and care, or simply share a good idea.",
}

export default function Page() {
  return <ContactPage />
}
