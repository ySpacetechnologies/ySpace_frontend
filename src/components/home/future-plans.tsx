import Image from "next/image"
import Link from "next/link"

import { Container } from "@/components/ui"
import { futurePlan } from "@public/index"

const verticalGuides = [
  { left: "8.33%", dim: false },
  { left: "16.67%", dim: false },
  { left: "25%", dim: false },
  { left: "33.33%", dim: true },
  { left: "41.67%", dim: true },
  { left: "50%", dim: true },
  { left: "58.33%", dim: true },
  { left: "66.67%", dim: true },
  { left: "75%", dim: false },
  { left: "83.33%", dim: false },
  { left: "91.67%", dim: false },
]

const horizontalGuideTops = ["21.6%", "43.3%", "64.9%"]

export function FuturePlans() {
  return (
    <section id="future-plans" className="relative flex scroll-mt-20 items-center overflow-hidden lg:min-h-267.5">
      <Image src={futurePlan} alt="" fill sizes="100vw" className="object-cover" />
      <div aria-hidden className="absolute inset-0 bg-black/45" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-360 -translate-x-1/2 lg:block">
        {verticalGuides.map((guide) => (
          <span key={guide.left} style={{ left: guide.left }} className={guide.dim ? "absolute inset-y-0 w-px bg-white/5" : "absolute inset-y-0 w-px bg-white/15"} />
        ))}
        {horizontalGuideTops.map((top) => (
          <div key={top} style={{ top }} className="absolute inset-x-0 flex justify-between">
            <span className="h-px w-[34%] bg-white/15" />
            <span className="h-px w-[34%] bg-white/15" />
          </div>
        ))}
      </div>
      <Container className="relative flex justify-center py-24 lg:py-44">
        <div className="flex max-w-239.5 flex-col items-center">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-h1-m text-nv-50 md:text-h1 font-bold text-balance">Our Future Plans</h2>
            <p className="text-h3-m text-nv-300 md:text-6 font-medium text-pretty md:leading-8 md:tracking-[-0.002em]">We&rsquo;re not just delivering — we&rsquo;re redefining distance. From drones today to rockets tomorrow, Yspace is building Africa&rsquo;s leap into ultra-fast, borderless delivery.</p>
          </div>
          <Link href="/technology" className="bg-action hover:bg-action-hover text-body-lg-m text-primary-50 md:text-body-lg mt-14 flex h-16 items-center justify-center rounded-sm px-6 font-medium transition-colors active:opacity-85">
            Learn More
          </Link>
        </div>
      </Container>
    </section>
  )
}
