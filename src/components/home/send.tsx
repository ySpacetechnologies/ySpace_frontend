import { type FormEvent, useState } from "react";
import { Reveal } from "./reveal";

const TYPES = ["Document", "Parcel", "Fragile", "Food"];

export function Send() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [weight, setWeight] = useState("");
  const [kind, setKind] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{
    eta: string;
    distance: string;
    cost: string;
  } | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setResult({ eta: "Calculating…", distance: "—", cost: "—" });
    window.setTimeout(() => {
      const kg = Number.parseFloat(weight) || 1;
      const seed = pickup.length + drop.length + kg * 10;
      const km = 4 + (seed % 14) + kg * 0.4;
      const eta = Math.max(9, Math.round(km * 1.6 + (kind === "Fragile" ? 4 : 0)));
      const cost = Math.round(1200 + km * 180 + kg * 250);
      setResult({
        eta: `${eta} min`,
        distance: `${km.toFixed(1)} km`,
        cost: `₦${cost.toLocaleString()}`,
      });
      setBusy(false);
    }, 900);
  }

  return (
    <section id="send" className="bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">
                From your hands to their doorstep.
              </h2>
              <ul className="mt-10 space-y-3 text-[0.95rem] text-muted">
                <li>— Estimate in seconds, no account needed</li>
                <li>— Up to 5 kg per delivery</li>
                <li>— Every delivery insured</li>
              </ul>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <input
                required
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Pickup location — e.g. Ikeja GRA"
                className="h-12 border border-line-strong bg-field px-4 text-sm text-fg outline-none placeholder:text-subtle focus:border-subtle"
              />
              <input
                required
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                placeholder="Drop-off location — e.g. Lekki Phase 1"
                className="h-12 border border-line-strong bg-field px-4 text-sm text-fg outline-none placeholder:text-subtle focus:border-subtle"
              />
              <input
                required
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Weight (kg)"
                inputMode="decimal"
                className="h-12 border border-line-strong bg-field px-4 text-sm text-fg outline-none placeholder:text-subtle focus:border-subtle"
              />
              <select
                required
                value={kind}
                onChange={(e) => setKind(e.target.value)}
                className="h-12 appearance-none border border-line-strong bg-field px-4 text-sm text-fg outline-none focus:border-subtle"
              >
                <option value="" disabled>
                  Package type
                </option>
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                disabled={busy}
                className="mt-1 h-12 w-full bg-fg text-sm font-medium text-bg transition-opacity duration-150 hover:opacity-85 disabled:opacity-60"
              >
                Get Delivery Estimate
              </button>

              {result && (
                <div className="mt-2 border border-line p-5">
                  {(
                    [
                      ["ETA", result.eta],
                      ["Distance", result.distance],
                      ["Cost", result.cost],
                      ["Insurance", "Included"],
                    ] as const
                  ).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between border-b border-line py-2.5 text-sm last:border-0"
                    >
                      <span className="text-subtle">{k}</span>
                      <strong className="font-medium">{v}</strong>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
