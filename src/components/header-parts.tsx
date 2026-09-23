"use client"

import { ChevronDown } from "lucide-react"
import Link from "next/link"

import { Button } from "./ui"
import { cn } from "@/lib"

export type { NavLink } from "@/config"

const linkBase = "text-caption rounded-full px-4 py-2.5 font-semibold transition-colors"

export function NavDropdown({ link }: { link: { label: string; items: { label: string; href: string }[] } }) {
  return (
    <div className="group relative">
      <button type="button" aria-haspopup="true" className={cn(linkBase, "text-content-secondary hover:bg-primary-50 hover:text-content flex items-center gap-1.5")}>
        {link.label}
        <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180" aria-hidden />
      </button>
      <div className="invisible absolute top-full left-0 pt-2 opacity-0 transition-all duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className="border-edge bg-elevated w-56 rounded-2xl border p-1.5 shadow-lg">
          {link.items.map((item) => (
            <Link key={item.href} href={item.href} className="text-content-secondary hover:bg-primary-50 hover:text-content block rounded-xl px-4 py-2.5 font-semibold transition-colors">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SectionNav({ nav, activeHref }: { nav: { label: string; href: string }[]; activeHref: string | null }) {
  return (
    <nav className="hidden lg:block" aria-label="Sections">
      <div className="flex items-center">
        {nav.map((link) => {
          const isActive = activeHref !== null && link.href === activeHref
          return (
            <Link key={link.label} href={link.href} aria-current={isActive ? "true" : undefined} className={cn(linkBase, isActive ? "bg-primary-50 text-primary-700 font-bold" : "text-content-secondary hover:bg-primary-50 hover:text-content")}>
              {link.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export function MobileMenu({ open, onClose, links, checkout }: { open: boolean; onClose: () => void; links: { label: string; href: string }[]; checkout?: boolean }) {
  if (!open) return null
  return (
    <nav className="border-edge bg-elevated mt-2 rounded-3xl border p-4 shadow-lg" aria-label="Primary mobile">
      <div className="flex flex-col">
        {links.map((link) => (
          <Link key={link.label} href={link.href} onClick={onClose} className="text-content block px-3 py-3 font-semibold">
            {link.label}
          </Link>
        ))}
        <div className="border-edge mt-3 flex flex-col gap-2 border-t pt-3">
          <Button href="/signin" variant="outline" onClick={onClose}>
            Sign in
          </Button>
          {checkout ? (
            <Button href="/signin" onClick={onClose}>
              Create Account
            </Button>
          ) : (
            <Button href="/send-package" onClick={onClose}>
              Send a Package
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
