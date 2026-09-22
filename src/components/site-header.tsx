"use client"
import { ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { Button, Logo } from "@/components"
import { homeSectionNav, marketNav, type NavLink } from "@/config"
import { cn } from "@/lib"

export type SiteHeaderVariant = "market" | "checkout"

const linkBase = "text-caption rounded-full px-4 py-2.5 font-semibold transition-colors"

function NavDropdown({ link }: { link: NavLink }) {
  return (
    <div className="group relative">
      <button type="button" aria-haspopup="true" className={cn(linkBase, "text-content-secondary hover:bg-primary-50 hover:text-content flex items-center gap-1.5")}>
        {link.label}
        <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180" aria-hidden />
      </button>
      <div className="invisible absolute top-full left-0 pt-2 opacity-0 transition-all duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className="border-edge bg-elevated w-56 rounded-2xl border p-1.5 shadow-lg">
          {link.items?.map((item) => (
            <Link key={item.href} href={item.href} className="text-content-secondary hover:bg-primary-50 hover:text-content block rounded-xl px-4 py-2.5 font-semibold transition-colors">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SiteHeader({ variant = "market" }: { variant?: SiteHeaderVariant }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openMenus, setOpenMenus] = useState<string[]>([])
  const isHome = pathname === "/" && variant !== "checkout"
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const nav = isHome ? homeSectionNav : marketNav

  // Scroll-spy: highlight the home section currently in view. The state is
  // only read while on the home page, so no reset is needed when leaving.
  useEffect(() => {
    if (!isHome) {
      return
    }
    const sections = homeSectionNav
      .map((link) => link.href.replace("/#", ""))
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)
    if (sections.length === 0) {
      return
    }
    const spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    )
    sections.forEach((section) => spy.observe(section))
    return () => spy.disconnect()
  }, [isHome])

  function toggleMenu(label: string) {
    setOpenMenus((current) => (current.includes(label) ? current.filter((item) => item !== label) : [...current, label]))
  }

  return (
    <header className="fixed inset-x-0 top-3 z-40 md:top-5">
      <div className="mx-auto w-[92%] max-w-[1180px] lg:w-[80%]">
        <div className="border-edge bg-elevated/95 rounded-3xl border shadow-lg backdrop-blur-md">
          <div className="flex h-16 items-center justify-between gap-4 px-4 md:h-18 md:px-6">
            <Logo dark={false} />

            {variant !== "checkout" ? (
              <nav className="hidden lg:block" aria-label="Primary">
                <div className="flex items-center">
                  {nav.map((link) => {
                    const isActive = isHome ? link.href === `/#${activeSection}` : pathname === link.href
                    return link.items ? (
                      <NavDropdown key={link.label} link={link} />
                    ) : (
                      <Link key={link.label} href={link.href} aria-current={isActive ? "true" : undefined} className={cn(linkBase, isActive ? "bg-primary-50 text-primary-700 font-bold" : "text-content-secondary hover:bg-primary-50 hover:text-content")}>
                        {link.label}
                      </Link>
                    )
                  })}
                </div>
              </nav>
            ) : (
              <span className="text-caption text-content-secondary hidden font-semibold lg:block">Send a Package</span>
            )}

            {variant !== "checkout" ? (
              <div className="hidden items-center gap-3 lg:flex">
                <Button href="/signin" variant="ghost">
                  Sign in
                </Button>
                <Button href="/send-package">Send a Package</Button>
              </div>
            ) : (
              <Link href="/contact" className="text-caption text-content-secondary hover:text-content-brand hidden font-semibold transition-colors lg:block">
                Need help? Contact support
              </Link>
            )}

            {variant !== "checkout" ? (
              <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle menu" className="bg-primary-50 text-content flex size-10 items-center justify-center rounded-full lg:hidden">
                {menuOpen ? <X className="size-5" strokeWidth={2} aria-hidden /> : <Menu className="size-5" strokeWidth={2} aria-hidden />}
              </button>
            ) : null}
          </div>
        </div>

        {menuOpen && variant !== "checkout" ? (
          <nav className="border-edge bg-elevated mt-2 rounded-3xl border p-4 shadow-lg" aria-label="Primary mobile">
            <div className="flex flex-col">
              {nav.map((link) =>
                link.items ? (
                  <div key={link.label}>
                    <button type="button" onClick={() => toggleMenu(link.label)} aria-expanded={openMenus.includes(link.label)} className="text-content text-caption flex w-full items-center justify-between px-3 py-3 font-semibold">
                      {link.label}
                      <ChevronDown className={cn("size-4 transition-transform duration-200", openMenus.includes(link.label) && "rotate-180")} aria-hidden />
                    </button>
                    {openMenus.includes(link.label) ? (
                      <div className="border-edge ml-4 border-l pl-3">
                        {link.items.map((item) => (
                          <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="text-content-secondary hover:text-content-brand block px-3 py-2.5 font-semibold transition-colors">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="text-content block px-3 py-3 font-semibold">
                    {link.label}
                  </Link>
                ),
              )}
              <div className="border-edge mt-3 flex flex-col gap-2 border-t pt-3">
                <Button href="/signin" variant="outline">
                  Sign in
                </Button>
                <Button href="/send-package">Send a Package</Button>
              </div>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  )
}
