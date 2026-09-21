import type { ReactNode } from "react"

import { SiteFooter, SiteHeader } from "@/components"

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div id="top" className="flex min-h-screen flex-col">
      <SiteHeader variant="market" />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
