"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Camera, CircleCheck, Video } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { Button, Container, DatePicker, Select, TextareaField, TextField, TimePicker } from "@/components/ui"
import { work1, work2, work3, work4 } from "@public/index"
import { cn } from "@/lib"

const easeOut = [0.16, 1, 0.3, 1] as const

const categories = [
  {
    title: "Weddings",
    items: ["Wedding photography", "Wedding videography", "Engagement sessions", "Pre-wedding shoots", "Reception coverage"],
  },
  {
    title: "Private & Social Events",
    items: ["Birthdays", "Anniversaries", "Graduations", "Celebrations", "Family events", "Private parties"],
  },
  {
    title: "Corporate & Business Events",
    items: ["Conferences", "Corporate events", "Product launches", "Award ceremonies", "Company celebrations", "Networking events"],
  },
  {
    title: "Government & Institutional Events",
    items: ["Government conferences", "Official ceremonies", "Public events", "Institutional programmes", "Summits and forums"],
  },
  {
    title: "Brand & Commercial Production",
    items: ["Product photography", "Brand campaigns", "Corporate videos", "Social media content", "Promotional videos", "Event highlight films"],
  },
]

const services = ["Photography", "Videography", "Photography + Videography"]
const eventTypes = ["Wedding", "Birthday", "Corporate Event", "Conference", "Government Event", "Graduation", "Product Launch", "Private Event", "Other"]
const coverage = ["Full event coverage", "Photography only", "Video only", "Highlight video", "Multiple cameras", "Aerial/drone coverage", "Same-day content", "Social media content"]

/** Collage of recent work shot for the premium hero. */
function HeroCollage() {
  const shots = [
    { src: work1, className: "left-0 top-6 w-[46%] rotate-[-4deg]" },
    { src: work2, className: "right-0 top-0 w-[48%] rotate-[3deg]" },
    { src: work3, className: "bottom-0 left-[8%] w-[44%] rotate-[2deg]" },
    { src: work4, className: "right-[6%] bottom-8 w-[42%] rotate-[-3deg]" },
  ]
  return (
    <motion.div aria-hidden initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3, ease: easeOut }} className="relative mx-auto aspect-square w-full max-w-[420px]">
      {shots.map((shot, index) => (
        <motion.div key={index} className={cn("absolute overflow-hidden rounded-2xl border border-white/10 shadow-lg", shot.className)} animate={{ y: [0, index % 2 === 0 ? -8 : 8, 0] }} transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}>
          <Image src={shot.src} alt="" width={370} height={370} className="h-full w-full object-cover" sizes="(max-width: 768px) 45vw, 200px" />
        </motion.div>
      ))}
      <div className="bg-primary-500/30 absolute inset-[18%] rounded-full blur-[90px]" />
    </motion.div>
  )
}

