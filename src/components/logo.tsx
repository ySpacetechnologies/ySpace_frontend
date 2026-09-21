import Image from "next/image"
import Link from "next/link"

import { logoWhite } from "@public/index"
import { cn } from "@/lib"

export function Logo({ className, chip = false }: { className?: string; chip?: boolean }) {
  return (
    <Link href="/" aria-label="ySpace home" className={cn("inline-flex w-fit items-center", chip && "bg-inverse rounded-full", className)}>
      <Image src={logoWhite} alt="ySpace" sizes="100" priority />
    </Link>
  )
}
