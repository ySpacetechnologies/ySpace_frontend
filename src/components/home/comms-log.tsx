import { MessageSquare } from "lucide-react"
import { Container } from "@/components/ui"
import { CommsItem } from "./comms-item"

const defaultAnswer = "Yspace is a drone-powered delivery and e-commerce platform that connects local businesses and customers. You can shop, send packages, or partner your business — and we'll deliver by drone, straight to your doorstep."

const transmissions = [
  {
    question: "What is Yspace?",
    answer: defaultAnswer,
    defaultOpen: true,
  },
  {
    question: "How fast are deliveries?",
    answer: defaultAnswer,
  },
  {
    question: "What can I order on Yspace?",
    answer: defaultAnswer,
  },
  {
    question: "How do I send my own package?",
    answer: defaultAnswer,
  },
  {
    question: "Is drone delivery safe?",
    answer: "Absolutely. Yspace drones follow strict flight and safety regulations, with secure packaging and real-time tracking for every delivery.",
  },
  {
    question: "What happens if my delivery fails?",
    answer: defaultAnswer,
  },
  {
    question: "Where is Yspace available?",
    answer: defaultAnswer,
  },
]

export function CommsLog() {
  return (
    <section id="comms" className="bg-page scroll-mt-24 py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="flex flex-col items-start gap-4">
            <p className="text-caption text-content-brand font-bold tracking-widest uppercase">Comms</p>
            <h2 className="text-h2-m md:text-h2">Frequently asked questions.</h2>
            <p className="text-body-m text-content-secondary md:text-body">Everything you need to know before you fly with us.</p>
            <div className="border-edge bg-elevated mt-4 hidden w-full max-w-xs flex-col gap-3 rounded-3xl border p-6 shadow-sm lg:flex">
              <span className="bg-primary-50 text-primary-700 flex size-11 items-center justify-center rounded-2xl">
                <MessageSquare className="size-5" aria-hidden />
              </span>
              <p className="text-body font-bold">Still have questions?</p>
              <p className="text-body-m text-content-secondary">Our crew answers every transmission within one business day.</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {transmissions.map((transmission, index) => (
              <CommsItem key={transmission.question} index={index + 1} {...transmission} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
