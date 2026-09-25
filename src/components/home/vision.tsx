import { useEffect, useRef } from "react";
import { Reveal } from "./reveal";

const STOPS = [
  "China",
  "ySpace International Hub",
  "High-Speed Transportation",
  "Nigeria",
  "Drone Network",
  "Doorstep",
];

export function Vision() {
  const barRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const wrap = wrapRef.current;
    if (!bar || !wrap) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bar.style.width = "100%";
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  return (
    <section id="future" className="bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-center text-sm italic text-subtle">
            Vision — not bookable today
          </p>
          <h2 className="mt-4 text-center text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
            The future of transportation is faster.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-center text-base leading-relaxed text-muted">
            We are laying the rails for high-speed, cross-continental logistics.
            From an international hub to the last hundred metres by drone.
          </p>

          <div ref={wrapRef} className="mt-16">
            <div className="relative mb-8 h-px bg-line">
              <div
                ref={barRef}
                className="absolute inset-y-0 left-0 w-0 bg-fg shadow-[0_0_8px_rgba(255,255,255,0.35)] transition-[width] duration-[1.5s] ease-out"
              />
            </div>
            <ol className="flex flex-wrap justify-between gap-y-8">
              {STOPS.map((s) => (
                <li key={s} className="flex w-1/3 flex-col items-center gap-2.5 sm:w-auto sm:flex-1">
                  <span className="size-2 rounded-full bg-fg outline outline-1 outline-line-strong" />
                  <span className="max-w-24 text-center text-xs leading-snug text-muted">{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <p className="mt-12 text-center">
            <a
              href="#cta"
              className="border-b border-line-strong pb-0.5 text-base font-medium hover:border-fg"
            >
              Explore Our Vision →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
