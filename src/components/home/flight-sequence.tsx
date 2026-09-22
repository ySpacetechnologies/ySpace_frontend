"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui"
import { cn } from "@/lib"

const phases = [
  {
    step: "01",
    stage: "Book",
    title: "Book & confirm",
    description: "Tell us what you're sending — pickup, destination, package info. Get an instant estimate and pay in the app.",
    sys: "Created → Confirmed",
  },
  {
    step: "02",
    stage: "Pickup",
    title: "Hand over to Yspace",
    description: "We receive your package at pickup. From that moment, Yspace operates the whole delivery — you never touch the drone.",
    sys: "Preparing → Pickup",
  },
  {
    step: "03",
    stage: "Flight",
    title: "Track it live",
    description: "Watch status, ETA and location update on your tracking page — simple, customer-safe info, refreshed in real time.",
    sys: "In transit → Approaching",
  },
  {
    step: "04",
    stage: "Delivery",
    title: "Delivered to your doorstep",
    description: "The drone lands at the drop zone. Item intact, on time — mission complete, and every delivery is insured.",
    sys: "Delivered",
  },
]

const easeOut = [0.16, 1, 0.3, 1] as const

export function FlightSequence() {
  return (
    <section id="flight-sequence" className="bg-page bg-grid scroll-mt-24 py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-4">
          <p className="text-caption text-content-brand font-bold tracking-widest uppercase">Flight sequence</p>
          <h2 className="text-h2-m md:text-h2 max-w-2xl">From doorstep to doorstep in four phases.</h2>
          <p className="text-body-m text-content-secondary md:text-body max-w-2xl">{"You book and track. Yspace operates everything in between — that's the deal."}</p>
        </div>

        <ol className="relative mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {phases.map((phase, index) => (
            <motion.li key={phase.step} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: index * 0.12, ease: easeOut }} className={cn("border-edge bg-elevated relative flex flex-col gap-3 rounded-3xl border p-6 shadow-sm", index > 0 && "xl:ml-[-14px]")}>
              <div className="flex items-center justify-between">
                <span className="bg-action text-on-brand text-body flex size-11 items-center justify-center rounded-full font-bold">{phase.step}</span>
                <span className="text-caption text-nv-800 font-semibold tracking-wider uppercase">{phase.stage}</span>
              </div>
              <h3 className="text-h4">{phase.title}</h3>
              <p className="text-body-m text-content-secondary flex-1">{phase.description}</p>
              <span className="text-caption text-content-brand bg-primary-50 w-fit rounded-full px-3 py-1 font-bold">{phase.sys}</span>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
