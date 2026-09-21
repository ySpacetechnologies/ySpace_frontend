"use client"
import { ChevronDown, Menu, ShoppingCart, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { HiOutlineInbox, HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi2"

import { Button, Container, Logo } from "@/components"
import { homeSectionNav, marketNav, type NavLink } from "@/config"
import { cn } from "@/lib"

export type SiteHeaderVariant = "market" | "checkout"

function NavDropdown({ link }: { link: NavLink }) {
  return (
    <div className="group relative">
      <button type="button" aria-haspopup="true" className="text-body text-content-secondary group-hover:text-content flex items-center gap-1.5 rounded-full px-4 py-2 font-medium transition-colors">
        {link.label}
        <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180" aria-hidden />
      </button>
      <div className="invisible absolute top-full left-0 pt-3 opacity-0 transition-all duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className="bg-elevated border-edge-subtle w-56 rounded-2xl border p-2 shadow-lg">
          {link.items?.map((item) => (
            <Link key={item.href} href={item.href} className="text-body text-content-secondary hover:bg-surface hover:text-content block rounded-xl px-3 py-2.5 font-medium transition-colors">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function CartDropdown({ overHero }: { overHero: boolean }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  const accountLinks = [
    { label: "My Account", href: "/account", icon: <HiOutlineUser className="size-4.5" aria-hidden /> },
    { label: "Orders", href: "/orders", icon: <HiOutlineShoppingBag className="size-4.5" aria-hidden /> },
    { label: "Inbox", href: "/inbox", icon: <HiOutlineInbox className="size-4.5" aria-hidden /> },
  ]

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Cart and account" className={cn("group flex size-11 items-center justify-center border border-transparent transition-all duration-200 hover:rounded-full", overHero ? "text-white hover:border-white/60 hover:bg-white/10" : "text-content hover:border-edge-strong hover:bg-surface")}>
        <ShoppingCart className={cn("size-5 transition-colors", overHero ? "group-hover:text-white/70" : "group-hover:text-content-tertiary")} strokeWidth={1.8} aria-hidden />
      </button>
      {open ? (
        <div className="bg-elevated border-edge-subtle absolute top-full right-0 z-50 mt-3 w-64 rounded-2xl border p-4 shadow-xl">
          <Button href="/signin" className="w-full">
            Sign In
          </Button>
          <div className="border-edge-subtle mt-3 border-t pt-2">
            {accountLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="text-content hover:bg-surface text-body flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium transition-colors">
                <span className="text-content-secondary">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function SiteHeader({ variant = "market" }: { variant?: SiteHeaderVariant }) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openMenus, setOpenMenus] = useState<string[]>([])
  const overHero = pathname === "/" && variant !== "checkout"
  const nav = pathname === "/" && variant !== "checkout" ? homeSectionNav : marketNav

  function toggleMenu(label: string) {
    setOpenMenus((current) => (current.includes(label) ? current.filter((item) => item !== label) : [...current, label]))
  }

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo chip={!overHero} />

        {variant !== "checkout" ? (
          <nav className="hidden lg:block" aria-label="Primary">
            <div className="bg-elevated border-edge-subtle/60 flex w-fit items-center gap-1 rounded-full border p-1.5 shadow-sm">
              {nav.map((link) =>
                link.items ? (
                  <NavDropdown key={link.label} link={link} />
                ) : (
                  <Link key={link.label} href={link.href} className={cn("text-body rounded-full px-4 py-2 font-medium transition-colors", pathname === link.href ? "text-content font-semibold" : "text-content-secondary hover:text-content")}>
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          </nav>
        ) : (
          <span className="text-body text-content-secondary hidden font-semibold lg:block">Send a Package</span>
        )}

        {variant !== "checkout" ? (
          <div className="hidden lg:block">
            <CartDropdown overHero={overHero} />
          </div>
        ) : (
          <Link href="/contact" className="text-body text-content-secondary hover:text-content hidden font-medium transition-colors lg:block">
            Need help? Contact support
          </Link>
        )}

        {variant !== "checkout" ? (
          <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle menu" className={cn("flex size-11 items-center justify-center rounded-full border transition-colors lg:hidden", overHero ? "border-white/40 text-white hover:bg-white/10" : "border-edge text-content hover:bg-surface")}>
            {menuOpen ? <X className="size-6" strokeWidth={1.8} aria-hidden /> : <Menu className="size-6" strokeWidth={1.8} aria-hidden />}
          </button>
        ) : null}
      </Container>

      {menuOpen && variant !== "checkout" ? (
        <nav className="bg-elevated border-edge-subtle border-t shadow-lg lg:hidden" aria-label="Primary mobile">
          <Container className="flex flex-col gap-1 py-4">
            {" "}
            {nav.map((link) =>
              link.items ? (
                <div key={link.label}>
                  <button type="button" onClick={() => toggleMenu(link.label)} aria-expanded={openMenus.includes(link.label)} className="text-body text-content-secondary hover:bg-surface hover:text-content flex w-full items-center justify-between rounded-md px-3 py-2.5 font-medium transition-colors">
                    {link.label}
                    <ChevronDown className={cn("size-4 transition-transform duration-200", openMenus.includes(link.label) && "rotate-180")} aria-hidden />
                  </button>
                  {openMenus.includes(link.label) ? (
                    <div className="border-edge-subtle ml-4 border-l pl-3">
                      {link.items.map((item) => (
                        <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="text-caption text-content-secondary hover:bg-surface hover:text-content block rounded-md px-3 py-2 font-medium transition-colors">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="text-body text-content-secondary hover:bg-surface hover:text-content block rounded-md px-3 py-2.5 font-medium transition-colors">
                  {link.label}
                </Link>
              ),
            )}
            <Button href="/send-package" className="mt-3">
              Send a Package
            </Button>
          </Container>
        </nav>
      ) : null}
    </header>
  )
}