export function PhotographyPageClient() {
  const [submitted, setSubmitted] = useState(false)
  const [reference] = useState(() => `YSP-PH-${Math.random().toString(36).slice(2, 8).toUpperCase()}`)
  const [selectedCoverage, setSelectedCoverage] = useState<string[]>([])
  const [form, setForm] = useState({
    service: "Photography + Videography",
    eventType: "Wedding",
    date: "",
    timeStart: "",
    timeEnd: "",
    location: "",
    attendance: "",
    notes: "",
    name: "",
    email: "",
    phone: "",
    company: "",
  })

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function toggleCoverage(item: string) {
    setSelectedCoverage((current) => (current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item]))
  }

  return (
    <div className="bg-page">
      {/* Hero — premium & visual */}
      <section className="relative overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_-10%,rgba(92,0,140,0.45),transparent_70%)]" />
        <Container className="relative grid items-center gap-12 pt-40 pb-16 md:pt-48 md:pb-20 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: easeOut }}>
            <p className="text-caption text-primary-100 font-bold tracking-widest uppercase">Yspace Services</p>
            <h1 className="text-h1-m md:text-h1 mt-3">
              Photography &amp; <span className="from-primary-100 via-primary-300 to-primary-500 bg-gradient-to-r bg-clip-text text-transparent">Videography</span>
            </h1>
            <p className="text-body-lg-m text-body-lg mt-5 max-w-xl text-white/75">Professional visual coverage for moments, events and experiences that deserve to be remembered.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#booking" size="lg">
                Book a Service <ArrowRight className="size-4" aria-hidden />
              </Button>
              <Button href="#booking" size="lg" variant="outline" className="border-white/25 text-white hover:bg-white/10">
                Request a Quote
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="text-caption flex items-center gap-2 text-white/60">
                <Camera className="size-4" aria-hidden /> Photo & film crews
              </span>
              <span className="text-caption flex items-center gap-2 text-white/60">
                <Video className="size-4" aria-hidden /> Same-day highlight cuts
              </span>
            </div>
          </motion.div>
          <HeroCollage />
        </Container>
      </section>

      {/* Service categories — large visual cards */}
      <section id="coverage" className="scroll-mt-28 py-16 md:py-24">
        <Container>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: easeOut }} className="flex flex-col items-start gap-4">
            <p className="text-caption text-content-brand font-bold tracking-widest uppercase">What we cover</p>
            <h2 className="text-h2-m md:text-h2 max-w-3xl">Coverage for every kind of moment.</h2>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <motion.article key={category.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: easeOut }} className={cn("border-edge bg-elevated flex flex-col rounded-3xl border p-7 shadow-sm transition-shadow hover:shadow-lg", index === 0 && "border-edge-brand from-primary-50 via-elevated to-elevated bg-gradient-to-br")}>
                <h3 className="text-h3-m md:text-h3">{category.title}</h3>
                <ul className="mt-4 flex flex-1 flex-col gap-2.5">
                  {category.items.map((item) => (
                    <li key={item} className="text-body-m text-content-secondary md:text-caption flex items-start gap-2.5">
                      <span className="bg-primary-600 mt-[7px] size-1.5 shrink-0 rounded-full" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      {/* Booking form / confirmation */}
      <section id="booking" className="scroll-mt-28 pb-20 md:pb-28">
        <Container>
          <div className="border-edge bg-surface rounded-3xl border p-6 shadow-lg md:p-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="confirmed" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: easeOut }} className="flex flex-col items-center py-6 text-center">
                  <span className="bg-secondary-50 text-secondary-400 flex size-16 items-center justify-center rounded-full">
                    <CircleCheck className="size-8" aria-hidden />
                  </span>
                  <h2 className="text-h2-m md:text-h2 mt-6">Your request has been received.</h2>
                  <p className="text-body-m text-content-secondary md:text-body mt-3 max-w-lg">Our production team will review availability and send you a quote shortly.</p>

                  <div className="border-edge bg-elevated mt-8 w-full max-w-xl rounded-2xl border p-6 text-left">
                    <dl className="grid gap-3">
                      {[
                        ["Request reference", reference],
                        ["Service requested", form.service],
                        ["Event date", form.date || "—"],
                        ["Location", form.location || "—"],
                        ["Contact", form.name ? `${form.name} · ${form.email}` : "—"],
                        ["Expected response", "Within 24 hours"],
                      ].map(([term, value]) => (
                        <div key={term} className="flex items-baseline justify-between gap-6">
                          <dt className="text-caption text-content-secondary">{term}</dt>
                          <dd className="text-body-m md:text-caption text-right font-bold">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <Button href="/" variant="outline" className="mt-8">
                    Return to Yspace
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: easeOut }}
                  onSubmit={(event) => {
                    event.preventDefault()
                    setSubmitted(true)
                  }}
                  className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]"
                >
                  <div className="flex flex-col items-start gap-4">
                    <p className="text-caption text-content-brand font-bold tracking-widest uppercase">Book a service</p>
                    <h2 className="text-h2-m md:text-h2">Tell us about your event.</h2>
                    <p className="text-body-m text-content-secondary md:text-body">Share the details and we&apos;ll confirm availability, coverage plan and a tailored quote — event requirements vary, so we quote each production individually.</p>

                    <div className="border-edge-subtle mt-4 w-full rounded-2xl border border-dashed p-5">
                      <p className="text-caption font-bold">Flow</p>
                      <ol className="text-caption-m text-content-secondary md:text-caption mt-3 flex flex-col gap-2">
                        {["Select service", "Select event type", "Event details", "Date & time", "Location", "Coverage requirements", "Contact information", "Quote / availability"].map((stage, index) => (
                          <li key={stage} className="flex items-center gap-2.5">
                            <span className="text-primary-600 w-5 text-right font-bold tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                            {stage}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Select label="Service" options={services} value={form.service} onChange={(value) => update("service", value)} />
                      <Select label="Event type" options={eventTypes} value={form.eventType} onChange={(value) => update("eventType", value)} />
                      <DatePicker label="Event date" value={form.date} onChange={(value) => update("date", value)} />
                      <div className="grid grid-cols-2 gap-3">
                        <TimePicker label="Start time" value={form.timeStart} onChange={(value) => update("timeStart", value)} placeholder="Start…" />
                        <TimePicker label="End time" value={form.timeEnd} onChange={(value) => update("timeEnd", value)} placeholder="End…" />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <TextField label="Location" value={form.location} onChange={(event) => update("location", event.target.value)} placeholder="Venue / address" />
                      <TextField label="Expected attendance" optional value={form.attendance} onChange={(event) => update("attendance", event.target.value.replace(/[^0-9]/g, ""))} placeholder="e.g. 250" inputMode="numeric" />
                    </div>

                    <fieldset>
                      <legend className="text-caption mb-2 font-bold">Coverage requirements</legend>
                      <div className="flex flex-wrap gap-2">
                        {coverage.map((item) => (
                          <button key={item} type="button" onClick={() => toggleCoverage(item)} aria-pressed={selectedCoverage.includes(item)} className={cn("text-caption rounded-full border px-4 py-2 font-semibold transition-all", selectedCoverage.includes(item) ? "border-edge-brand bg-primary-50 text-primary-700" : "border-edge bg-elevated text-content-secondary hover:border-edge-brand")}>
                            {item}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <TextareaField label="Additional information" optional value={form.notes} onChange={(event) => update("notes", event.target.value)} rows={4} placeholder="Tell us anything else about your event or production requirements." />

                    <div className="border-edge-subtle grid gap-5 border-t pt-5 sm:grid-cols-2">
                      <TextField label="Full name" value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Your name" required />
                      <TextField label="Email" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@example.com" required />
                      <TextField label="Phone number" type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="+234 800 000 0000" required />
                      <TextField label="Company / organization" optional value={form.company} onChange={(event) => update("company", event.target.value)} placeholder="Company name" />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Request Quote <ArrowRight className="size-4" aria-hidden />
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </section>
    </div>
  )
}
