import type { Metadata } from "next"

import { HomePage } from "@/components/home/homePage"

export const metadata: Metadata = {
  title: "Prevent Plastic — Pre-loved, well loved",
  description:
    "Find thoughtful secondhand goods, discover local makers, and give good things a second life.",
}

export default function Page() {
  return <HomePage />
}
