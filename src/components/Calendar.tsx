import { groupByMonth, isWithinRange, monthLabel, tripDates, weekdayOf } from '../dateUtils'
import type { ActivityIdea, CalendarEntry } from '../types'
import { DayCell } from './DayCell'

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function Calendar({
  tripStart,
  tripEnd,
  hostedStart,
  hostedEnd,
  entries,
  activities,
  onRemoveEntry,
  onToggleCompleted,
  onOpenPicker,
  onExportEntry,
  today,
}: {
  tripStart: string
  tripEnd: string
  /** Date range (inclusive) during which the brothers host while Alaa is in Jordan. */
  hostedStart: string
  hostedEnd: string
  entries: CalendarEntry[]
  activities: ActivityIdea[]
  onRemoveEntry: (entryId: string) => void
  onToggleCompleted: (entryId: string) => void
  onOpenPicker: (date: string) => void
  onExportEntry: (entryId: string) => void
  today?: string
}) {
  const dates = tripDates(tripStart, tripEnd)
  const months = groupByMonth(dates)

  const entriesByDate = new Map<string, CalendarEntry[]>()
  for (const e of entries) {
    const list = entriesByDate.get(e.date) ?? []
    list.push(e)
    entriesByDate.set(e.date, list)
  }

  return (
    <section className="calendar-section" id="calendar" aria-label="Trip calendar">
      <h2 className="section-title">The Calendar</h2>
      <p className="section-hint">
        Drag an idea from below onto any day — or tap a day's <strong>+</strong> to pick one.
      </p>
      <p className="calendar-swipe-hint" aria-hidden="true">👉 Swipe sideways to see the whole week</p>
      {months.map((group) => {
        const firstWeekday = weekdayOf(group.dates[0])
        const leadingBlanks = Array.from({ length: firstWeekday })
        return (
          <div className="month-grid" key={`${group.year}-${group.month}`}>
            <h3 className="month-grid__label">{monthLabel(group.year, group.month)}</h3>
            <div className="month-grid__scroll">
              <div className="month-grid__weekdays">
                {WEEKDAY_LABELS.map((w) => (
                  <div key={w} className="month-grid__weekday">
                    {w}
                  </div>
                ))}
              </div>
              <div className="month-grid__days">
                {leadingBlanks.map((_, i) => (
                  <div key={`blank-${i}`} className="day-cell day-cell--blank" aria-hidden="true" />
                ))}
                {group.dates.map((date) => (
                  <DayCell
                    key={date}
                    date={date}
                    entries={entriesByDate.get(date) ?? []}
                    activities={activities}
                    onRemove={onRemoveEntry}
                    onToggleCompleted={onToggleCompleted}
                    onOpenPicker={() => onOpenPicker(date)}
                    onExportEntry={onExportEntry}
                    isToday={date === today}
                    isHosted={isWithinRange(date, hostedStart, hostedEnd)}
                  />
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
