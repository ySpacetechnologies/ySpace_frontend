import Image from "next/image"
import Link from "next/link"
import type { StaticImageData } from "next/image"

export type SolutionCardProps = {
  title: string
  description: string
  image: StaticImageData
  href: string
}

export function SolutionCard({ title, description, image, href }: SolutionCardProps) {
  return (
    <article className="relative flex min-h-120 flex-col justify-end overflow-hidden rounded-lg p-8 py-16 lg:min-h-152">
      <Image src={image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
      <div aria-hidden className="absolute inset-0 bg-black/45" />
      <div className="relative flex flex-col items-start gap-10">
        <div className="flex flex-col gap-3 py-2.5">
          <h3 className="text-h3-m text-nv-100 md:text-8 font-bold md:leading-10.5 md:tracking-[-0.004em]">{title}</h3>
          <p className="text-body-m text-nv-500 md:text-body-lg font-normal md:leading-6 md:font-medium">{description}</p>
        </div>
        <Link href={href} className="text-body-lg-m border-nv-100 text-nv-50 md:text-body-lg flex h-[62px] items-center justify-center rounded-sm border px-6 font-medium transition-colors hover:bg-white/10">
          Learn More
        </Link>
      </div>
    </article>
  )
}
