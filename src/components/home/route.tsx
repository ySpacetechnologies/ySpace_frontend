import { Reveal } from "./reveal";
import { RouteCanvas } from "./route-canvas";

const FEATURES = [
  "Route optimization",
  "Traffic-aware routing",
  "ETA prediction",
  "Alternative routes",
  "API / SDK integration",
];

export function RouteIntel() {
  return (
    <section id="enterprise" className="bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-center text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
            Not another map. A decision you can trust.
          </h2>

          <div className="mt-12 overflow-hidden border border-line bg-field">
            <RouteCanvas />
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-sm text-subtle">Recommended route</p>
              <p className="mt-1 text-lg font-medium">41 min · 18.2 km</p>
              <span className="mt-2 inline-block border border-fg px-2 py-0.5 text-xs">
                Best
              </span>
            </div>
            <div>
              <p className="text-sm text-subtle">Alternative</p>
              <p className="mt-1 text-lg font-medium text-muted">49 min · 16.5 km</p>
            </div>
          </div>
          <p className="mt-5 text-sm text-subtle">
            Recommended because current traffic makes the shorter route ~8 minutes slower.
          </p>

          <p className="mt-12 flex flex-wrap justify-center gap-x-2 gap-y-2 text-center text-sm text-muted">
            {FEATURES.map((f, i) => (
              <span key={f} className="inline-flex items-center gap-2">
                {i > 0 && <span className="text-line-strong">·</span>}
                {f}
              </span>
            ))}
          </p>

          <p className="mt-10 text-center">
            <a
              href="#cta"
              className="border-b border-line-strong pb-0.5 text-base font-medium hover:border-fg"
            >
              Explore Enterprise →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
