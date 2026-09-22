import Link from "next/link"
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa6"
import { Container } from "@/components/ui"
import { Starfield } from "@/components/starfield"
import { Logo } from "./logo"

type FooterLink = { label: string; href: string; external?: boolean }

const columns: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Services",
    links: [
      { label: "Send a Package", href: "/send-package" },
      { label: "For Businesses", href: "/vendors" },
      { label: "Marketplace", href: "/marketplace" },
      { label: "Photography & Videography", href: "/photography" },
      { label: "Drone Service & Repairs", href: "/drone-repairs" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Technology", href: "/technology" },
      { label: "Crowdfunding", href: "/crowdfunding" },
      { label: "Careers", href: "/career" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/#comms" },
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
      <span className="text-primary-100 text-caption font-bold tracking-widest uppercase">{heading}</span>
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <Link key={link.label} href={link.href} {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-caption text-white/75 transition-colors hover:text-white">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-neutral-900 pt-16 pb-10 text-white">
      <Starfield className="opacity-60" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="flex flex-col items-start gap-6">
            <Logo />
            <p className="text-body-lg max-w-md text-white/90">
              Move what matters, <span className="text-primary-100">faster.</span>
            </p>
            <p className="text-caption text-white/60">Yspace — autonomous drone delivery & route intelligence. Lagos, Nigeria.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {columns.map((column) => (
              <FooterColumn key={column.heading} {...column} />
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-5">
          <div aria-hidden className="border-t border-white/15" />
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="text-caption text-white/60">© 2025 ySpace Limited. All rights reserved.</p>
            <p className="text-caption text-white/60">
              System status: <span className="text-success-100">All systems nominal</span>
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="hover:border-primary-100 hover:text-primary-100 flex size-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors">
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
