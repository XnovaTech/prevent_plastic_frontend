"use client"

import { CalendarBlank } from "@phosphor-icons/react"
import { parseDate } from "@internationalized/date"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ThemedDatePickerProps = {
  ariaLabel: string
  className?: string
  id?: string
  onChange: (value: string) => void
  placeholder?: string
  value?: string
}

function TimeWheel({ items, onChange, selected }: { items: string[]; onChange: (value: string) => void; selected: string }) {
  return <div className="h-52 snap-y snap-mandatory overflow-y-auto rounded-xl bg-[#f7f9f4] p-1.5 [scrollbar-color:#b8cbb9_transparent] [scrollbar-width:thin]">{items.map((item) => <button className={`block h-9 w-full snap-center rounded-lg text-sm font-medium transition-colors ${item === selected ? "bg-brand-2 text-white shadow-sm" : "text-brand-light hover:bg-white hover:text-brand"}`} key={item} onClick={() => onChange(item)} type="button">{item}</button>)}</div>
}

export function ThemedDatePicker({
  ariaLabel,
  className = "",
  id,
  onChange,
  placeholder = "Choose a date",
  value,
}: ThemedDatePickerProps) {
  const selectedDate = value ? parseDate(value.slice(0, 10)) : null
  const label = selectedDate
    ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(selectedDate.toDate("UTC"))
    : placeholder

  return <PopoverTrigger><Button aria-label={ariaLabel} className={`h-11 w-full justify-between rounded-[14px] border-[#dfe6dc] bg-white px-3.5 text-sm font-normal text-brand shadow-sm shadow-[#274b3e]/[0.02] hover:bg-[#f7f9f4] ${className}`} id={id} type="button" variant="outline"><span className={selectedDate ? "text-brand" : "text-brand-gray-3"}>{label}</span><CalendarBlank size={18} /></Button><Popover className="z-[80] w-auto rounded-[22px] border border-[#dfe6dc] bg-white p-2 text-brand shadow-[0_22px_56px_-28px_rgba(27,65,56,0.45)]"><Calendar className="bg-white text-brand [--cell-radius:14px] [--cell-size:--spacing(9)] [&_[data-selected-single=true]]:bg-brand-2 [&_[data-selected-single=true]]:text-white [&_[data-today=true]]:bg-brand-yellow-bg" onChange={(date) => onChange(date.toString())} value={selectedDate ?? undefined} /></Popover></PopoverTrigger>
}

export function ThemedTimePicker({ disabled = false, onChange, value }: { disabled?: boolean; onChange: (value: string) => void; value?: string }) {
  const [hourValue = "12", minuteValue = "00"] = value?.split(":") ?? []
  const hour24 = Number(hourValue)
  const period = hour24 >= 12 ? "PM" : "AM"
  const hour12 = String(hour24 % 12 || 12)
  const minutes = Array.from({ length: 60 }, (_, minute) => String(minute).padStart(2, "0"))
  const hours = Array.from({ length: 12 }, (_, hour) => String(hour + 1))
  const setTime = (nextHour: string, nextMinute: string, nextPeriod: string) => {
    const parsedHour = Number(nextHour) % 12
    const normalizedHour = nextPeriod === "PM" ? parsedHour + 12 : parsedHour
    onChange(`${String(normalizedHour).padStart(2, "0")}:${nextMinute}`)
  }
  const selectClass = "h-11 w-full rounded-[14px] border-[#dfe6dc] bg-white px-3 text-sm font-normal text-brand shadow-sm shadow-[#274b3e]/[0.02] hover:bg-[#f7f9f4] focus-visible:border-[#7fa88c] focus-visible:ring-[#7fa88c]/20"
  const menuClass = "z-[80] max-h-64 rounded-[18px] border border-[#dfe6dc] bg-white text-brand shadow-[0_18px_45px_-28px_rgba(27,65,56,0.45)]"

  return <div className="grid grid-cols-3 gap-2"><Select aria-label="Delivery hour" isDisabled={disabled} onSelectionChange={(key) => setTime(String(key), minuteValue, period)} selectedKey={hour12}><SelectTrigger className={selectClass}><SelectValue /></SelectTrigger><SelectContent className={menuClass}>{hours.map((hour) => <SelectItem id={hour} key={hour}>{hour}</SelectItem>)}</SelectContent></Select><Select aria-label="Delivery minute" isDisabled={disabled} onSelectionChange={(key) => setTime(hour12, String(key), period)} selectedKey={minuteValue}><SelectTrigger className={selectClass}><SelectValue /></SelectTrigger><SelectContent className={menuClass}>{minutes.map((minute) => <SelectItem id={minute} key={minute}>{minute}</SelectItem>)}</SelectContent></Select><Select aria-label="Delivery AM or PM" isDisabled={disabled} onSelectionChange={(key) => setTime(hour12, minuteValue, String(key))} selectedKey={period}><SelectTrigger className={selectClass}><SelectValue /></SelectTrigger><SelectContent className={menuClass}><SelectItem id="AM">AM</SelectItem><SelectItem id="PM">PM</SelectItem></SelectContent></Select></div>
}

