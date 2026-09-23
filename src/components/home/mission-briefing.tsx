"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

import { DroneStage } from "@/components/drone-stage"
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

/** Real 3D drone on a soft orbit backdrop, with floating customer-safe status chips. */
function HeroScene() {
  return (
    <motion.div className="relative mx-auto w-full max-w-[560px]" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.35, ease: easeOut }}>
      {/* Orbit rings drawn behind the 3D drone for depth */}
      <div aria-hidden className="absolute inset-0">
        <div className="border-primary-300/20 absolute top-1/2 left-1/2 size-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border" />
        <div className="absolute top-1/2 left-1/2 size-full -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/15" />
        <span className="bg-secondary-200 animate-pulse-soft absolute top-[24%] left-[10%] size-2 rounded-full" />
        <span className="bg-primary-300 animate-pulse-soft absolute top-[74%] right-[10%] size-2 rounded-full [animation-delay:0.8s]" />
      </div>

      <DroneStage />

      {/* Floating status chips — customer-safe delivery info */}
      <motion.div className="absolute top-[10%] right-[2%] rounded-2xl border border-white/12 bg-white/8 px-4 py-2.5 backdrop-blur-sm" animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <p className="text-caption text-white/60">ETA</p>
        <p className="text-body font-bold">04:32 min</p>
      </motion.div>
      <motion.div className="absolute bottom-[12%] left-[0%] rounded-2xl border border-white/12 bg-white/8 px-4 py-2.5 backdrop-blur-sm" animate={{ y: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
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
              Yspace combines autonomous delivery with intelligent logistics technology to make transportation faster and more efficient.
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

          <HeroScene />
        </div>
      </Container>

      {/* Scroll cue */}
      <motion.div aria-hidden className="relative flex justify-center pb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}>
        <Link href="/#what-yspace-does" className="text-caption flex flex-col items-center gap-1 font-semibold text-white/50 transition-colors hover:text-white/80">
          Scroll to explore
          <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="size-4" />
          </motion.span>
        </Link>
      </motion.div>
    </section>
  )
}
