import { useEffect, useRef } from "react";
import { Reveal } from "./reveal";

const STEPS = [
  {
    n: "1",
    title: "Connect",
    body: "Connect your logistics system to ySpace",
  },
  {
    n: "2",
    title: "Analyze",
    body: "ySpace reads your roads, traffic, vehicles and constraints",
  },
  {
    n: "3",
    title: "Optimize",
    body: "Get the recommended route, ETA, alternatives and warnings",
  },
];

export function How() {
  const pathRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const wrap = wrapRef.current;
    if (!path || !wrap) return;
    path.style.strokeDasharray = "800";
    path.style.strokeDashoffset = "800";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          path.style.transition = "stroke-dashoffset 1.2s ease";
          path.style.strokeDashoffset = "0";
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  return (
    <section id="how" className="bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-center text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
            Three steps. Zero disruption.
          </h2>

          <div ref={wrapRef} className="relative mt-16">
            <svg
              className="pointer-events-none absolute left-[10%] top-0 hidden h-1 w-[80%] md:block"
              viewBox="0 0 800 4"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path d="M0,2 L800,2" stroke="#2a2a2a" strokeWidth="1" fill="none" />
              <path
                ref={pathRef}
                d="M0,2 L800,2"
                stroke="#f4f4f5"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>

            <ol className="grid gap-12 pt-6 md:grid-cols-3">
              {STEPS.map((s) => (
                <li key={s.n} className="text-center">
                  <span className="text-sm text-subtle">{s.n}</span>
                  <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <p className="mt-14 text-center">
            <a
              href="#cta"
              className="inline-flex h-11 items-center border border-fg px-6 text-sm font-medium transition-opacity duration-150 hover:opacity-85"
            >
              Explore Enterprise
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
