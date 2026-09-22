import { Container } from "@/components/ui"

const payloads = [
  { code: "PLD-01", name: "Food & Groceries", notes: "Daily essentials from stores and supermarkets near you.", status: "Cleared" },
  { code: "PLD-02", name: "Electronics", notes: "Devices, accessories and consumer tech.", status: "Cleared" },
  { code: "PLD-03", name: "Medications", notes: "Health and wellness items, handled with care.", status: "Cleared" },
  { code: "PLD-04", name: "Fashion", notes: "Apparel and wears from trusted vendors.", status: "Cleared" },
]

export function CargoManifest() {
  return (
    <section id="manifest" className="bg-surface border-edge border-y py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-4">
          <p className="text-caption text-content-brand font-bold tracking-widest uppercase">Cargo manifest</p>
          <h2 className="text-h2-m md:text-h2 max-w-2xl">If it matters, we fly it.</h2>
          <p className="text-body-m text-content-secondary md:text-body max-w-2xl">Everyday payloads accepted for flight — same drone network, same live tracking.</p>
        </div>

        <div className="border-edge bg-elevated mt-12 overflow-hidden rounded-3xl border shadow-md">
          <div className="text-caption text-content-secondary bg-nv-400 hidden gap-4 px-6 py-3.5 font-bold tracking-wider uppercase md:grid md:grid-cols-[110px_1fr_1.2fr_130px]">
            <span>Code</span>
            <span>Payload</span>
            <span>Notes</span>
            <span className="text-right">Status</span>
          </div>
          {payloads.map((payload) => (
            <div key={payload.code} className="border-edge-subtle hover:bg-primary-50/40 flex flex-col gap-2 border-t px-6 py-5 transition-colors first:border-t-0 md:grid md:grid-cols-[110px_1fr_1.2fr_130px] md:items-center md:gap-4">
              <span className="text-caption text-content-brand font-bold">{payload.code}</span>
              <span className="text-body font-bold">{payload.name}</span>
              <span className="text-body-m text-content-secondary">{payload.notes}</span>
              <span className="text-caption text-success-100 bg-success-50 w-fit rounded-full px-3 py-1 font-bold md:justify-self-end">● {payload.status}</span>
            </div>
          ))}
          <div className="text-caption text-content-secondary bg-nv-400 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 px-6 py-3.5 font-semibold">
            <span>Weight class ≤ 5 kg</span>
            <span>Range: city grid</span>
            <span>
              System: <span className="text-success-100 font-bold">Nominal</span>
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}
