import { Container } from "@/components/ui"
import { work1, work2, work3, work4 } from "@public/index"
import { WorkStep } from "./work-step"

const steps = [
  {
    title: "Shop or Send",
    description: "Browse your favorite stores or send your own package through the Yspace platform. Choose what you need, add it to your cart, or schedule a pickup",
    image: work1,
  },
  {
    title: "Drone Takes Off",
    description: "Once confirmed, the nearest drone is automatically dispatched. It picks up your order and flies the fastest route to your location.",
    image: work2,
    reverse: true,
  },
  {
    title: "Track in Real Time",
    description: "Stay updated every second. You can view your drone's location, estimated arrival, and drop-off time — all live on the map.",
    image: work3,
  },
  {
    title: "Delivered to Your Doorstep",
    description: "The drone lands safely at the designated drop zone — your item arrives intact and on time.",
    image: work4,
    reverse: true,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-page scroll-mt-20 pt-12 pb-21">
      <Container>
        <div className="flex flex-col items-center gap-12 lg:gap-30">
          <div className="flex max-w-222.5 flex-col items-center gap-3 text-center">
            <h2 className="text-h2-m md:text-h2 font-bold text-neutral-900">How Yspace Works</h2>
            <p className="text-h3-m md:text-6 font-medium text-neutral-400 md:leading-8 md:tracking-[-0.002em]">From order to doorstep — our drones make delivery seamless, fast, and reliable.</p>
          </div>
          <div className="relative mx-auto flex w-full max-w-313.75 flex-col gap-20 lg:gap-30">
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-1.25 -translate-x-1/2 md:block">
              <div className="bg-nv-600 h-full w-full rounded-full" />
              <div className="bg-primary-900 scroll-fill absolute inset-0 w-full rounded-full" />
            </div>
            {steps.map((step) => (
              <WorkStep key={step.title} {...step} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
