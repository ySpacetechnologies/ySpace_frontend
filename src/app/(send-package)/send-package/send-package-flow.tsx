"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, CircleCheck } from "lucide-react"
import { useMemo, useState } from "react"

import { Button, Container, Select, TextField } from "@/components/ui"
import { cn } from "@/lib"

const easeOut = [0.16, 1, 0.3, 1] as const

const STEPS = ["Locations", "Package", "Estimate", "Checkout", "Confirmed"] as const

type FlowStep = 0 | 1 | 2 | 3 | 4

const packageTypes = [
  { value: "small", label: "Small package — up to 5 kg" },
  { value: "medium", label: "Medium package — up to 12 kg" },
  { value: "large", label: "Large package — up to 20 kg" },
] as const

const packageHints: Record<string, string> = {
  small: "Suitable for documents, small electronics, personal items, etc.",
  medium: "Suitable for clothing, accessories and multiple items.",
  large: "Suitable for bulkier goods and larger electronics.",
}

const handlingOptions = ["Fragile", "Keep upright", "Priority"] as const

const inputShell = "border-edge bg-elevated focus-within:border-edge-brand focus-within:shadow-brand/40 block w-full rounded-2xl border px-4 py-3.5 transition-all"

function LocationField({ label, hint, value, onChange, placeholder, action }: { label: string; hint: string; value: string; onChange: (value: string) => void; placeholder: string; action?: React.ReactNode }) {
  const inputId = `${label}-input`
  return (
    <div className="flex flex-col">
      <label htmlFor={inputId} className="text-caption mb-2 font-bold">
        {label}
      </label>
      <div className={inputShell}>
        <input id={inputId} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="text-body-m md:text-body placeholder:text-content-tertiary w-full bg-transparent outline-none" />
        {action ? <div className="mt-3">{action}</div> : null}
      </div>
      <span className="text-caption-m text-content-tertiary md:text-caption mt-2">{hint}</span>
    </div>
  )
}

