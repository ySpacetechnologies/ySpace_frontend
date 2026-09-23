"use client"

import { motion } from "framer-motion"
import { ArrowRight, MapPin, Package } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button, Container } from "@/components/ui"

const easeOut = [0.16, 1, 0.3, 1] as const

const fields = [
  { icon: MapPin, label: "From", value: "Drop-off location", hint: "Pickup point" },
  { icon: MapPin, label: "To", value: "Destination", hint: "Drop-off point" },
  { icon: Package, label: "Package", value: "Weight / dimensions", hint: "≤ 5 kg" },
]

export function SendPackageSection() {
  const router = useRouter()

  return (
    <section id="send-package" className="bg-surface border-edge scroll-mt-24 border-y py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: easeOut }} className="flex flex-col items-start gap-4">
            <p className="text-caption text-content-brand font-bold tracking-widest uppercase">Send a package</p>
            <h2 className="text-h2-m md:text-h2 max-w-xl">From your hands to their doorstep.</h2>
            <p className="text-body-m text-content-secondary md:text-body max-w-lg">Tell us what you&apos;re sending — we&apos;ll handle serviceability, delivery estimate, payment and confirmation. The whole flow takes minutes.</p>
            <ul className="text-caption text-content-secondary mt-3 flex flex-col gap-2.5">
              {["Instant delivery estimate", "Live tracking from pickup to drop", "Every delivery insured"].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="bg-secondary-200 size-1.5 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Booking mock — the first step of the real booking flow */}
          <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.15, ease: easeOut }} className="border-edge bg-elevated relative rounded-3xl border p-6 shadow-lg md:p-8">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                router.push("/send-package")
              }}
              className="flex flex-col gap-4"
            >
              {fields.map((field, index) => (
                <motion.label key={field.label} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 + index * 0.1, ease: easeOut }} className="border-edge-subtle bg-nv-50 hover:border-edge-brand focus-within:border-edge-brand flex cursor-text items-center gap-4 rounded-2xl border px-4 py-3.5 transition-colors">
                  <span className="bg-primary-50 text-primary-700 flex size-10 shrink-0 items-center justify-center rounded-xl">
                    <field.icon className="size-4.5" aria-hidden />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-caption text-content-secondary font-semibold">{field.label}</span>
                    <span className="text-body text-content-tertiary">{field.value}</span>
                  </span>
                  <span className="text-caption-m text-nv-700 ml-auto shrink-0">{field.hint}</span>
                </motion.label>
              ))}

              <Button type="submit" size="lg" className="mt-2 w-full">
                Get Delivery Estimate
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </form>

            <p className="text-caption-m text-content-tertiary mt-4 text-center">Estimate in seconds — no account needed.</p>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
