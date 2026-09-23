"use client"

import { CalendarDays, Check, ChevronDown, Clock, Upload } from "lucide-react"
import { useId, useState } from "react"

import { cn } from "@/lib"

/**
 * Custom form controls. Every control is native-input-backed (real input /
 * textarea / file input underneath) for accessibility and form semantics, but
 * the visible UI is fully custom so text fields, dropdowns, dates and times
 * all share one visual language.
 */

const shell = "border-edge bg-elevated focus-within:border-edge-brand focus-within:shadow-brand/40 block w-full rounded-2xl border transition-all"

const triggerShell = "border-edge bg-elevated focus-within:border-edge-brand focus-within:shadow-brand/40 flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all"

export function FieldLabel({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <span className="text-caption mb-2 flex items-center gap-1.5 font-bold">
      {children}
      {optional ? <span className="text-content-tertiary font-medium">(optional)</span> : null}
    </span>
  )
}

function FieldError({ error }: { error?: string }) {
  if (!error) return null
  return <span className="text-caption text-error-text mt-2 block font-semibold">{error}</span>
}

/* ----------------------------- Text inputs ----------------------------- */

type TextFieldProps = {
  label: string
  optional?: boolean
  hint?: string
  error?: string
} & Omit<React.ComponentProps<"input">, "className" | "children">

export function TextField({ label, optional, hint, error, ...inputProps }: TextFieldProps) {
  const id = useId()
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>
        <FieldLabel optional={optional}>{label}</FieldLabel>
      </label>
      <div className={cn(shell, "px-4 py-3.5")}>
        <input id={id} {...inputProps} className="text-body-m md:text-body placeholder:text-content-tertiary w-full bg-transparent outline-none" />
      </div>
      {hint ? <span className="text-caption-m text-content-tertiary md:text-caption mt-2">{hint}</span> : null}
      <FieldError error={error} />
    </div>
  )
}

type TextareaFieldProps = {
  label: string
  optional?: boolean
  error?: string
} & Omit<React.ComponentProps<"textarea">, "className" | "children">

export function TextareaField({ label, optional, error, ...textareaProps }: TextareaFieldProps) {
  const id = useId()
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>
        <FieldLabel optional={optional}>{label}</FieldLabel>
      </label>
      <div className={cn(shell, "px-4 py-3.5")}>
        <textarea id={id} {...textareaProps} className="text-body-m md:text-body placeholder:text-content-tertiary w-full resize-none bg-transparent outline-none" />
      </div>
      <FieldError error={error} />
    </div>
  )
}

export type SelectOption = { value: string; label: string }

/* ------------------------------- Select -------------------------------- */

