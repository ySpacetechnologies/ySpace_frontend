import { Logo } from "./logo";

const COLS = [
  {
    title: "Company",
    links: [
      { href: "/technology", label: "About ySpace" },
      { href: "/career", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Products",
    links: [
      { href: "/send-package", label: "Send a Package" },
      { href: "/vendors", label: "Route Intelligence" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/photography", label: "Photography & Videography" },
      { href: "/drone-repairs", label: "Drone Repairs" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-3 text-sm leading-relaxed text-subtle">
              Autonomous drone delivery & route intelligence. Lagos, Nigeria.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-12">
            {COLS.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-xs font-medium uppercase tracking-wider text-subtle">
                  {col.title}
                </h4>
                {col.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="mb-2.5 block text-sm text-muted transition-colors hover:text-fg"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex gap-5 text-subtle">
          <Social label="Facebook" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          <a href="#" aria-label="LinkedIn" className="hover:text-fg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <Social
            label="Twitter"
            d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
          />
          <a href="#" aria-label="YouTube" className="hover:text-fg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-fg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 text-xs text-subtle sm:flex-row sm:justify-between">
          <span>© 2026 ySpace Limited. All rights reserved.</span>
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-ok" />
            All systems nominal
          </span>
        </div>
      </div>
    </footer>
  );
}

function Social({ label, d }: { label: string; d: string }) {
  return (
    <a href="#" aria-label={label} className="hover:text-fg">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d={d} />
      </svg>
    </a>
  );
}
