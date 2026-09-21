import { Container } from "@/components/ui"

import { FaqItem } from "./faq-item"

const defaultAnswer = "Yspace is a drone-powered delivery and e-commerce platform that connects local businesses and customers. You can shop, send packages, or partner your business — and we'll deliver by drone, straight to your doorstep."

const faqs = [
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

export function FaqsSection() {
  return (
    <section id="faqs" className="bg-warning-50 scroll-mt-20 pt-12 pb-21 lg:pt-37.75">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-21">
          <div className="flex flex-col gap-3 lg:w-136.5">
            <h2 className="text-h2-m md:text-h2 font-bold text-neutral-900">FAQs</h2>
            <p className="text-h3-m md:text-6 font-medium text-neutral-400 md:leading-8 md:tracking-[-0.002em]">Everything You Need to Know</p>
          </div>
          <div className="flex flex-1 flex-col gap-8">
            {faqs.map((faq) => (
              <FaqItem key={faq.question} {...faq} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
