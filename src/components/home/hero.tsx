export function Hero() {
  return (
    <section id="hero" className="relative h-svh min-h-[640px] overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/videos/hero-poster.jpg"
      >
        <source src="/videos/hero-drone.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-20 pt-24 sm:px-8 sm:pb-24">
        <p className="mb-4 text-sm tracking-wide text-muted">
          Delivering across Lagos
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-6xl">
          Move what matters, faster.
        </h1>
        <p className="mt-4 max-w-lg text-base text-muted sm:text-lg">
          Autonomous drone delivery. Intelligent routing for business.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#send"
            className="inline-flex h-11 min-w-44 items-center justify-center bg-fg px-6 text-sm font-medium text-bg transition-opacity duration-150 hover:opacity-85"
          >
            Send a Package
          </a>
          <a
            href="#enterprise"
            className="inline-flex h-11 min-w-44 items-center justify-center border border-fg px-6 text-sm font-medium text-fg transition-opacity duration-150 hover:opacity-85"
          >
            For Businesses
          </a>
        </div>
      </div>
    </section>
  );
}
