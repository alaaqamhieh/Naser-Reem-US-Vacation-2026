// Small date helpers for the trip's bounded, known date range.
// All dates are ISO 'YYYY-MM-DD' strings, parsed as UTC to avoid local
// timezone day-shift surprises (we only ever care about the calendar date).

export function parseIso(date: string): { year: number; month: number; day: number } {
  const [year, month, day] = date.split('-').map(Number)
  return { year, month, day }
}

export function toIso(year: number, month: number, day: number): string {
  const mm = String(month).padStart(2, '0')
  const dd = String(day).padStart(2, '0')
  return `${year}-${mm}-${dd}`
}

/** 0 = Sunday .. 6 = Saturday */
export function weekdayOf(date: string): number {
  const { year, month, day } = parseIso(date)
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay()
}

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate()
}

export function monthLabel(year: number, month: number): string {
  const d = new Date(Date.UTC(year, month - 1, 1))
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
}

export function dayLabel(date: string): string {
  const { year, month, day } = parseIso(date)
  const d = new Date(Date.UTC(year, month - 1, day))
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' })
}

/** All ISO dates from start to end, inclusive. */
export function tripDates(start: string, end: string): string[] {
  const dates: string[] = []
  let cur = parseIso(start)
  const endIso = end
  while (true) {
    const iso = toIso(cur.year, cur.month, cur.day)
    dates.push(iso)
    if (iso === endIso) break
    const next = new Date(Date.UTC(cur.year, cur.month - 1, cur.day + 1))
    cur = { year: next.getUTCFullYear(), month: next.getUTCMonth() + 1, day: next.getUTCDate() }
    if (dates.length > 400) break // safety valve, should never trigger for this trip
  }
  return dates
}

export interface MonthGroup {
  year: number
  month: number
  /** ISO dates within this month that fall in the trip range. */
  dates: string[]
}

/** Groups trip dates by calendar month, in order. */
export function groupByMonth(dates: string[]): MonthGroup[] {
  const groups: MonthGroup[] = []
  for (const date of dates) {
    const { year, month } = parseIso(date)
    const last = groups[groups.length - 1]
    if (last && last.year === year && last.month === month) {
      last.dates.push(date)
    } else {
      groups.push({ year, month, dates: [date] })
    }
  }
  return groups
}
