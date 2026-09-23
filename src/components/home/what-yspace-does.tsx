"use client"

import { motion } from "framer-motion"
import { ArrowRight, Building2, Package } from "lucide-react"
import Link from "next/link"

import { Container } from "@/components/ui"

const easeOut = [0.16, 1, 0.3, 1] as const

const products = [
  {
    icon: Package,
    kicker: "For Everyone",
    title: "Drone Delivery",
    description: "Send packages through Yspace's autonomous delivery network — booked in minutes, tracked live, flown to the doorstep.",
    href: "/send-package",
    cta: "Send a Package",
    accent: true,
  },
  {
    icon: Building2,
    kicker: "For Businesses",
    title: "Autonomous Route Intelligence",
    description: "Make existing logistics systems smarter with Yspace's routing, ETA and logistics intelligence — no fleet replacement required.",
    href: "/vendors",
    cta: "For Businesses",
  },
]

export function WhatYspaceDoes() {
  return (
    <section id="what-yspace-does" className="bg-page scroll-mt-24 py-20 md:py-28">
      <Container>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: easeOut }} className="flex flex-col items-start gap-4">
          <p className="text-caption text-content-brand font-bold tracking-widest uppercase">What Yspace does</p>
          <h2 className="text-h2-m md:text-h2 max-w-3xl">Two products. One smarter transportation network.</h2>
          <p className="text-body-m text-content-secondary md:text-body max-w-2xl">Yspace doesn&apos;t just move packages — it makes transportation smarter.</p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {products.map((product, index) => (
            <motion.article key={product.title} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: index * 0.12, ease: easeOut }} className={product.accent ? "border-edge-brand from-primary-50 via-elevated to-elevated shadow-brand relative flex flex-col overflow-hidden rounded-3xl border-2 bg-gradient-to-br p-8 md:p-10" : "border-edge bg-elevated flex flex-col rounded-3xl border p-8 shadow-sm md:p-10"}>
              <div className="flex items-center justify-between">
                <span className={product.accent ? "bg-action text-on-brand flex size-12 items-center justify-center rounded-2xl" : "bg-primary-50 text-primary-700 flex size-12 items-center justify-center rounded-2xl"}>
                  <product.icon className="size-6" aria-hidden />
                </span>
                <span className={product.accent ? "text-caption text-primary-700 bg-primary-50 w-fit rounded-full px-3 py-1 font-bold" : "text-caption text-content-secondary bg-nv-400 w-fit rounded-full px-3 py-1 font-bold"}>{product.kicker}</span>
              </div>

              <h3 className="text-h3-m md:text-h3 mt-7">{product.title}</h3>
              <p className="text-body-m text-content-secondary md:text-body mt-3 flex-1">{product.description}</p>

              <Link href={product.href} className="text-caption text-content-brand hover:text-primary-800 mt-8 inline-flex items-center gap-2 font-bold tracking-wider uppercase transition-colors">
                {product.cta}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="text-body-lg-m text-content-tertiary md:text-body-lg mx-auto mt-14 max-w-3xl text-center">
          <span className="text-content font-semibold">Yspace operates transportation for its delivery product</span> — while businesses keep their own logistics operations and use Yspace as the intelligence layer.
        </motion.p>
      </Container>
    </section>
  )
}
