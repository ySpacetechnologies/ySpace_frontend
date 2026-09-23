"use client"

import { motion } from "framer-motion"
import { Bike, Car, ShoppingCart, Store, Truck, Van, Warehouse } from "lucide-react"

import { Container } from "@/components/ui"

const easeOut = [0.16, 1, 0.3, 1] as const

const industries = ["Logistics", "E-commerce", "Marketplaces", "Retail", "Delivery", "Transportation"]

const vehicles = [
  { icon: Bike, label: "Motorcycles" },
  { icon: Car, label: "Cars" },
  { icon: Van, label: "Vans" },
  { icon: Truck, label: "Trucks" },
]

export function BuiltForLogistics() {
  return (
    <section id="built-for" className="bg-page scroll-mt-24 py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: easeOut }} className="flex flex-col items-start gap-5">
            <p className="text-caption text-content-brand font-bold tracking-widest uppercase">Built for modern logistics</p>
            <h2 className="text-h2-m md:text-h2 max-w-lg">Your infrastructure stays. The intelligence arrives.</h2>
            <p className="text-body-m text-content-secondary md:text-body max-w-lg">Yspace provides routing intelligence without requiring you to replace your existing infrastructure.</p>

            <div className="mt-2 flex flex-wrap gap-2.5">
              {industries.map((industry, index) => (
                <motion.span key={industry} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.1 + index * 0.05, ease: easeOut }} className="border-edge bg-elevated text-body-m text-content hover:border-edge-brand rounded-full border px-4 py-2 font-semibold transition-colors">
                  {industry}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.1, ease: easeOut }} className="border-edge bg-elevated flex flex-col gap-6 rounded-3xl border p-8 shadow-lg md:p-10">
            <div className="flex items-center gap-3">
              <span className="bg-primary-50 text-primary-700 flex size-11 items-center justify-center rounded-2xl">
                <Warehouse className="size-5" aria-hidden />
              </span>
              <p className="text-h4">Every vehicle in your fleet</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {vehicles.map((vehicle) => (
                <div key={vehicle.label} className="border-edge-subtle bg-nv-50 hover:border-edge-brand flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-colors">
                  <vehicle.icon className="text-primary-700 size-5 shrink-0" aria-hidden />
                  <span className="text-body-m font-semibold">{vehicle.label}</span>
                </div>
              ))}
            </div>

            <div className="border-edge-subtle bg-primary-50/60 flex items-center gap-3 rounded-2xl border px-4 py-3.5">
              <Store className="text-primary-700 size-5 shrink-0" aria-hidden />
              <p className="text-caption text-content-secondary">
                Marketplaces &amp; e-commerce storefronts ride the same network — <ShoppingCart className="inline size-3.5" aria-hidden /> the logistics layer is ours, the storefront is yours.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
