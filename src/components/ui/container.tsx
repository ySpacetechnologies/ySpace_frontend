import type { ComponentProps } from "react"
import { cn } from "@/lib"

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div {...props} className={cn("container mx-auto w-full px-4 md:px-0", className)} />
}
