import Image from "next/image"
import type { StaticImageData } from "next/image"

export type CategoryCardProps = {
  title: string
  description: string
  image: StaticImageData
}

export function CategoryCard({ title, description, image }: CategoryCardProps) {
  return (
    <article className="border-nv-800 flex flex-col overflow-hidden rounded-lg border-[0.5px] pb-[27px] backdrop-blur-sm">
      <Image src={image} alt={title} className="aspect-[367/404] w-full object-cover" />
      <div className="mt-4 flex flex-col gap-3 px-4">
        <h3 className="text-h3-m text-warning-100 md:text-h4 font-bold">{title}</h3>
        <p className="text-body-m text-warning-200 md:text-body font-normal">{description}</p>
      </div>
    </article>
  )
}
