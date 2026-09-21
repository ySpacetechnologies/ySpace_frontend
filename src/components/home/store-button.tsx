import type { ReactNode } from "react"

export function StoreButton({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="bg-action hover:bg-action-hover flex h-[62px] items-center justify-center gap-2.5 rounded-sm px-6 transition-colors active:opacity-85">
      <span className="text-nv-50">{icon}</span>
      <span className="text-body-lg-m text-primary-50 md:text-body-lg font-medium">{label}</span>
    </a>
  )
}
