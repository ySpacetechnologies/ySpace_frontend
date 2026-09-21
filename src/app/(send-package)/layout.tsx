import type { ReactNode } from "react"

import { SiteHeader } from "@/components/site-header"

export default function SendPackageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader variant="checkout" />
      <main className="flex-1">{children}</main>
    </>
  )
}
