"use client"

import { motion } from "framer-motion"

import { Button, Container } from "@/components/ui"

const easeOut = [0.16, 1, 0.3, 1] as const

export function FinalCta() {
  return (
    <section className="bg-page relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="bg-nebula pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative">
        <div className="flex flex-col items-center gap-7 text-center">
          <motion.h2 initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: easeOut }} className="text-h1-m md:text-h1 max-w-3xl">
            Move what matters, <span className="from-primary-100 via-primary-600 to-primary-800 bg-gradient-to-r bg-clip-text text-transparent">faster.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: 0.1, ease: easeOut }} className="text-body-lg-m text-content-secondary md:text-body-lg max-w-xl">
            Autonomous delivery for everyone. Intelligent routing for business. One network, moving what matters.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: 0.2, ease: easeOut }} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/send-package" size="lg">
              Send a Package
            </Button>
            <Button href="/vendors" variant="outline" size="lg">
              For Businesses
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
