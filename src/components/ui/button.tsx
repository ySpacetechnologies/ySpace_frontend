import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib"

type ButtonBaseProps = {
  variant?: "primary" | "outline" | "ghost"
  size?: "md" | "lg"
  loading?: boolean
  className?: string
  children: ReactNode
}

type ButtonAsButton = ButtonBaseProps & Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined }

type ButtonAsLink = ButtonBaseProps & Omit<ComponentProps<typeof Link>, "className" | "children"> & { href: string }

export type ButtonProps = ButtonAsButton | ButtonAsLink

const baseStyles = "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full text-button transition-[background-color,border-color,color,opacity,transform,box-shadow] duration-150 active:scale-[0.98]"

const variantStyles = {
  primary: "bg-action text-on-brand shadow-brand hover:bg-action-hover disabled:border-edge disabled:bg-action-disabled disabled:text-content-disabled",
  outline: "border-2 border-edge-brand bg-transparent text-content-brand hover:bg-primary-50 disabled:border-edge disabled:text-content-disabled",
  ghost: "bg-transparent text-content hover:bg-primary-50 disabled:text-content-disabled",
} as const

const sizeStyles = {
  md: "h-11 px-6",
  lg: "h-13 px-8",
} as const

function Spinner() {
  return <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
}

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary"
  const size = props.size ?? "md"
  const loading = props.loading ?? false
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], loading && "pointer-events-none", props.className)
  const content = (
    <>
      {loading ? <Spinner /> : null}
      {props.children}
    </>
  )

  if (props.href !== undefined) {
    return (
      <Link href={props.href} replace={props.replace} scroll={props.scroll} prefetch={props.prefetch} onClick={props.onClick} className={classes} aria-busy={loading || undefined}>
        {content}
      </Link>
    )
  }

  return (
    <button type={props.type ?? "button"} disabled={props.disabled ?? loading} onClick={props.onClick} className={classes} aria-busy={loading || undefined}>
      {content}
    </button>
  )
}
