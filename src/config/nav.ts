export type NavLink = {
  label: string
  href: string
  items?: { label: string; href: string }[]
}

/**
 * Site-header rule: the header only ever shows links to sections of the page
 * it's on — never links to other pages. All page navigation lives in the
 * footer (Company / Products / Services / Legal columns).
 */

export const homeSectionNav: NavLink[] = [
  { label: "What we do", href: "/#what-yspace-does" },
  { label: "Delivery", href: "/#send-package" },
  { label: "Enterprise", href: "/#route-intelligence" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "The Future", href: "/#deep-space" },
]

export const photographyNav: NavLink[] = [
  { label: "What we cover", href: "/photography#coverage" },
  { label: "Book a service", href: "/photography#booking" },
]

export const droneRepairsNav: NavLink[] = [
  { label: "Services", href: "/drone-repairs#services" },
  { label: "Request repair", href: "/drone-repairs#repair" },
]
