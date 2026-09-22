"use client"

import { motion } from "framer-motion"
import { ArrowRight, Package, Route, Store } from "lucide-react"
import Link from "next/link"

import { Container } from "@/components/ui"

const missions = [
  {
    id: "MSN-001",
    icon: Package,
    title: "Drone delivery",
    status: "Available today",
    description: "Send a package across the city — booked in minutes, tracked live, delivered to your doorstep by an autonomous drone.",
    href: "/send-package",
    cta: "Send a package",
  },
  {
    id: "MSN-002",
    icon: Route,
    title: "Route intelligence",
    status: "Available today",
    description: "For businesses with their own fleets: routing, ETAs and alternatives through one API. Your vehicles, our intelligence.",
    href: "/vendors",
    cta: "Explore for business",
  },
  {
    id: "MSN-003",
    icon: Store,
    title: "Marketplace",
    status: "Scaling",
    description: "Shop local vendors and get your order flown in. The storefront is theirs — the logistics layer is ours.",
    href: "/marketplace",
    cta: "Enter marketplace",
  },
]

const easeOut = [0.16, 1, 0.3, 1] as const

export function MissionsLog() {
  return (
    <section id="missions" className="bg-page scroll-mt-24 py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-4">
          <p className="text-caption text-content-brand font-bold tracking-widest uppercase">Missions</p>
          <h2 className="text-h2-m md:text-h2 max-w-2xl">Three missions. One network.</h2>
          <p className="text-body-m text-content-secondary md:text-body max-w-2xl">Two ways to move with Yspace today — and the marketplace that plugs local stores into the same fleet.</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {missions.map((mission, index) => (
            <motion.article key={mission.id} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: index * 0.12, ease: easeOut }} className="border-edge bg-elevated group relative flex flex-col rounded-3xl border p-7 shadow-sm transition-shadow hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="bg-primary-50 text-primary-700 flex size-12 items-center justify-center rounded-2xl">
                  <mission.icon className="size-6" aria-hidden />
                </span>
                <span className="text-caption text-nv-800 font-semibold">{mission.id}</span>
              </div>

              <span className="text-caption text-success-100 bg-success-50 mt-6 w-fit rounded-full px-3 py-1 font-bold">{mission.status}</span>
              <h3 className="text-h3-m md:text-h3 mt-3">{mission.title}</h3>
              <p className="text-body-m text-content-secondary md:text-body mt-3 flex-1">{mission.description}</p>

              <Link href={mission.href} className="text-caption text-content-brand hover:text-primary-800 mt-6 inline-flex items-center gap-2 font-bold tracking-wider uppercase transition-colors">
                {mission.cta}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
              </Link>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  )
}
