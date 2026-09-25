import { Reveal } from "./reveal";

export function FinalCta() {
  return (
    <section id="cta" className="bg-bg px-5 py-28 text-center sm:px-8 sm:py-36">
      <Reveal>
        <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Move what matters, faster.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-muted">
          Autonomous delivery for everyone. Intelligent routing for business.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href="#send"
            className="inline-flex h-11 min-w-44 items-center justify-center bg-fg px-6 text-sm font-medium text-bg transition-opacity duration-150 hover:opacity-85"
          >
            Send a Package
          </a>
          <a
            href="#enterprise"
            className="inline-flex h-11 min-w-44 items-center justify-center border border-fg px-6 text-sm font-medium transition-opacity duration-150 hover:opacity-85"
          >
            For Businesses
          </a>
        </div>
      </Reveal>
    </section>
  );
}
