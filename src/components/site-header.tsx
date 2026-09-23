"use client"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { Logo } from "./logo"
import { MobileMenu, SectionNav } from "./header-parts"
import { Button } from "./ui"
import { droneRepairsNav, homeSectionNav, photographyNav } from "@/config"

export type SiteHeaderVariant = "market" | "checkout"

export function SiteHeader({ variant = "market" }: { variant?: SiteHeaderVariant }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const isHome = pathname === "/" && variant !== "checkout"
  const [activeSection, setActiveSection] = useState<string | null>(null)

  // Header rule: only in-page section links, never other pages.
  const sectionNav = useMemo(() => {
    if (variant === "checkout") return null
    if (isHome) return homeSectionNav
    if (pathname === "/photography") return photographyNav
    if (pathname === "/drone-repairs") return droneRepairsNav
    return null
  }, [variant, isHome, pathname])

  // Scroll-spy on the home page.
  useEffect(() => {
    if (!isHome) return
    const sections = homeSectionNav
      .map((link) => link.href.replace("/#", ""))
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)
    if (sections.length === 0) return
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    )
    sections.forEach((section) => spy.observe(section))
    return () => spy.disconnect()
  }, [isHome])

  const activeHref = isHome ? (activeSection ? `/#${activeSection}` : null) : pathname
  const mobileLinks = variant === "checkout" ? [] : (sectionNav ?? [])

  return (
    <header className="fixed inset-x-0 top-3 z-40 md:top-5">
      <div className="mx-auto w-[92%] max-w-295 lg:w-[80%]">
        <div className="border-edge bg-elevated/95 rounded-3xl border shadow-lg backdrop-blur-md">
          <div className="flex h-16 items-center justify-between gap-4 px-4 md:h-18 md:px-6">
            {/* Left: logo + section nav, never centered */}
            <div className="flex min-w-0 items-center gap-2 lg:gap-6">
              <Logo dark={false} />
              {variant !== "checkout" && sectionNav ? <SectionNav nav={sectionNav} activeHref={activeHref} /> : null}
            </div>

            {/* Right: auth + primary action */}
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-3 lg:flex">
                {variant === "checkout" ? (
                  <>
                    <Button href="/signin" variant="ghost">
                      Sign In
                    </Button>
                    <Button href="/signin">Create Account</Button>
                  </>
                ) : (
                  <>
                    <Button href="/signin" variant="ghost">
                      Sign in
                    </Button>
                    <Button href="/send-package">Send a Package</Button>
                  </>
                )}
              </div>

              <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle menu" className="bg-primary-50 text-content flex size-10 items-center justify-center rounded-full lg:hidden">
                {menuOpen ? <X className="size-5" strokeWidth={2} aria-hidden /> : <Menu className="size-5" strokeWidth={2} aria-hidden />}
              </button>
            </div>
          </div>
        </div>

        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={mobileLinks} checkout={variant === "checkout"} />
      </div>
    </header>
  )
}
