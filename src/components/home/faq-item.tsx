"use client"

import { Minus, Plus } from "lucide-react"
import { useId, useState } from "react"

import { cn } from "@/lib"

export type FaqItemProps = {
  question: string
  answer: string
  defaultOpen?: boolean
}

export function FaqItem({ question, answer, defaultOpen = false }: FaqItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()

  return (
    <div className="bg-nv-50 rounded-lg px-6 py-8">
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls={panelId} className="flex w-full items-center justify-between gap-6 text-left">
        <span className="text-h3-m md:text-h3 font-semibold text-neutral-900">{question}</span>
        {open ? <Minus className="size-6 shrink-0 text-neutral-500" strokeWidth={2} aria-hidden /> : <Plus className="size-6 shrink-0 text-neutral-500" strokeWidth={2} aria-hidden />}
      </button>
      <div id={panelId} aria-hidden={!open} className={cn("grid transition-all duration-300 ease-out", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="min-h-0 overflow-hidden">
          <p className="text-h3-m md:text-6 pt-5 font-medium text-neutral-500 md:leading-8 md:tracking-[-0.002em]">{answer}</p>
        </div>
      </div>
    </div>
  )
}
