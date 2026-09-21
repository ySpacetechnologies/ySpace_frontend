import { Container } from "./ui"
import { cn } from "@/lib"

type PagePlaceholderProps = {
  eyebrow?: string
  title: string
  description: string
  className?: string
}

export function PagePlaceholder({ eyebrow, title, description, className }: PagePlaceholderProps) {
  return (
    <section className={cn("pt-32 pb-20 md:pt-40 md:pb-28", className)}>
      <Container>
        <div className="max-w-3xl">
          {eyebrow ? <p className="text-caption text-content-brand font-semibold tracking-widest uppercase">{eyebrow}</p> : null}
          <h1 className="md:text-h1 mt-3 text-[30px] leading-[50px] font-bold tracking-[-0.5px]">{title}</h1>
          <p className="text-body-lg text-content-secondary mt-4">{description}</p>
        </div>
        <div className="border-edge bg-surface mt-12 flex min-h-72 items-center justify-center rounded-xl border border-dashed px-6 py-14 text-center">
          <p className="text-body text-content-tertiary font-medium">Layout coming from the Figma design</p>
        </div>
      </Container>
    </section>
  )
}
