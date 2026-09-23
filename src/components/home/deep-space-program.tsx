"use client"

import { motion } from "framer-motion"
import { ArrowRight, Box, Building, Plane, Rocket, User } from "lucide-react"
import Link from "next/link"

import { Container } from "@/components/ui"
import { Starfield } from "@/components/starfield"

const easeOut = [0.16, 1, 0.3, 1] as const

const journey = [
  { icon: Building, label: "China", sub: "Origin" },
  { icon: Box, label: "Yspace International Hub", sub: "Consolidation" },
  { icon: Rocket, label: "High-Speed Transportation", sub: "Global leg" },
  { icon: Building, label: "Yspace Local Hub", sub: "Nigeria" },
  { icon: Plane, label: "Autonomous Delivery", sub: "Drone network" },
  { icon: User, label: "Customer", sub: "Doorstep" },
]

export function DeepSpaceProgram() {
  return (
    <section id="deep-space" className="relative scroll-mt-24 overflow-hidden bg-neutral-900 py-24 text-white md:py-32">
      {/* Live drone footage backdrop */}
      <video src="/drone.mp4" autoPlay muted loop playsInline aria-hidden className="pointer-events-none absolute inset-0 size-full object-cover opacity-25" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900/60 to-neutral-900" />
      <Starfield className="opacity-70" />

      <Container className="relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-caption text-primary-100 font-bold tracking-widest uppercase">The future of transportation</p>
          <span className="border-primary-300/40 bg-primary-500/10 text-primary-100 text-caption rounded-full border px-3 py-1.5 font-semibold">Vision — not bookable today</span>
        </div>

        <h2 className="text-h1-m md:text-h1 mt-6 max-w-4xl">
          The future of transportation is <span className="from-primary-100 via-primary-300 to-primary-500 bg-gradient-to-r bg-clip-text text-transparent">faster.</span>
        </h2>
        <p className="text-body-lg-m md:text-body-lg mt-5 max-w-2xl text-white/75">Today, we move packages across cities. Tomorrow, we intend to connect the world — combining intelligent logistics, autonomous delivery and next-generation transportation.</p>

        {/* The intended journey: China → International Hub → High-Speed Transport → Nigeria → Local Hub → Drone → Customer */}
        <div className="mt-16">
          <div className="border-primary-300/30 absolute top-8 right-8 left-8 hidden h-px lg:absolute lg:block" aria-hidden />
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {journey.map((node, index) => (
              <motion.li key={node.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: index * 0.1, ease: easeOut }} className="relative flex flex-col items-start gap-3 lg:items-center lg:text-center">
                <span className="border-primary-300/40 text-primary-100 shadow-brand relative z-10 flex size-16 items-center justify-center rounded-2xl border bg-neutral-900">
                  <node.icon className="size-6" aria-hidden />
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-caption-m font-bold tracking-widest text-white/50 uppercase">{`0${index + 1} · ${node.sub}`}</span>
                  <span className="text-body-m lg:text-body font-bold">{node.label}</span>
                </div>
                {index < journey.length - 1 && <ArrowRight aria-hidden className="text-primary-300/60 hidden size-4 lg:absolute lg:top-6 lg:-right-5 lg:block" />}
              </motion.li>
            ))}
          </ol>
        </div>

        <Link href="/technology" className="bg-action text-on-brand shadow-brand text-button hover:bg-action-hover mt-14 inline-flex h-13 items-center justify-center rounded-full px-8 font-semibold transition-colors">
          Explore Our Vision
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </Container>
    </section>
  )
}