export function Select({ label, optional, options, value, onChange, error }: { label: string; optional?: boolean; options: readonly string[] | readonly SelectOption[]; value: string; onChange: (value: string) => void; error?: string }) {
  const [open, setOpen] = useState(false)
  const buttonId = useId()

  const normalized: SelectOption[] = options.map((option) => (typeof option === "string" ? { value: option, label: option } : option))
  const selected = normalized.find((option) => option.value === value)

  return (
    <div
      className="relative flex flex-col"
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false)
      }}
    >
      <span id={buttonId} className="text-caption mb-2 flex items-center gap-1.5 font-bold">
        {label}
        {optional ? <span className="text-content-tertiary font-medium">(optional)</span> : null}
      </span>
      <button type="button" aria-haspopup="listbox" aria-expanded={open} aria-labelledby={buttonId} onClick={() => setOpen((current) => !current)} className={cn(triggerShell, open && "border-edge-brand shadow-brand/40 shadow-brand")}>
        <span className={cn("text-body-m md:text-body", !selected && "text-content-tertiary")}>{selected?.label ?? "Select…"}</span>
        <ChevronDown className={cn("text-content-tertiary size-4 shrink-0 transition-transform duration-200", open && "rotate-180")} aria-hidden />
      </button>
      {open ? (
        <ul role="listbox" aria-labelledby={buttonId} className="border-edge bg-elevated absolute top-full z-30 mt-2 max-h-64 w-full overflow-auto rounded-2xl border p-1.5 shadow-lg">
          {normalized.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                className={cn("text-body-m md:text-caption flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 font-semibold transition-colors", option.value === value ? "bg-primary-50 text-primary-700" : "text-content-secondary hover:bg-primary-50 hover:text-content")}
              >
                {option.label}
                {option.value === value ? <Check className="text-primary-600 size-4" aria-hidden /> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <FieldError error={error} />
    </div>
  )
}

/* --------------------------- Date & time pickers ------------------------ */

function pad(value: number) {
  return String(value).padStart(2, "0")
}

/** Returns rows of days for a month grid (leading blanks align the weekday). */
function monthMatrix(year: number, month: number): (number | null)[][] {
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = [...Array<null>(firstWeekday), ...Array.from({ length: daysInMonth }, (_, index) => index + 1)]
  const rows: (number | null)[][] = []
  for (let index = 0; index < cells.length; index += 7) {
    rows.push(cells.slice(index, index + 7))
  }
  return rows
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function formatDisplayDate(value: string) {
  const [y, m, d] = value.split("-").map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

export function DatePicker({ label, optional, value, onChange, error }: { label: string; optional?: boolean; value: string; onChange: (value: string) => void; error?: string }) {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState(() => {
    const parsed = value ? formatDisplayDate(value) : null
    const base = parsed ?? new Date()
    return { year: base.getFullYear(), month: base.getMonth() }
  })
  const buttonId = useId()

  const selected = value ? formatDisplayDate(value) : null
  const today = new Date()
  const todayIso = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`

  function pick(day: number) {
    onChange(`${view.year}-${pad(view.month + 1)}-${pad(day)}`)
    setOpen(false)
  }

  function shift(delta: number) {
    setView((current) => {
      const next = new Date(current.year, current.month + delta, 1)
      return { year: next.getFullYear(), month: next.getMonth() }
    })
  }

  return (
    <div
      className="relative flex flex-col"
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false)
      }}
    >
      <span id={buttonId} className="text-caption mb-2 flex items-center gap-1.5 font-bold">
        {label}
        {optional ? <span className="text-content-tertiary font-medium">(optional)</span> : null}
      </span>
      <button type="button" aria-haspopup="dialog" aria-expanded={open} aria-labelledby={buttonId} onClick={() => setOpen((current) => !current)} className={cn(triggerShell, open && "border-edge-brand shadow-brand/40 shadow-brand")}>
        <span className={cn("text-body-m md:text-body", !selected && "text-content-tertiary")}>{selected ? `${MONTHS[selected.getMonth()]} ${selected.getDate()}, ${selected.getFullYear()}` : "Pick a date…"}</span>
        <CalendarDays className="text-content-tertiary size-4 shrink-0" aria-hidden />
      </button>
      {open ? (
        <div className="border-edge bg-elevated absolute top-full z-30 mt-2 w-[300px] rounded-2xl border p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <button type="button" onClick={() => shift(-1)} aria-label="Previous month" className="bg-nv-400 hover:bg-primary-50 flex size-8 items-center justify-center rounded-full transition-colors">
              <ChevronDown className="size-4 rotate-90" aria-hidden />
            </button>
            <span className="text-caption font-bold">
              {MONTHS[view.month]} {view.year}
            </span>
            <button type="button" onClick={() => shift(1)} aria-label="Next month" className="bg-nv-400 hover:bg-primary-50 flex size-8 items-center justify-center rounded-full transition-colors">
              <ChevronDown className="size-4 -rotate-90" aria-hidden />
            </button>
          </div>
          <div className="text-caption-m text-content-tertiary mt-4 grid grid-cols-7 gap-1 text-center font-bold">
            {WEEKDAYS.map((weekday) => (
              <span key={weekday}>{weekday}</span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {monthMatrix(view.year, view.month).map((row, rowIndex) =>
              row.map((day, dayIndex) => {
                const key = `${rowIndex}-${dayIndex}`
                if (day === null) return <span key={key} aria-hidden />
                const iso = `${view.year}-${pad(view.month + 1)}-${pad(day)}`
                const isSelected = value === iso
                const isToday = todayIso === iso
                return (
                  <button key={key} type="button" onClick={() => pick(day)} className={cn("text-caption-m md:text-caption flex size-9 items-center justify-center rounded-full font-semibold transition-colors duration-150", isSelected ? "bg-action text-on-brand shadow-brand" : isToday ? "border-edge-brand text-content border" : "text-content-secondary hover:bg-primary-50 hover:text-content")}>
                    {day}
                  </button>
                )
              }),
            )}
          </div>
        </div>
      ) : null}
      <FieldError error={error} />
    </div>
  )
}

const HOUR_OPTIONS = Array.from({ length: 24 }, (_, index) => index)
const MINUTE_OPTIONS = [0, 15, 30, 45]

export function TimePicker({ label, optional, value, onChange, error, placeholder = "Pick a time…" }: { label: string; optional?: boolean; value: string; onChange: (value: string) => void; error?: string; placeholder?: string }) {
  const [open, setOpen] = useState(false)
  const buttonId = useId()

  const [hour, minute] = value ? value.split(":") : ["", ""]
  const display = value ? new Date(`2000-01-01T${pad(Number(hour))}:${pad(Number(minute) || 0)}:00`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : null

  function setValue(h: number, m: number) {
    onChange(`${pad(h)}:${pad(m)}`)
    setOpen(false)
  }

  return (
    <div
      className="relative flex flex-col"
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false)
      }}
    >
      <span id={buttonId} className="text-caption mb-2 flex items-center gap-1.5 font-bold">
        {label}
        {optional ? <span className="text-content-tertiary font-medium">(optional)</span> : null}
      </span>
      <button type="button" aria-haspopup="dialog" aria-expanded={open} aria-labelledby={buttonId} onClick={() => setOpen((current) => !current)} className={cn(triggerShell, open && "border-edge-brand shadow-brand/40 shadow-brand")}>
        <span className={cn("text-body-m md:text-body", !display && "text-content-tertiary")}>{display ?? placeholder}</span>
        <Clock className="text-content-tertiary size-4 shrink-0" aria-hidden />
      </button>
      {open ? (
        <div className="border-edge bg-elevated absolute top-full z-30 mt-2 w-[280px] rounded-2xl border p-4 shadow-lg">
          <div className="text-caption text-content-tertiary flex items-center justify-between">
            <span className="font-bold uppercase">Hour</span>
            <span className="font-bold uppercase">Minute</span>
          </div>
          <div className="mt-3 flex gap-4">
            <div className="bg-nv-400 h-44 flex-1 [scrollbar-width:none] overflow-y-auto rounded-xl p-1">
              {HOUR_OPTIONS.map((h) => (
                <button key={h} type="button" onClick={() => setValue(h, Number(minute) || 0)} className={cn("text-caption w-full rounded-lg py-2 font-semibold transition-colors", Number(hour) === h ? "bg-action text-on-brand" : "text-content-secondary hover:bg-primary-50 hover:text-content")}>
                  {pad(h)}
                </button>
              ))}
            </div>
            <div className="bg-nv-400 h-44 flex-1 [scrollbar-width:none] overflow-y-auto rounded-xl p-1">
              {MINUTE_OPTIONS.map((m) => (
                <button key={m} type="button" onClick={() => setValue(Number(hour) || 9, m)} className={cn("text-caption w-full rounded-lg py-2 font-semibold transition-colors", (Number(minute) || 0) === m ? "bg-action text-on-brand" : "text-content-secondary hover:bg-primary-50 hover:text-content")}>
                  {pad(m)}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <FieldError error={error} />
    </div>
  )
}

/* ------------------------------ File drop ------------------------------ */

type FileDropProps = {
  label: string
  hint?: string
  files: FileList | null
  onChange: (files: FileList | null) => void
  multiple?: boolean
}

export function FileDrop({ label, hint, files, onChange, multiple }: FileDropProps) {
  const id = useId()
  const [dragging, setDragging] = useState(false)
  const count = files?.length ?? 0
  const summary = count === 1 ? files?.[0]?.name : count > 1 ? `${count} file(s) attached` : null

  return (
    <div className="flex flex-col">
      <span className="text-caption mb-2 font-bold">{label}</span>
      <label
        htmlFor={id}
        onDragOver={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragging(false)
          onChange(event.dataTransfer.files)
        }}
        className={cn("border-edge bg-elevated hover:border-edge-brand flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-dashed px-4 py-7 text-center transition-all", dragging && "border-edge-brand bg-primary-50/60")}
      >
        <Upload className="text-primary-600 size-5" aria-hidden />
        <span className="text-caption font-bold">{summary ?? "Click or drop files here"}</span>
        {hint ? <span className="text-caption-m text-content-tertiary md:text-caption">{hint}</span> : null}
        <input id={id} type="file" multiple={multiple} accept="image/*,video/*,.pdf" className="sr-only" onChange={(event) => onChange(event.target.files)} />
      </label>
    </div>
  )
}
