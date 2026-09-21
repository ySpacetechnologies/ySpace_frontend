import Image from "next/image"
import { FaApple, FaGooglePlay } from "react-icons/fa6"
import { Container } from "@/components/ui"
import { homeBg } from "@public/index"
import { OrbitHighlight } from "./orbit-highlight"
import { StoreButton } from "./store-button"

export function Hero() {
  return (
    <section className="relative flex min-h-160 items-center overflow-hidden md:min-h-190">
      <Image src={homeBg} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="from-inverse/10 via-inverse/35 to-inverse/65 absolute inset-0 bg-linear-to-b" />
      <Container className="relative flex justify-center py-32 md:py-40">
        <div className="relative flex max-w-243.5 flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="text-h1-m text-nv-100 md:text-h1 font-bold text-balance">
              <OrbitHighlight>Shop locally.</OrbitHighlight> Get it delivered <br className="hidden md:inline" /> Instantly
            </h1>
            <p className="text-body-lg-m text-nv-500 md:text-6 max-w-238.5 font-medium text-pretty md:leading-8 md:tracking-[-0.002em]">From food to gadgets and more, shop as a boss and get it delivered right to your doorstep — fast, and safe, all powered by drone.</p>
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5.25">
            <StoreButton href="https://play.google.com/store" icon={<FaGooglePlay className="size-5" aria-hidden />} label="Download on Google Play" />
            <StoreButton href="https://www.apple.com/app-store/" icon={<FaApple className="size-6" aria-hidden />} label="Download on Apple Store" />
          </div>
        </div>
      </Container>
    </section>
  )
}
