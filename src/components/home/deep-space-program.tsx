"use client"

import Link from "next/link"
import { Container } from "@/components/ui"
import { Starfield } from "@/components/starfield"
import { futurePlan } from "@public/index"
import Image from "next/image"

const milestones = [
  { code: "NODE-01", name: "Global logistics network", status: "Planned" },
  { code: "NODE-02", name: "International high-speed transport", status: "Research" },
  { code: "NODE-03", name: "Rocket transport", status: "Concept" },
  { code: "NODE-04", name: "Human transportation", status: "Horizon" },
]

export function DeepSpaceProgram() {
  return (
    <section id="deep-space" className="relative scroll-mt-24 overflow-hidden bg-neutral-900 py-24 text-white md:py-32">
      <Image src={futurePlan} alt="" fill sizes="100vw" className="object-cover opacity-15" />
      <Starfield className="opacity-70" />
      <Container className="relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-caption text-primary-100 font-bold tracking-widest uppercase">Deep space program</p>
          <span className="border-primary-300/40 bg-primary-500/10 text-primary-100 text-caption rounded-full border px-3 py-1.5 font-semibold">Vision — not bookable today</span>
        </div>

        <h2 className="text-h1-m md:text-h1 mt-6 max-w-4xl">
          The future of transportation is <span className="from-primary-100 via-primary-300 to-primary-500 bg-gradient-to-r bg-clip-text text-transparent">faster.</span>
        </h2>
        <p className="text-body-lg-m md:text-body-lg mt-5 max-w-2xl text-white/75">{"We're not just delivering — we're redefining distance. From drones today to rockets tomorrow, Yspace is building Africa's leap into ultra-fast, borderless delivery."}</p>

        <ol className="mt-14 grid gap-8 md:grid-cols-4 md:gap-6">
          {milestones.map((milestone) => (
            <li key={milestone.code} className="hover:border-primary-300/50 flex flex-col gap-2 rounded-3xl border border-white/12 bg-white/5 p-5 transition-colors">
              <span className="text-caption font-semibold tracking-widest text-white/50 uppercase">{milestone.code}</span>
              <p className="text-body font-bold">{milestone.name}</p>
              <p className="text-caption text-primary-100 font-semibold tracking-widest uppercase">Status: {milestone.status}</p>
            </li>
          ))}
        </ol>

        <Link href="/technology" className="bg-action text-on-brand shadow-brand text-button hover:bg-action-hover mt-12 inline-flex h-13 items-center justify-center rounded-full px-8 font-semibold transition-colors">
          Explore our vision
          <span aria-hidden className="ml-2">
            →
          </span>
        </Link>
      </Container>
    </section>
  )
}