export function SendPackageFlow() {
  const [step, setStep] = useState<FlowStep>(0)
  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")
  const [packageType, setPackageType] = useState("small")
  const [description, setDescription] = useState("")
  const [weight, setWeight] = useState("")
  const [packages, setPackages] = useState("1")
  const [handling, setHandling] = useState<string[]>([])
  const [paymentMethod, setPaymentMethod] = useState("card")

  const estimate = useMemo(() => {
    const base = packageType === "small" ? 3500 : packageType === "medium" ? 6000 : 9500
    const extras = handling.length * 1200
    const price = base + extras
    const minutes = packageType === "small" ? 38 : packageType === "medium" ? 52 : 71
    return { price, minutes }
  }, [packageType, handling])

  const price = `₦${estimate.price.toLocaleString("en-NG")}`
  const eta = estimate.minutes >= 60 ? `${Math.floor(estimate.minutes / 60)} h ${estimate.minutes % 60} min` : `${estimate.minutes} min`
  const deliveryId = "YSP-8F3K2QX7"

  function toggleHandling(value: string) {
    setHandling((current) => (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]))
  }

  const canContinue = pickup.trim().length > 1 && destination.trim().length > 1

  return (
    <div className="bg-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_-10%,rgba(92,0,140,0.45),transparent_70%)]" />
        <Container className="relative pt-40 pb-14 md:pt-48 md:pb-16">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: easeOut }} className="mx-auto max-w-2xl text-center">
            <p className="text-caption text-primary-100 font-bold tracking-widest uppercase">Send a package</p>
            <h1 className="text-h1-m md:text-h1 mt-3">Send a package. We&apos;ll handle the rest.</h1>
            <p className="text-body-lg-m text-body-lg mt-4 text-white/75">Enter your pickup and destination, tell us what you&apos;re sending, and get a delivery estimate.</p>
          </motion.div>
        </Container>
      </section>

      {/* Booking flow — the main focus of the page */}
      <section className="py-14 md:py-20">
        <Container>
          <div className="border-edge bg-surface rounded-3xl border p-6 shadow-lg md:p-10">
            <p className="text-caption text-content-tertiary font-bold tracking-widest uppercase">
              Step {String(step + 1).padStart(2, "0")} — {STEPS[step]}
            </p>

            <div className="mt-8">
              <AnimatePresence mode="wait">
                {/* Step 1 — Locations */}
                {step === 0 ? (
                  <motion.div key="locations" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.4, ease: easeOut }} className="flex flex-col gap-5">
                    <LocationField
                      label="Pickup"
                      hint="Where are we picking up from?"
                      value={pickup}
                      onChange={setPickup}
                      placeholder="Enter pickup location"
                      action={
                        <button type="button" onClick={() => setPickup("Lagos, Nigeria")} className="text-caption text-content-brand hover:text-primary-800 inline-flex items-center gap-1.5 font-bold transition-colors">
                          Use my current location
                        </button>
                      }
                    />
                    <LocationField label="Destination" hint="Where should we deliver it?" value={destination} onChange={setDestination} placeholder="Enter destination" />

                    <div className="flex justify-end">
                      <Button onClick={() => setStep(1)} disabled={!canContinue} size="lg">
                        Continue <ArrowRight className="size-4" aria-hidden />
                      </Button>
                    </div>
                  </motion.div>
                ) : null}

                {/* Step 2 — Package details */}
                {step === 1 ? (
                  <motion.div key="package" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.4, ease: easeOut }} className="flex flex-col gap-5">
                    <p className="text-h3-m md:text-h3">What are you sending?</p>

                    <Select label="Package type" options={packageTypes} value={packageType} onChange={setPackageType} />
                    <span className="text-caption-m text-content-secondary md:text-caption -mt-2">{packageHints[packageType]}</span>

                    <div className="grid gap-5 md:grid-cols-3">
                      <TextField label="Package description" optional value={description} onChange={(event) => setDescription(event.target.value)} placeholder="e.g. Laptop, documents, gift" />
                      <TextField label="Weight (kg)" optional value={weight} onChange={(event) => setWeight(event.target.value.replace(/[^0-9.]/g, ""))} placeholder="e.g. 2.5" inputMode="decimal" />
                      <TextField label="Number of packages" value={packages} onChange={(event) => setPackages(event.target.value.replace(/[^0-9]/g, "") || "1")} inputMode="numeric" />
                    </div>

                    <fieldset>
                      <legend className="text-caption mb-2 font-bold">
                        Special handling <span className="text-content-tertiary font-medium">(if applicable)</span>
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {handlingOptions.map((option) => (
                          <button key={option} type="button" onClick={() => toggleHandling(option)} aria-pressed={handling.includes(option)} className={cn("text-caption rounded-full border px-4 py-2 font-bold transition-all", handling.includes(option) ? "border-edge-brand bg-primary-50 text-primary-700" : "border-edge bg-elevated text-content-secondary hover:border-edge-brand")}>
                            {option}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <div className="flex items-center justify-between">
                      <Button variant="ghost" onClick={() => setStep(0)}>
                        <ArrowLeft className="size-4" aria-hidden /> Back
                      </Button>
                      <Button onClick={() => setStep(2)} size="lg">
                        Get Delivery Estimate <ArrowRight className="size-4" aria-hidden />
                      </Button>
                    </div>
                  </motion.div>
                ) : null}

                {/* Step 3 — Delivery estimate */}
                {step === 2 ? (
                  <motion.div key="estimate" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.4, ease: easeOut }} className="flex flex-col gap-6">
                    <p className="text-h3-m md:text-h3">Your delivery</p>

                    <div className="border-edge bg-elevated rounded-2xl border p-6">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
                        <div className="flex-1">
                          <p className="text-caption text-content-tertiary font-bold tracking-wider uppercase">Pickup</p>
                          <p className="text-body-m md:text-body mt-1 font-bold">{pickup || "Lagos, Nigeria"}</p>
                        </div>
                        <div aria-hidden className="bg-edge-brand relative h-px flex-1">
                          <span className="bg-primary-600 absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rotate-45" />
                          <span className="bg-primary-100 absolute top-1/2 left-[30%] h-1.5 w-1.5 -translate-y-1/2 rounded-full" />
                          <span className="bg-primary-300 absolute top-1/2 left-[60%] h-1.5 w-1.5 -translate-y-1/2 rounded-full" />
                        </div>
                        <div className="flex-1 md:text-right">
                          <p className="text-caption text-content-tertiary font-bold tracking-wider uppercase">Destination</p>
                          <p className="text-body-m md:text-body mt-1 font-bold">{destination || "Abuja, Nigeria"}</p>
                        </div>
                      </div>

                      <div className="border-edge-subtle mt-6 grid gap-4 border-t pt-6 sm:grid-cols-3">
                        <div>
                          <p className="text-caption text-content-tertiary">Estimated delivery time</p>
                          <p className="text-h3-m md:text-h3 text-primary-700 mt-1 font-bold">{eta}</p>
                        </div>
                        <div>
                          <p className="text-caption text-content-tertiary">Estimated price</p>
                          <p className="text-h3-m md:text-h3 mt-1 font-bold">{price}</p>
                        </div>
                        <div>
                          <p className="text-caption text-content-tertiary">Delivery method</p>
                          <p className="text-body-m md:text-body mt-1 inline-flex items-center gap-2 font-bold">
                            <span className="bg-secondary-200 size-1.5 rounded-full" /> Yspace Delivery
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button variant="ghost" onClick={() => setStep(1)}>
                        <ArrowLeft className="size-4" aria-hidden /> Back
                      </Button>
                      <Button onClick={() => setStep(3)} size="lg">
                        Continue to Checkout <ArrowRight className="size-4" aria-hidden />
                      </Button>
                    </div>
                  </motion.div>
                ) : null}

                {/* Step 4 — Checkout */}
                {step === 3 ? (
                  <motion.div key="checkout" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.4, ease: easeOut }} className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="flex flex-col gap-5">
                      <p className="text-h3-m md:text-h3">Review your delivery</p>
                      <div className="border-edge bg-elevated rounded-2xl border p-6">
                        <dl className="grid gap-3">
                          {[
                            ["Pickup", pickup || "Lagos, Nigeria"],
                            ["Destination", destination || "Abuja, Nigeria"],
                            ["Package", `${packageTypes.find((type) => type.value === packageType)?.label.split(" — ")[0]}${description ? ` — ${description}` : ""}`],
                            ["Estimated delivery time", eta],
                            ["Price", price],
                          ].map(([term, value]) => (
                            <div key={term} className="flex items-baseline justify-between gap-6">
                              <dt className="text-caption text-content-secondary">{term}</dt>
                              <dd className="text-body-m md:text-caption text-right font-bold">{value}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </div>

                    <div className="border-edge bg-elevated flex flex-col rounded-2xl border p-6">
                      <Select
                        label="Payment method"
                        options={[
                          { value: "card", label: "Card payment" },
                          { value: "transfer", label: "Bank transfer" },
                        ]}
                        value={paymentMethod}
                        onChange={setPaymentMethod}
                      />
                      <Button onClick={() => setStep(4)} size="lg" className="mt-6 w-full">
                        Pay &amp; Confirm Delivery
                      </Button>
                      <button type="button" onClick={() => setStep(2)} className="text-caption text-content-secondary hover:text-content mt-3 font-semibold transition-colors">
                        <ArrowLeft className="mr-1 inline size-3.5" aria-hidden /> Back to estimate
                      </button>
                    </div>
                  </motion.div>
                ) : null}

                {/* Step 5 — Confirmation + tracking preview */}
                {step === 4 ? (
                  <motion.div key="confirmed" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: easeOut }} className="flex flex-col items-center">
                    <span className="bg-secondary-50 text-secondary-400 flex size-16 items-center justify-center rounded-full">
                      <CircleCheck className="size-8" aria-hidden />
                    </span>
                    <h2 className="text-h2-m md:text-h2 mt-6 text-center">Your delivery is confirmed.</h2>
                    <p className="text-body-m text-content-secondary md:text-body mt-3 text-center">Yspace has received your delivery request.</p>

                    <div className="border-edge bg-elevated mt-8 w-full rounded-2xl border p-6 md:p-8">
                      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
                        <div className="flex flex-col gap-4">
                          <div>
                            <p className="text-caption text-content-tertiary">Delivery ID</p>
                            <p className="text-h3-m md:text-h3 text-primary-700 font-bold">{deliveryId}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-caption text-content-tertiary">Pickup</p>
                              <p className="text-body-m md:text-body font-bold">{pickup || "Lagos"}</p>
                            </div>
                            <div>
                              <p className="text-caption text-content-tertiary">Destination</p>
                              <p className="text-body-m md:text-body font-bold">{destination || "Abuja"}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-caption text-content-tertiary">Estimated arrival</p>
                            <p className="text-body-m md:text-body font-bold">{eta}</p>
                          </div>
                          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                            <Button href="/" variant="outline">
                              Back to Home
                            </Button>
                            <Button href="/orders">
                              Track Delivery <ArrowRight className="size-4" aria-hidden />
                            </Button>
                          </div>
                        </div>

                        {/* Tracking preview — customer-safe status, no telemetry */}
                        <div className="border-edge-subtle bg-page rounded-2xl border border-dashed p-6">
                          <p className="text-caption font-bold tracking-wider uppercase">Tracking</p>
                          <ol className="mt-5 flex flex-col gap-0">
                            {["Request confirmed", "Pickup scheduled", "Package collected", "In transit", "Delivered"].map((label, index) => (
                              <li key={label} className="relative flex gap-4 pb-6 last:pb-0">
                                {index < 4 ? <span aria-hidden className="bg-edge-subtle absolute top-5 left-[7px] h-full w-px" /> : null}
                                <span className={cn("relative z-10 mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border-2", index === 0 ? "border-secondary-200 bg-secondary-200" : "border-edge bg-elevated")}>{index === 0 ? <Check className="size-2.5 text-white" aria-hidden /> : null}</span>
                                <span className={cn("text-body-m md:text-caption font-semibold", index === 0 ? "text-content" : "text-content-tertiary")}>{label}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
