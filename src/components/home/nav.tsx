import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#what", label: "What we do" },
  { href: "#send", label: "Delivery" },
  { href: "#enterprise", label: "Enterprise" },
  { href: "#how", label: "How it works" },
  { href: "#future", label: "The Future" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-16 transition-[background,border-color] duration-200",
          scrolled ? "border-b border-line bg-bg" : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#hero" aria-label="ySpace home">
            <Logo />
          </a>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 gap-7 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted transition-colors duration-150 hover:text-fg"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href="#send"
              className="hidden text-sm text-muted transition-colors duration-150 hover:text-fg sm:inline"
            >
              Sign in
            </a>
            <a
              href="#send"
              className="hidden h-9 items-center bg-fg px-4 text-sm font-medium text-bg transition-opacity duration-150 hover:opacity-85 sm:inline-flex"
            >
              Send a Package
            </a>
            <button
              type="button"
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={cn(
                  "block h-px w-5 bg-fg transition-transform duration-200",
                  open && "translate-y-[4px] rotate-45",
                )}
              />
              <span className={cn("block h-px w-5 bg-fg", open && "opacity-0")} />
              <span
                className={cn(
                  "block h-px w-5 bg-fg transition-transform duration-200",
                  open && "-translate-y-[4px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center gap-7 bg-bg transition-opacity duration-200 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-2xl font-medium"
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#send"
          className="mt-4 inline-flex h-11 items-center bg-fg px-6 text-sm font-medium text-bg"
          onClick={() => setOpen(false)}
        >
          Send a Package
        </a>
      </div>
    </>
  );
}
