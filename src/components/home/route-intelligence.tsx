"use client"

import { motion } from "framer-motion"
import { ArrowRight, CalendarClock, GitBranch, Plug, Route, ShieldCheck, TrafficCone } from "lucide-react"

import { Button, Container } from "@/components/ui"

const easeOut = [0.16, 1, 0.3, 1] as const

const pipeline = [
  { label: "Your logistics system", sub: "Keep your fleet & dispatch" },
  { label: "Yspace intelligence", sub: "Routing · ETA · optimization", accent: true },
  { label: "Better route", sub: "Recommended, explained" },
  { label: "Your driver", sub: "Same operation, smarter" },
]

const capabilities = [
  { icon: Route, label: "Route optimization" },
  { icon: TrafficCone, label: "Traffic-aware routing" },
  { icon: CalendarClock, label: "ETA prediction" },
  { icon: GitBranch, label: "Alternative routes" },
  { icon: ShieldCheck, label: "Route reliability" },
  { icon: Plug, label: "API / SDK integration" },
]

export function RouteIntelligence() {
  return (
    <section id="route-intelligence" className="bg-page scroll-mt-24 py-20 md:py-28">
      <Container>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: easeOut }} className="flex flex-col items-start gap-4">
          <p className="text-caption text-content-brand font-bold tracking-widest uppercase">For businesses — autonomous route intelligence</p>
          <h2 className="text-h2-m md:text-h2 max-w-2xl">Make your logistics system smarter.</h2>
          <p className="text-body-m text-content-secondary md:text-body max-w-2xl">You don&apos;t replace your fleet, dispatch or delivery systems. Yspace plugs into them and makes every route smarter.</p>
        </motion.div>

        {/* The pipeline: Your System → Yspace Intelligence → Better Route → Your Driver */}
        <div className="mt-14 grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
          {pipeline.map((node, index) => (
            <motion.div key={node.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: index * 0.12, ease: easeOut }} className="contents">
              <div className={node.accent ? "shadow-brand from-primary-600 to-primary-800 relative flex flex-col justify-center gap-1.5 rounded-3xl bg-gradient-to-br p-6 text-white md:p-7" : "border-edge bg-elevated flex flex-col justify-center gap-1.5 rounded-3xl border p-6 md:p-7"}>
                <span className={node.accent ? "text-caption-m font-bold tracking-widest text-white/70 uppercase" : "text-caption-m text-content-tertiary font-bold tracking-widest uppercase"}>{`0${index + 1}`}</span>
                <p className={node.accent ? "text-body font-bold" : "text-body font-bold"}>{node.label}</p>
                <p className={node.accent ? "text-caption-m text-white/80" : "text-caption-m text-content-secondary"}>{node.sub}</p>
              </div>
              {index < pipeline.length - 1 && (
                <div aria-hidden className="text-content-brand hidden items-center lg:flex">
                  <ArrowRight className="size-5" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Capability highlights */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {capabilities.map((capability, index) => (
            <motion.div key={capability.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: index * 0.06, ease: easeOut }} className="border-edge-subtle bg-elevated hover:border-edge-brand flex flex-col items-center gap-3 rounded-2xl border px-3 py-5 text-center transition-colors">
              <span className="bg-primary-50 text-primary-700 flex size-10 items-center justify-center rounded-xl">
                <capability.icon className="size-5" aria-hidden />
              </span>
              <span className="text-caption-m font-semibold">{capability.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="/vendors" size="lg">
            Explore Enterprise
            <ArrowRight className="size-4" aria-hidden />
          </Button>
          <p className="text-caption text-content-secondary">Yspace makes an existing logistics system smarter — rather than replacing it.</p>
        </motion.div>
      </Container>
    </section>
  )
}
