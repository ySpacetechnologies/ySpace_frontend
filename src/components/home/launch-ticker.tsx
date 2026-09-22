const ITEMS = ["Drone delivery", "Route intelligence", "Cargo manifest open", "Next window: now", "Move what matters, faster."]
const COPIES = 12

function TickerTrack({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {Array.from({ length: COPIES }, (_, index) => (
        <span key={index} className="flex shrink-0 items-center">
          <span className="text-body-lg px-6 font-semibold text-white/90">{ITEMS[index % ITEMS.length]}</span>
          <span aria-hidden className="bg-primary-300 size-2 shrink-0 rounded-full" />
        </span>
      ))}
    </div>
  )
}

export function LaunchTicker() {
  return (
    <section aria-label="ySpace capabilities" className="overflow-hidden border-y border-white/10 bg-neutral-900 py-4">
      <div className="animate-marquee flex w-max motion-reduce:animate-none">
        <TickerTrack />
        <TickerTrack hidden />
      </div>
    </section>
  )
}
