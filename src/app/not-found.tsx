import Link from "next/link"
import { Button, Container } from "@/components"
import { Starfield } from "@/components/starfield"

export default function NotFound() {
  return (
    <div className="bg-inverse text-inverse relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center">
      <Starfield />
      <Container className="relative flex flex-col items-center py-24">
        <p className="text-caption text-primary-100 font-semibold tracking-widest uppercase">404 — off-nominal trajectory</p>
        <h1 className="text-h1-m md:text-h1 mt-4">Signal lost</h1>
        <p className="text-body-lg-m md:text-body-lg mt-4 max-w-md text-white/80">This page took a different route. The drone circled twice and came back empty.</p>
        <Button href="/" className="mt-8">
          Return to base
        </Button>
        <Link href="/contact" className="text-caption text-primary-100 hover:text-primary-50 mt-6 font-semibold tracking-widest uppercase underline decoration-2 underline-offset-4 transition-colors">
          Contact support
        </Link>
      </Container>
    </div>
  )
}
