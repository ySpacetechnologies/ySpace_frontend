"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, CircleCheck, Cog, LifeBuoy, Plane, Wrench } from "lucide-react"
import { useState } from "react"

import { DroneStage } from "@/components/drone-stage"
import { Button, Container, FileDrop, Select, TextareaField, TextField } from "@/components/ui"

const easeOut = [0.16, 1, 0.3, 1] as const

const serviceGroups = [
  {
    icon: Wrench,
    title: "Drone Repair",
    items: ["Diagnostics", "Hardware inspection", "Component replacement", "Mechanical repairs", "Electronic repairs", "Flight-system troubleshooting"],
  },
  {
    icon: Cog,
    title: "Drone Maintenance",
    items: ["Preventive maintenance", "System inspection", "Firmware/software checks", "Component testing", "Pre-flight assessment"],
  },
  {
    icon: LifeBuoy,
    title: "Drone Technical Support",
    items: ["Troubleshooting", "System diagnostics", "Configuration assistance", "Performance assessment"],
  },
  {
    icon: Plane,
    title: "Drone Operations",
    availability: "Where available",
    items: ["Aerial photography", "Aerial videography", "Mapping", "Inspection", "Survey support", "Event aerial coverage"],
  },
]

const serviceOptions = ["Repair", "Maintenance", "Diagnostics", "Technical Support", "Other"]

