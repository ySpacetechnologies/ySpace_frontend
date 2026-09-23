"use client"

import { motion } from "framer-motion"

import { Container } from "@/components/ui"

const easeOut = [0.16, 1, 0.3, 1] as const

/** Stylized city map: recommended route (solid purple) vs alternative (dashed). */
function RouteMap() {
  return (
    <div className="border-edge bg-elevated relative overflow-hidden rounded-3xl border shadow-lg">
      <svg aria-hidden viewBox="0 0 560 380" className="h-auto w-full">
        {/* City blocks backdrop */}
        <rect width="560" height="380" fill="#f4f5f7" />
        {[70, 150, 230, 310].map((y) => (
          <rect key={y} x="0" y={y} width="560" height="8" fill="#e6e8eb" />
        ))}
        {[90, 210, 330, 450].map((x) => (
          <rect key={x} x={x} y="0" width="8" height="380" fill="#e6e8eb" />
        ))}
        {[
          [20, 20, 60, 40],
          [110, 96, 90, 46],
          [310, 20, 120, 40],
          [360, 96, 80, 46],
          [40, 250, 100, 50],
          [230, 250, 90, 50],
          [460, 250, 80, 50],
        ].map(([x, y, w, h]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="6" fill="#dfe2e6" />
        ))}

        {/* Alternative route — dashed, longer, slower */}
        <path d="M 62 330 C 150 330, 150 210, 210 210 C 300 210, 260 110, 350 96 C 430 84, 460 70, 506 62" fill="none" stroke="#a2a4a7" strokeWidth="3.5" strokeDasharray="8 7" strokeLinecap="round" />

        {/* Recommended route — solid brand purple */}
        <path d="M 62 330 C 140 322, 170 280, 218 250 C 300 198, 330 140, 408 96 C 452 72, 480 66, 506 62" fill="none" stroke="#9900e8" strokeWidth="5" strokeLinecap="round" />

        {/* Congestion marker on the alternative */}
        <g transform="translate(280 214)">
          <circle r="13" fill="#fff9e6" stroke="#e8b006" strokeWidth="2" />
          <path d="M -5 4 L 0 -6 L 5 4 Z" fill="#e8b006" />
        </g>

        {/* Origin & destination pins */}
        <g transform="translate(62 330)">
          <circle r="10" fill="#16181b" />
          <circle r="4" fill="#ffffff" />
        </g>
        <g transform="translate(506 62)">
          <circle r="12" fill="#9900e8" />
          <circle r="4.5" fill="#ffffff" />
          <circle r="18" fill="none" stroke="#9900e8" strokeOpacity="0.35" strokeWidth="2" />
        </g>
      </svg>

      {/* Drone marker riding the recommended route */}
      <motion.span initial={{ offsetDistance: "0%" }} animate={{ offsetDistance: ["0%", "100%"] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }} style={{ offsetPath: "path('M 62 330 C 140 322, 170 280, 218 250 C 300 198, 330 140, 408 96 C 452 72, 480 66, 506 62')", left: 0, top: 0 }} className="bg-action shadow-brand absolute z-10 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full">
        <svg aria-hidden viewBox="0 0 24 24" className="size-4.5 text-white">
          <path fill="currentColor" d="M12 5c.6 0 1 .4 1 1v2.2l7 4v2.3l-7-2v3.4l2 1.5V19l-3-1-3 1v-1.6l2-1.5v-3.4l-7 2v-2.3l7-4V6c0-.6.4-1 1-1Z" />
        </svg>
        <span aria-hidden className="bg-action/40 absolute inset-0 -z-10 animate-ping rounded-full" />
      </motion.span>
    </div>
  )
}

export function IntelligenceMap() {
  return (
    <section id="intelligence" className="bg-page scroll-mt-24 py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: easeOut }} className="flex flex-col items-start gap-5">
            <p className="text-caption text-content-brand font-bold tracking-widest uppercase">The intelligence, explained</p>
            <h2 className="text-h2-m md:text-h2 max-w-md">Not another map. A decision you can trust.</h2>

            <div className="mt-2 flex w-full flex-col gap-3">
              <div className="border-edge-brand bg-primary-50/60 flex items-center justify-between gap-4 rounded-2xl border-2 px-5 py-4">
                <div className="flex flex-col">
                  <span className="text-caption text-primary-700 font-bold tracking-wider uppercase">Recommended route</span>
                  <span className="text-h4">41 min · 18.2 km</span>
                </div>
                <span className="bg-action text-on-brand text-caption-m rounded-full px-3 py-1 font-bold">Best</span>
              </div>
              <div className="border-edge-subtle bg-elevated flex items-center justify-between gap-4 rounded-2xl border px-5 py-4">
                <div className="flex flex-col">
                  <span className="text-caption text-content-tertiary font-bold tracking-wider uppercase">Alternative</span>
                  <span className="text-h4 text-content-secondary">49 min · 16.5 km</span>
                </div>
              </div>
            </div>

            <p className="text-body-m text-content-secondary border-edge-subtle bg-elevated md:text-body max-w-md rounded-2xl border px-5 py-4">
              <span className="text-content font-semibold">Recommended</span> because current traffic is expected to make the alternative approximately <span className="text-content font-semibold">8 minutes slower</span> — even though it&apos;s shorter.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.1, ease: easeOut }}>
            <RouteMap />
            <p className="text-caption-m text-content-tertiary mt-3 text-center">Live routing illustration — Yspace weighs traffic, distance and reliability before recommending.</p>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
