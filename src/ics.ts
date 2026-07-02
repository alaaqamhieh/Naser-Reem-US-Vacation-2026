// Client-side .ics generation — no dependency, just template strings.
// Times are emitted as floating local time (no timezone block): the whole
// trip happens in one place and is consumed by the same two people, so the
// added complexity of a VTIMEZONE block isn't worth it here.

import type { ActivityIdea, CalendarEntry, Milestone } from './types'

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function addOneDay(date: string): string {
  const [y, m, d] = date.split('-').map(Number)
  const next = new Date(Date.UTC(y, m - 1, d + 1))
  return `${next.getUTCFullYear()}${pad(next.getUTCMonth() + 1)}${pad(next.getUTCDate())}`
}

function toIcsDate(date: string): string {
  const [y, m, d] = date.split('-').map(Number)
  return `${y}${pad(m)}${pad(d)}`
}

function toIcsDateTime(date: string, time?: string): string {
  const [y, m, d] = date.split('-').map(Number)
  const [hh, mm] = (time ?? '09:00').split(':').map(Number)
  return `${y}${pad(m)}${pad(d)}T${pad(hh)}${pad(mm)}00`
}

function addOneHour(time: string): string {
  const [hh, mm] = time.split(':').map(Number)
  const total = (hh * 60 + mm + 60) % (24 * 60)
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`
}

function escapeIcsText(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')
}

function buildVEvent(entry: CalendarEntry, activity: ActivityIdea): string {
  const uid = `${entry.id}@naser-reem-vacation`
  const start = entry.startTime ?? '09:00'
  const dtStart = toIcsDateTime(entry.date, start)
  const lastDay = entry.endDate ?? entry.date
  const dtEnd = toIcsDateTime(lastDay, entry.endTime ?? (lastDay === entry.date ? addOneHour(start) : start))
  const now = new Date()
  const dtStamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`
  const summary = escapeIcsText(`${activity.emoji} ${activity.title}`)
  const description = escapeIcsText([activity.description, entry.note].filter(Boolean).join('\n\n'))
  return [
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${summary}`,
    description ? `DESCRIPTION:${description}` : '',
    'END:VEVENT',
  ]
    .filter(Boolean)
    .join('\r\n')
}

function buildMilestoneVEvent(m: Milestone): string {
  const uid = `${m.id}@naser-reem-vacation`
  const dtStart = toIcsDate(m.start)
  // All-day events use an exclusive DTEND — the day after the last inclusive day.
  const dtEnd = addOneDay(m.end)
  const now = new Date()
  const dtStamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`
  const summary = escapeIcsText(`${m.emoji} ${m.title}`)
  return [
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART;VALUE=DATE:${dtStart}`,
    `DTEND;VALUE=DATE:${dtEnd}`,
    `SUMMARY:${summary}`,
    'END:VEVENT',
  ].join('\r\n')
}

function wrapCalendar(events: string[]): string {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Welcome Naser & Reem//Itinerary//EN',
    'CALSCALE:GREGORIAN',
    ...events,
    'END:VCALENDAR',
  ].join('\r\n')
}

export function buildSingleEventIcs(entry: CalendarEntry, activity: ActivityIdea): string {
  return wrapCalendar([buildVEvent(entry, activity)])
}

export function buildItineraryIcs(entries: CalendarEntry[], activities: ActivityIdea[], milestones: Milestone[] = []): string {
  const byId = new Map(activities.map((a) => [a.id, a]))
  const entryEvents = entries
    .map((e) => {
      const activity = byId.get(e.activityId)
      return activity ? buildVEvent(e, activity) : null
    })
    .filter((x): x is string => x !== null)
  const milestoneEvents = milestones.map(buildMilestoneVEvent)
  return wrapCalendar([...milestoneEvents, ...entryEvents])
}

export function downloadIcs(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
