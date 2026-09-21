import Image from "next/image"
import type { StaticImageData } from "next/image"

import { cn } from "@/lib"

export type WorkStepProps = {
  title: string
  description: string
  image: StaticImageData
  reverse?: boolean
}

export function WorkStep({ title, description, image, reverse }: WorkStepProps) {
  return (
    <div className="md:grid md:grid-cols-[1fr_auto_1fr] md:items-center">
      <div className={cn("flex max-w-110.75 flex-col gap-4 max-md:mx-auto max-md:p-2.5 md:px-10 lg:px-0", reverse ? "md:order-3 lg:justify-self-end" : "md:order-1 lg:justify-self-start")}>
        <h3 className="text-h3-m md:text-8 font-bold text-neutral-900 md:leading-10.5 md:tracking-[-0.004em]">{title}</h3>
        <p className="text-h3-m md:text-6 font-medium text-neutral-300 md:leading-8 md:tracking-[-0.002em]">{description}</p>
      </div>
      <div aria-hidden className="relative hidden w-1.25 md:order-2 md:block md:self-stretch">
        <span className="bg-primary-900 border-page scroll-dot absolute top-0 left-1/2 z-10 size-5.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4" />
      </div>
      <Image src={image} alt="" className={cn("w-full max-w-106.5 object-contain max-md:mx-auto", reverse ? "md:order-1 lg:justify-self-start" : "md:order-3 lg:justify-self-end")} />
    </div>
  )
}
