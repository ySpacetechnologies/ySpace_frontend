import { Reveal } from "./reveal";

const VEHICLES = ["Motorcycles", "Cars", "Vans", "Trucks"];
const INDUSTRIES = [
  "Logistics",
  "E-commerce",
  "Marketplaces",
  "Retail",
  "Delivery",
  "Transportation",
];

export function Fleet() {
  return (
    <section className="bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-center text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
            Works with every vehicle in your fleet.
          </h2>
          <p className="mt-10 flex flex-wrap justify-center gap-x-3 gap-y-2 text-center text-lg font-medium sm:text-2xl">
            {VEHICLES.map((v, i) => (
              <span key={v} className="inline-flex items-center gap-3">
                {i > 0 && <span className="text-line-strong">/</span>}
                {v}
              </span>
            ))}
          </p>
          <p className="mt-8 flex flex-wrap justify-center gap-x-2 gap-y-2 text-center text-sm text-subtle">
            {INDUSTRIES.map((v, i) => (
              <span key={v} className="inline-flex items-center gap-2">
                {i > 0 && <span className="text-line-strong">·</span>}
                {v}
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
