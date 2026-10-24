import { Geist_Mono, IBM_Plex_Sans } from "next/font/google"

import "./globals.css"
import { SiteBackdrop } from "@/components/shared/siteBackdrop"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        ibmPlexSans.variable
      )}
    >
      <body>
        <ThemeProvider>
          <SiteBackdrop />
          <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