export function DroneRepairsPageClient() {
  const [submitted, setSubmitted] = useState(false)
  const [reference] = useState(() => `YSP-DR-${Math.random().toString(36).slice(2, 8).toUpperCase()}`)
  const [service, setService] = useState("Repair")
  const [files, setFiles] = useState<FileList | null>(null)
  const [form, setForm] = useState({
    manufacturer: "",
    model: "",
    serial: "",
    age: "",
    problem: "",
    location: "",
    name: "",
    email: "",
    phone: "",
    company: "",
  })

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  return (
    <div className="bg-page">
      {/* Hero — technical visual language with the 3D drone */}
      <section className="relative overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_-10%,rgba(92,0,140,0.45),transparent_70%)]" />
        <div aria-hidden className="bg-grid-dark absolute inset-0 opacity-40" />
        <Container className="relative grid items-center gap-10 pt-40 pb-16 md:pt-48 md:pb-20 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: easeOut }}>
            <p className="text-caption text-primary-100 font-bold tracking-widest uppercase">Yspace Services</p>
            <h1 className="text-h1-m md:text-h1 mt-3">
              Drone Services &amp; <span className="from-primary-100 via-primary-300 to-primary-500 bg-gradient-to-r bg-clip-text text-transparent">Repair</span>
            </h1>
            <p className="text-body-lg-m text-body-lg mt-5 max-w-xl text-white/75">Professional drone support, maintenance and technical services for operators, businesses and organizations.</p>
            <div className="mt-8">
              <Button href="#repair" size="lg">
                Request Drone Repair <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3, ease: easeOut }}>
            <DroneStage interactive={false} fill={0.78} yaw={Math.PI * 0.72} className="relative mx-auto aspect-square w-full max-w-[440px]" />
          </motion.div>
        </Container>
      </section>

      {/* Service categories */}
      <section id="services" className="scroll-mt-28 py-16 md:py-24">
        <Container>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: easeOut }} className="flex flex-col items-start gap-4">
            <p className="text-caption text-content-brand font-bold tracking-widest uppercase">Technical services</p>
            <h2 className="text-h2-m md:text-h2 max-w-3xl">Engineering support for every flight system.</h2>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {serviceGroups.map((group, index) => (
              <motion.article key={group.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: easeOut }} className="border-edge bg-elevated flex flex-col rounded-3xl border p-7 shadow-sm transition-shadow hover:shadow-lg md:p-8">
                <div className="flex items-center justify-between">
                  <span className="bg-primary-50 text-primary-700 flex size-12 items-center justify-center rounded-2xl">
                    <group.icon className="size-6" aria-hidden />
                  </span>
                  {group.availability ? <span className="text-warning-text bg-warning-bg text-caption rounded-full px-3 py-1 font-bold">{group.availability}</span> : null}
                </div>
                <h3 className="text-h3-m md:text-h3 mt-6">{group.title}</h3>
                <ul className="mt-4 flex flex-1 flex-col gap-2.5">
                  {group.items.map((item) => (
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

      {/* Repair request / confirmation */}
      <section id="repair" className="scroll-mt-28 pb-20 md:pb-28">
        <Container>
          <div className="border-edge bg-surface rounded-3xl border p-6 shadow-lg md:p-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="confirmed" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: easeOut }} className="flex flex-col items-center py-6 text-center">
                  <span className="bg-secondary-50 text-secondary-400 flex size-16 items-center justify-center rounded-full">
                    <CircleCheck className="size-8" aria-hidden />
                  </span>
                  <h2 className="text-h2-m md:text-h2 mt-6">Your repair request has been received.</h2>
                  <p className="text-body-m text-content-secondary md:text-body mt-3 max-w-lg">Our technical team will review your case, run a diagnosis and send you a quote.</p>

                  <div className="border-edge bg-elevated mt-8 w-full max-w-xl rounded-2xl border p-6 text-left">
                    <dl className="grid gap-3">
                      {[
                        ["Request reference", reference],
                        ["Service required", service],
                        ["Drone", form.manufacturer ? `${form.manufacturer} ${form.model}` : "—"],
                        ["Location", form.location || "—"],
                        ["Contact", form.name ? `${form.name} · ${form.email}` : "—"],
                        ["Next step", "Technical review → Diagnosis / Quote"],
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
                    <p className="text-caption text-content-brand font-bold tracking-widest uppercase">Request drone repair</p>
                    <h2 className="text-h2-m md:text-h2">Describe the issue. We&apos;ll handle the diagnosis.</h2>
                    <p className="text-body-m text-content-secondary md:text-body">Every request goes through a technical review before physical inspection — the more detail you share, the faster we can quote.</p>

                    <div className="border-edge-subtle mt-4 w-full rounded-2xl border border-dashed p-5">
                      <p className="text-caption font-bold">Flow</p>
                      <ol className="text-caption-m text-content-secondary md:text-caption mt-3 flex flex-col gap-2">
                        {["Select service", "Drone information", "Describe problem", "Upload photos / video", "Location", "Contact information", "Technical review", "Diagnosis / Quote"].map((stage, index) => (
                          <li key={stage} className="flex items-center gap-2.5">
                            <span className="text-primary-600 w-5 text-right font-bold tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                            {stage}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="border-edge-subtle mt-2 w-full rounded-2xl border border-dashed p-5">
                      <p className="text-caption font-bold">Request statuses</p>
                      <p className="text-caption-m text-content-secondary md:text-caption mt-2">Submitted → Under Review → Quote Ready → Scheduled → In Progress → Completed</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <Select label="Service required" options={serviceOptions} value={service} onChange={setService} />

                    <div className="grid gap-5 sm:grid-cols-2">
                      <TextField label="Drone manufacturer" value={form.manufacturer} onChange={(event) => update("manufacturer", event.target.value)} placeholder="e.g. DJI" required />
                      <TextField label="Model" value={form.model} onChange={(event) => update("model", event.target.value)} placeholder="e.g. Mavic 3" required />
                      <TextField label="Serial number" optional value={form.serial} onChange={(event) => update("serial", event.target.value)} placeholder="Serial" />
                      <TextField label="Approximate age" optional value={form.age} onChange={(event) => update("age", event.target.value)} placeholder="e.g. 2 years" />
                    </div>

                    <TextareaField label="Problem description" value={form.problem} onChange={(event) => update("problem", event.target.value)} rows={4} placeholder="Describe the issue you're experiencing." required />

                    <FileDrop label="Photos, videos & documents" hint="Helps our technical team understand the issue before inspection" files={files} onChange={setFiles} multiple />

                    <TextField label="Location" value={form.location} onChange={(event) => update("location", event.target.value)} placeholder="Where the drone is currently located" required />

                    <div className="border-edge-subtle grid gap-5 border-t pt-5 sm:grid-cols-2">
                      <TextField label="Name" value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Your name" required />
                      <TextField label="Email" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@example.com" required />
                      <TextField label="Phone" type="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="+234 800 000 0000" required />
                      <TextField label="Company" optional value={form.company} onChange={(event) => update("company", event.target.value)} placeholder="Company name" />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Submit Repair Request <ArrowRight className="size-4" aria-hidden />
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
