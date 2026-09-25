import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Drop reel — the clip starts as a contained 16:9 frame sitting on the page
 * (no crop) and opens out to full-bleed as you scroll through the runway,
 * so the footage is driven by the page instead of pasted onto it.
 */
export function DropReel() {
  const [reduced, setReduced] = useState(false);

  const runwayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const runway = runwayRef.current;
    const stage = stageRef.current;
    const frame = frameRef.current;
    if (!runway || !stage || !frame) return;

    let ticking = 0;

    const apply = () => {
      ticking = 0;
      const vw = stage.clientWidth;
      const vh = stage.clientHeight;
      if (!vw || !vh) return;

      let restW = Math.min(1152, vw - (vw < 640 ? 32 : 48));
      let restH = (restW * 9) / 16;
      const maxH = vh * 0.62;
      if (restH > maxH) {
        restH = maxH;
        restW = (restH * 16) / 9;
      }

      let raw = 1;
      if (!reduced) {
        const rect = runway.getBoundingClientRect();
        const span = rect.height - vh;
        raw = span > 0 ? clamp01(-rect.top / span) : 0;
      }
      const e = reduced ? 1 : easeOutCubic(raw);

      frame.style.width = `${lerp(restW, vw, e)}px`;
      frame.style.height = `${lerp(restH, vh, e)}px`;
      frame.style.borderRadius = `${lerp(10, 0, clamp01(e * 1.8))}px`;
      frame.style.transform = `translateY(${lerp(14, 0, e)}px)`;

      if (edgeRef.current) edgeRef.current.style.opacity = `${clamp01(1 - e * 2.4)}`;
      if (scrimRef.current) scrimRef.current.style.opacity = `${clamp01((e - 0.3) / 0.5)}`;

      const t = clamp01((e - 0.5) / 0.4);
      if (copyRef.current) {
        copyRef.current.style.opacity = `${t}`;
        copyRef.current.style.transform = `translateY(${lerp(16, 0, t)}px)`;
      }
      if (labelRef.current) {
        labelRef.current.style.opacity = `${clamp01(1 - e * 3.5)}`;
        labelRef.current.style.top = `${Math.round(vh / 2 + restH / 2 + 18)}px`;
      }
      if (hintRef.current) hintRef.current.style.opacity = `${clamp01(1 - raw * 8)}`;
      if (railRef.current) railRef.current.style.transform = `scaleX(${raw})`;
    };

    const schedule = () => {
      if (!ticking) ticking = window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    const io = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.01 },
    );
    io.observe(runway);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      io.disconnect();
      if (ticking) window.cancelAnimationFrame(ticking);
    };
  }, [reduced]);

  return (
    <section aria-label="Drop sequence" className="relative bg-bg">
      <div
        ref={runwayRef}
        className={cn("relative", reduced ? "h-svh" : "h-[230vh]")}
      >
        <div
          ref={stageRef}
          className="sticky top-0 flex h-svh items-center justify-center overflow-hidden"
        >
          <figure
            ref={frameRef}
            style={{ willChange: "width, height" }}
            className="relative aspect-video w-[min(1152px,92vw)] overflow-hidden bg-field"
          >
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/videos/drop-poster.jpg"
            >
              <source src="/videos/drop-drone.mp4" type="video/mp4" />
            </video>

            <div
              ref={scrimRef}
              className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent opacity-0"
            />
            <div
              ref={edgeRef}
              className="pointer-events-none absolute inset-0 rounded-[inherit] border border-line-strong"
            />

            <figcaption
              ref={copyRef}
              className="absolute inset-x-0 bottom-0 z-10 p-6 opacity-0 sm:p-10"
            >
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-muted">
                Drop sequence
              </p>
              <p className="mt-3 max-w-lg text-xl font-medium leading-[1.25] tracking-[-0.015em] text-fg sm:text-3xl">
                Package under the airframe, courtyard approach.
              </p>
            </figcaption>
          </figure>

          <div
            ref={labelRef}
            className="pointer-events-none absolute left-1/2 z-10 w-[min(1152px,92vw)] -translate-x-1/2 text-[0.78rem] leading-relaxed text-subtle"
          >
            Drop sequence — package under airframe, courtyard approach
          </div>

          <div
            ref={hintRef}
            className="pointer-events-none absolute inset-x-0 bottom-7 z-10 flex justify-center"
          >
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-subtle">
              Scroll
            </span>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-line">
            <div
              ref={railRef}
              className="h-full origin-left scale-x-0 bg-fg/60"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
