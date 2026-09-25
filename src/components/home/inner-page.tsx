import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Nav } from "./nav";
import { Footer } from "./footer";

export function InnerPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-svh bg-bg text-fg">
      <Nav />
      <article className="mx-auto max-w-2xl px-5 pb-24 pt-28 sm:px-8">
        <Link to="/" className="text-sm text-muted hover:text-fg">
          ← ySpace
        </Link>
        <h1 className="mt-8 text-3xl font-semibold tracking-tight">{title}</h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted">{children}</div>
      </article>
      <Footer />
    </main>
  );
}
