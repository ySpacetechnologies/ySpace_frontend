import Image from "next/image"

import { tmotor } from "@public/index"

const COPIES = 12

function BannerTrack({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {Array.from({ length: COPIES }, (_, index) => (
        <span key={index} className="flex shrink-0 items-center px-10">
          <Image src={tmotor} alt="" width={188} height={74} className="h-14 w-auto md:h-[74px]" />
        </span>
      ))}
    </div>
  )
}

export function BannerMarquee() {
  return (
    <section aria-label="ySpace delivery banner" className="bg-warning-50 overflow-hidden py-10 md:py-14">
      <div className="animate-marquee flex w-max motion-reduce:animate-none">
        <BannerTrack />
        <BannerTrack hidden />
      </div>
    </section>
  )
}