export function ThemedDateTimePicker({ ariaLabel, className = "", id, onChange, placeholder = "Choose date and time", value }: ThemedDatePickerProps) {
  const [datePart = "", timePart = "12:00"] = value?.split("T") ?? []
  const selectedDate = datePart ? parseDate(datePart) : null
  const [hourValue = "12", minuteValue = "00"] = timePart.slice(0, 5).split(":")
  const hour24 = Number(hourValue)
  const period = hour24 >= 12 ? "PM" : "AM"
  const hour12 = String(hour24 % 12 || 12)
  const hours = Array.from({ length: 12 }, (_, hour) => String(hour + 1))
  const minutes = Array.from({ length: 60 }, (_, minute) => String(minute).padStart(2, "0"))
  const setTime = (nextHour: string, nextMinute: string, nextPeriod: string) => {
    const parsedHour = Number(nextHour) % 12
    const normalizedHour = nextPeriod === "PM" ? parsedHour + 12 : parsedHour
    onChange(`${datePart || new Date().toISOString().slice(0, 10)}T${String(normalizedHour).padStart(2, "0")}:${nextMinute}`)
  }
  const formattedDate = selectedDate ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(selectedDate.toDate("UTC")) : ""
  const displayValue = formattedDate ? `${formattedDate}, ${hour12}:${minuteValue} ${period}` : placeholder
  return <PopoverTrigger><Button aria-label={ariaLabel} className={`h-11 w-full justify-between rounded-[14px] border-[#dfe6dc] bg-white px-3.5 text-sm font-normal text-brand shadow-sm shadow-[#274b3e]/[0.02] hover:bg-[#f7f9f4] ${className}`} id={id} type="button" variant="outline"><span className={selectedDate ? "text-brand" : "text-brand-gray-3"}>{displayValue}</span><CalendarBlank size={18} /></Button><Popover className="z-[80] w-auto rounded-[22px] border border-[#dfe6dc] bg-white p-0 text-brand shadow-[0_22px_56px_-28px_rgba(27,65,56,0.45)]"><div className="flex overflow-hidden rounded-[22px]"><Calendar className="bg-white p-3 text-brand [--cell-radius:14px] [--cell-size:--spacing(8)] [&_[data-selected-single=true]]:bg-brand-2 [&_[data-selected-single=true]]:text-white [&_[data-today=true]]:bg-brand-yellow-bg" onChange={(date) => onChange(`${date.toString()}T${timePart.slice(0, 5)}`)} value={selectedDate ?? undefined} /><div className="w-48 border-l border-[#e3e9df] bg-[#fbfcf8] p-3"><p className="mb-3 text-xs font-semibold text-brand">Delivery time</p><div className="grid grid-cols-3 gap-2"><TimeWheel items={hours} onChange={(hour) => setTime(hour, minuteValue, period)} selected={hour12} /><TimeWheel items={minutes} onChange={(minute) => setTime(hour12, minute, period)} selected={minuteValue} /><TimeWheel items={["AM", "PM"]} onChange={(nextPeriod) => setTime(hour12, minuteValue, nextPeriod)} selected={period} /></div></div></div></Popover></PopoverTrigger>
}
