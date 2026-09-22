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
    <section className={cn("bg-page border-edge border-b py-20 md:py-28", className)}>
      <Container>
        <div className="border-edge bg-elevated rounded-3xl border shadow-lg">
          <div className="border-edge flex items-center justify-between border-b px-6 py-4 md:px-8">
            <span className="text-caption text-content-secondary uppercase">{eyebrow ?? "ySpace module"}</span>
            <span className="bg-primary-50 text-primary-700 text-caption rounded-full px-3 py-1 font-bold">Coming soon</span>
          </div>
          <div className="px-6 py-12 md:px-10 md:py-16">
            <h1 className="text-h1-m md:text-h1">{title}</h1>
            <p className="text-body-lg-m md:text-body-lg text-content-secondary mt-4 max-w-2xl">{description}</p>
            <div className="border-edge-subtle mt-10 rounded-2xl border-2 border-dashed px-6 py-14 text-center">
              <p className="text-caption text-content-tertiary font-semibold">This module is under construction — check back soon.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
