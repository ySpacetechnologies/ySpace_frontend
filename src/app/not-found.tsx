import Link from "next/link"
import { Button, Container } from "@/components"

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-caption text-content-brand font-semibold tracking-widest uppercase">404</p>
      <h1 className="md:text-h2 mt-3 text-[24px] leading-10.5 font-bold tracking-[-0.4px]">This page took a different route</h1>
      <p className="text-body-lg text-content-secondary mt-4 max-w-md">The page you are looking for does not exist or has been moved.</p>
      <Button href="/" className="mt-8">
        Back to Home
      </Button>
      <Link href="/contact" className="text-body text-content-brand mt-6 font-medium hover:underline">
        Contact support
      </Link>
    </Container>
  )
}
