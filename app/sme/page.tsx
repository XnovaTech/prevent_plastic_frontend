import type { Metadata } from "next"

import { CatalogPage } from "@/components/list/catalogPage"
import { catalogPageMock } from "@/mock/catalogPageMock"

export const metadata: Metadata = {
  title: "SME finds — Prevent Plastic",
  description:
    "Browse good finds from local small businesses and makers giving useful things another chapter.",
}

export default function Page() {
  return <CatalogPage config={catalogPageMock.sme} />
}
