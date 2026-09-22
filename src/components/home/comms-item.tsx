"use client"

import { Plus } from "lucide-react"
import { useId, useState } from "react"

import { cn } from "@/lib"

export type CommsItemProps = {
  index: number
  question: string
  answer: string
  defaultOpen?: boolean
}

export function CommsItem({ index, question, answer, defaultOpen = false }: CommsItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()

  return (
    <div className={cn("border-edge bg-elevated rounded-2xl border transition-colors", open ? "border-edge-brand" : "hover:border-edge-strong")}>
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls={panelId} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5">
        <span className="flex items-center gap-4">
          <span className="text-caption text-content-brand w-8 shrink-0 font-bold">{String(index).padStart(2, "0")}</span>
          <span className="text-body font-bold">{question}</span>
        </span>
        <span aria-hidden className={cn("bg-primary-50 text-primary-700 flex size-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300", open && "rotate-45")}>
          <Plus className="size-4" strokeWidth={2.5} />
        </span>
      </button>
      <div id={panelId} aria-hidden={!open} className={cn("grid transition-all duration-300 ease-out", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="min-h-0 overflow-hidden">
          <div className="px-5 pt-0 pb-5 pl-[3.75rem] md:px-6 md:pb-6 md:pl-[4.25rem]">
            <p className="text-body-m text-content-secondary">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
