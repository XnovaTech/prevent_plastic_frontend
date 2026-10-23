import type { Metadata } from "next"

import { CatalogPage } from "@/components/list/catalogPage"
import { catalogPageMock } from "@/mock/catalogPageMock"

export const metadata: Metadata = {
  title: "Individual finds — Prevent Plastic",
  description:
    "Browse good things passed on by individual sellers nearby, from one home to another.",
}

export default function Page() {
  return <CatalogPage config={catalogPageMock.individual} />
}
