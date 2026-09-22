import Image from "next/image"
import Link from "next/link"

import { logoWhite } from "@public/index"
import { cn } from "@/lib"

/**
 * Brand logo mark. Dark surfaces use the white mark as-is;
 * light surfaces invert it to black for contrast.
 */
export function Logo({ className, dark = true }: { className?: string; dark?: boolean }) {
  return (
    <Link href="/" aria-label="ySpace home" className={cn("inline-flex w-fit items-center", className)}>
      <Image src={logoWhite} alt="ySpace" sizes="100" priority className={cn("h-7 w-auto md:h-8", dark ? "" : "invert")} />
    </Link>
  )
}
