import { Reveal } from "./reveal";

export function Products() {
  return (
    <section id="what" className="bg-bg">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
            Two products. One smarter network.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            ySpace connects the sky and the street. Drones take the last mile
            off Lagos traffic. Route Intelligence keeps every bike, van and
            truck already on the road on a better path.
          </p>

          <div className="mt-16 grid gap-12 border-t border-line pt-12 md:grid-cols-[1fr_1px_1fr] md:gap-16">
            <article>
              <h3 className="text-xl font-semibold">Drone Delivery</h3>
              <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted">
                Point-to-point autonomous flights. Up to 5 kg. Fully insured.
                A courier box under the airframe — not another motorcycle in
                the jam.
              </p>
              <a
                href="#send"
                className="mt-6 inline-block border-b border-line-strong pb-0.5 text-sm font-medium hover:border-fg"
              >
                Send a Package →
              </a>
            </article>
            <div className="hidden bg-line md:block" />
            <article>
              <h3 className="text-xl font-semibold">Route Intelligence</h3>
              <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-muted">
                Traffic-aware routing for the fleet you already run. Better
                ETAs, fewer dead miles, a decision you can trust — not another
                map pin.
              </p>
              <a
                href="#enterprise"
                className="mt-6 inline-block border-b border-line-strong pb-0.5 text-sm font-medium hover:border-fg"
              >
                For Businesses →
              </a>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
