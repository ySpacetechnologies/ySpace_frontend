"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

import { cn } from "@/lib"

type Star = {
  left: string
  top: string
  size: number
  duration: number
  delay: number
  opacity: number
}

function makeStars(count: number, seed: number): Star[] {
  let state = seed
  const random = () => {
    state = (state * 16807) % 2147483647
    return (state - 1) / 2147483646
  }
  return Array.from({ length: count }, () => ({
    left: `${random() * 100}%`,
    top: `${random() * 100}%`,
    size: 1 + random() * 2,
    duration: 2.5 + random() * 4,
    delay: random() * 5,
    opacity: 0.35 + random() * 0.6,
  }))
}

/**
 * Ambient deep-space backdrop: two parallax layers of drifting, twinkling
 * stars rendered with framer-motion. Purely decorative — respects
 * prefers-reduced-motion.
 */
export function Starfield({ className }: { className?: string }) {
  const far = useMemo(() => makeStars(70, 42), [])
  const near = useMemo(() => makeStars(30, 1337), [])

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {/* Nebula glows — the "space" depth behind the stars */}
      <div className="bg-nebula absolute inset-0" />

      <motion.div className="absolute -inset-16" animate={{ x: [0, -28, 0], y: [0, 18, 0] }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }}>
        {far.map((star, index) => (
          <motion.span key={index} className="absolute rounded-full bg-white" style={{ left: star.left, top: star.top, width: star.size, height: star.size }} animate={{ opacity: [star.opacity * 0.4, star.opacity, star.opacity * 0.4] }} transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: "easeInOut" }} />
        ))}
      </motion.div>

      <motion.div className="absolute -inset-16" animate={{ x: [0, 34, 0], y: [0, -22, 0] }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
        {near.map((star, index) => (
          <motion.span key={index} className="absolute rounded-full bg-white" style={{ left: star.left, top: star.top, width: star.size + 1, height: star.size + 1 }} animate={{ opacity: [star.opacity * 0.5, 1, star.opacity * 0.5], scale: [1, 1.35, 1] }} transition={{ duration: star.duration * 0.8, delay: star.delay, repeat: Infinity, ease: "easeInOut" }} />
        ))}
      </motion.div>
    </div>
  )
}
