import type { ReactNode } from "react"

import { Sparkle } from "./sparkle"

export function OrbitHighlight({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block px-2 py-3">
      <span aria-hidden className="pointer-events-none absolute inset-0 border-[1.5px] border-white/15" />
      <Sparkle className="text-success-100 absolute -top-1 -left-1" />
      <Sparkle className="text-success-100 absolute -top-1 -right-1" />
      <Sparkle className="text-success-100 absolute -bottom-1 -left-1" />
      <Sparkle className="text-success-100 absolute -right-1 -bottom-1" />
      <span className="relative">{children}</span>
    </span>
  )
}
