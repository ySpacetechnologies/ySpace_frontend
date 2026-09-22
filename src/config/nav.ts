export type NavLink = {
  label: string
  href: string
  items?: { label: string; href: string }[]
}

export const homeSectionNav: NavLink[] = [
  { label: "Missions", href: "/#missions" },
  { label: "Manifest", href: "/#manifest" },
  { label: "Flight Sequence", href: "/#flight-sequence" },
  { label: "Comms", href: "/#comms" },
  { label: "Deep Space", href: "/#deep-space" },
]

export const marketNav: NavLink[] = [
  {
    label: "Service",
    href: "/marketplace",
    items: [
      { label: "Shop on Marketplace", href: "/marketplace" },
      { label: "Send Packages", href: "/send-package" },
    ],
  },
  { label: "Technology", href: "/technology" },
  { label: "Vendors", href: "/vendors" },
  { label: "Crowdfunding", href: "/crowdfunding" },
  { label: "Company", href: "/company" },
  {
    label: "More",
    href: "/contact",
    items: [
      { label: "Contact Us", href: "/contact" },
      { label: "Careers", href: "/career" },
      { label: "Blog", href: "/blog" },
    ],
  },
]
