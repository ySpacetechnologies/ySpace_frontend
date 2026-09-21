import { Container } from "@/components/ui"
import { SolutionCard } from "./solution-card"
import { solution1, solution2, solution3 } from "@public/index"

const solutions = [
  {
    title: "Shop on Marketplace",
    description: "Discover local vendors, explore categories, and order what you need — from food to tech. Delivered by drone, right to your doorstep.",
    image: solution1,
    href: "/marketplace",
  },
  {
    title: "Send Packages Instantly",
    description: "Need to get something across town? Book a drone, drop it off, and track it live as it flies to the destination",
    image: solution2,
    href: "/send-package",
  },
  {
    title: "Partner your Business",
    description: "Join Yspace to reach more customers and get your products delivered by drone within minutes.",
    image: solution3,
    href: "/vendors",
  },
]

export function TopNotchSection() {
  return (
    <section id="top-notch" className="bg-page scroll-mt-20 pt-12 pb-21">
      <Container>
        <div className="flex flex-col items-center gap-12 lg:gap-21">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="text-h2-m md:text-h2 font-bold text-neutral-900">Only Top notch Solution.</h2>
            <p className="text-h3-m md:text-6 font-medium text-neutral-300 md:leading-8 md:tracking-[-0.002em]">Experience the future of delivery with our cutting-edge drone technology</p>
          </div>
          <div className="grid w-full gap-10 lg:grid-cols-3 lg:gap-14">
            {solutions.map((solution) => (
              <SolutionCard key={solution.href} {...solution} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
