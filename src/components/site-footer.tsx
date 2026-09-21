import Link from "next/link"
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa6"
import { Container } from "@/components/ui"
import { Logo } from "./logo"

type FooterLink = { label: string; href: string; external?: boolean }

const columns: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Email",
    links: [{ label: "hello@ypace.inc", href: "mailto:hello@ypace.inc", external: true }],
  },
  {
    heading: "Links",
    links: [
      { label: "Services", href: "/marketplace" },
      { label: "Technology", href: "/technology" },
      { label: "Vendors", href: "/vendors" },
      { label: "Crowdfunding", href: "/crowdfunding" },
      { label: "Company", href: "/company" },
    ],
  },
  {
    heading: "More",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Careers", href: "/career" },
      { label: "FAQs", href: "/#faqs" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
]

const socials = [
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn },
  { label: "Twitter", href: "https://twitter.com", icon: FaTwitter },
  { label: "YouTube", href: "https://youtube.com", icon: FaYoutube },
  { label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
]

function FooterColumn({ heading, links }: { heading: string; links: FooterLink[] }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-body-lg text-nv-50 font-semibold">{heading}</span>
      <div className="flex flex-col gap-4">
        {links.map((link) => (
          <Link key={link.label} href={link.href} {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-body text-nv-700 hover:text-nv-50 font-semibold transition-colors">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-neutral-800 pt-10 pb-19.5">
      <Container>
        <div className="flex flex-col items-start justify-between gap-16 lg:flex-row lg:gap-0">
          <Logo />
          <div className="grid grid-cols-2 gap-x-18 gap-y-10 sm:grid-cols-4 lg:gap-x-18">
            {columns.map((column) => (
              <FooterColumn key={column.heading} {...column} />
            ))}
          </div>
        </div>
        <div className="mt-19 flex flex-col gap-5">
          <div aria-hidden className="border-t border-white/32" />
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="text-caption text-nv-50 font-semibold tracking-[-0.002em]">© 2025 ySpace Limited. All rights reserved.</p>
            <div className="flex items-center gap-5.5">
              {socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="border-nv-50/25 text-nv-50 flex size-8.5 items-center justify-center rounded-full border transition-colors hover:bg-white/10">
                  <social.icon className="size-3.5" aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
