"use client"

import { motion } from "framer-motion"
import { ChevronDown, Rocket } from "lucide-react"
import Link from "next/link"

import { Button, Container } from "@/components/ui"
import { Starfield } from "@/components/starfield"

const easeOut = [0.16, 1, 0.3, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: easeOut },
  }),
}

const readouts = [
  { label: "Live tracking", dot: "bg-secondary-200" },
  { label: "Insured cargo", dot: "bg-primary-300" },
  { label: "City-wide coverage", dot: "bg-white/70" },
]

/** Drone mark riding an orbit ring around the ySpace "planet". */
function OrbitScene() {
  return (
    <motion.div aria-hidden className="relative mx-auto aspect-square w-full max-w-[520px]" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.35, ease: easeOut }}>
      {/* Planet core */}
      <div className="absolute top-1/2 left-1/2 size-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_32%_28%,#e4b0ff_0%,#9900e8_42%,#47006b_100%)] shadow-[0_0_90px_18px_rgba(153,0,232,0.4)]" />
      <div className="border-primary-300/25 absolute top-1/2 left-1/2 size-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border" />

      {/* Orbit rings */}
      <div className="absolute top-1/2 left-1/2 size-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12" />
      <div className="absolute top-1/2 left-1/2 size-full -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/15" />

      {/* Drone satellite on the inner ring */}
      <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}>
        <div className="absolute top-[16%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-elevated shadow-brand flex size-12 items-center justify-center rounded-2xl border border-white/15">
            <Rocket className="text-primary-600 size-5" />
          </div>
          <span className="bg-primary-300/60 absolute inset-0 -z-10 rounded-2xl blur-md" />
        </div>
      </motion.div>

      {/* Teal relay satellite on the outer ring, counter-rotating */}
      <motion.div className="absolute inset-0" animate={{ rotate: -360 }} transition={{ duration: 34, repeat: Infinity, ease: "linear" }}>
        <span className="bg-secondary-200 shadow-secondary-200/40 absolute top-1/2 right-[3%] size-3 -translate-y-1/2 rounded-full shadow-[0_0_16px_6px]" />
      </motion.div>

      {/* Corridor waypoint blips */}
      <span className="bg-secondary-200 animate-pulse-soft absolute top-[30%] left-[12%] size-2 rounded-full" />
      <span className="bg-primary-300 animate-pulse-soft absolute top-[68%] right-[14%] size-2 rounded-full [animation-delay:0.8s]" />
      <span className="animate-pulse-soft absolute bottom-[16%] left-[38%] size-1.5 rounded-full bg-white/80 [animation-delay:1.6s]" />

      {/* Floating status chips — customer-safe delivery info */}
      <motion.div className="absolute top-[6%] right-[2%] rounded-2xl border border-white/12 bg-white/8 px-4 py-2.5 backdrop-blur-sm" animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <p className="text-caption text-white/60">ETA</p>
        <p className="text-body font-bold">04:32 min</p>
      </motion.div>
      <motion.div className="absolute bottom-[8%] left-[0%] rounded-2xl border border-white/12 bg-white/8 px-4 py-2.5 backdrop-blur-sm" animate={{ y: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
        <p className="text-caption flex items-center gap-2 text-white/60">
          <span className="bg-secondary-200 size-1.5 rounded-full" /> Delivery
        </p>
        <p className="text-body font-bold">In transit</p>
      </motion.div>
    </motion.div>
  )
}

export function MissionBriefing() {
  return (
    <section id="hero" className="relative flex min-h-svh scroll-mt-24 flex-col overflow-hidden bg-neutral-900 text-white">
      {/* Deep-space backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(92,0,140,0.5),transparent_70%)]" />
      <Starfield />

      <Container className="relative flex flex-1 items-center pt-40 pb-24 md:pt-48 lg:pt-36">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col items-start gap-7">
            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0} className="text-caption inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-semibold">
              <span className="bg-secondary-200 animate-pulse-soft size-1.5 rounded-full" />
              Autonomous drone logistics — available today
            </motion.p>

            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="text-h1-m md:text-h1 max-w-xl">
              Move what matters, <span className="from-primary-100 via-primary-300 to-primary-500 bg-gradient-to-r bg-clip-text text-transparent">faster.</span>
            </motion.h1>

            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="text-body-lg-m md:text-body-lg max-w-lg text-white/75">
              Drone delivery for people. Route intelligence for business. Yspace operates its own fleet — and makes every route smarter.
            </motion.p>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button href="/send-package" size="lg">
                Send a Package
              </Button>
              <Button href="/vendors" size="lg" className="border-white/25 bg-transparent text-white hover:bg-white/10">
                For Businesses
              </Button>
            </motion.div>

            <motion.ul variants={fadeUp} initial="hidden" animate="visible" custom={0.4} className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2">
              {readouts.map((readout) => (
                <li key={readout.label} className="text-caption flex items-center gap-2 text-white/60">
                  <span className={`size-1.5 rounded-full ${readout.dot}`} />
                  {readout.label}
                </li>
              ))}
            </motion.ul>
          </div>

          <OrbitScene />
        </div>
      </Container>

      {/* Scroll cue */}
      <motion.div aria-hidden className="relative flex justify-center pb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
        <Link href="/#missions" className="text-caption flex flex-col items-center gap-1 font-semibold text-white/50 transition-colors hover:text-white/80">
          Scroll to explore
          <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="size-4" />
          </motion.span>
        </Link>
      </motion.div>
    </section>
  )
}
