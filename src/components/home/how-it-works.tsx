"use client"

import { motion } from "framer-motion"
import { ArrowRight, Cpu, Plug, Route } from "lucide-react"

import { Button, Container } from "@/components/ui"

const easeOut = [0.16, 1, 0.3, 1] as const

const steps = [
  {
    step: "01",
    icon: Plug,
    title: "Connect",
    description: "Connect your logistics system to Yspace.",
  },
  {
    step: "02",
    icon: Cpu,
    title: "Analyze",
    description: "Yspace analyzes roads, traffic, vehicles, constraints and other relevant information.",
  },
  {
    step: "03",
    icon: Route,
    title: "Optimize",
    description: "Yspace returns the recommended route, ETA, alternatives and warnings.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-surface border-edge scroll-mt-24 border-y py-20 md:py-28">
      <Container>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: easeOut }} className="flex flex-col items-start gap-4">
          <p className="text-caption text-content-brand font-bold tracking-widest uppercase">How Yspace works</p>
          <h2 className="text-h2-m md:text-h2 max-w-2xl">Three steps. Zero disruption.</h2>
        </motion.div>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((item, index) => (
            <motion.li key={item.step} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: index * 0.14, ease: easeOut }} className="border-edge bg-elevated relative flex flex-col gap-5 rounded-3xl border p-8 shadow-sm">
              {index < steps.length - 1 && <span aria-hidden className="bg-primary-300/60 absolute top-14 -right-4 hidden size-3 rounded-full md:block" />}
              <div className="flex items-center justify-between">
                <span className="bg-action text-on-brand shadow-brand flex size-12 items-center justify-center rounded-2xl">
                  <item.icon className="size-5.5" aria-hidden />
                </span>
                <span className="text-h3 text-content-tertiary font-bold">{item.step}</span>
              </div>
              <h3 className="text-h3-m md:text-h3">{item.title}</h3>
              <p className="text-body-m text-content-secondary md:text-body">{item.description}</p>
            </motion.li>
          ))}
        </ol>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.25 }} className="mt-12 flex justify-center">
          <Button href="/vendors" variant="outline" size="lg">
            Explore Enterprise
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </motion.div>
      </Container>
    </section>
  )
}
