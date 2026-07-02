import { groupByMonth, isWithinRange, monthLabel, tripDates, weekdayOf } from '../dateUtils'
import type { ActivityIdea, CalendarEntry, Milestone } from '../types'
import { DayCell } from './DayCell'

// Weeks run Monday–Sunday.
const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

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
  onEditEntry,
  onOpenDay,
  milestones,
  onAddMilestone,
  onEditMilestone,
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
  onEditEntry: (entryId: string) => void
  onOpenDay: (date: string) => void
  milestones: Milestone[]
  onAddMilestone: () => void
  onEditMilestone: (milestoneId: string) => void
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
      <div className="section-title-row">
        <h2 className="section-title">The Calendar</h2>
        <button type="button" className="secondary-btn section-title-row__action" onClick={onAddMilestone}>
          ✨ Add a special date
        </button>
      </div>
      <p className="section-hint">
        Drag an idea from below onto any day — or tap a day to see and change its plans.
      </p>
      {months.map((group) => {
        // Monday-first: shift JS's Sunday-first weekday index.
        const firstWeekday = (weekdayOf(group.dates[0]) + 6) % 7
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
                    onEditEntry={onEditEntry}
                    onOpenDay={() => onOpenDay(date)}
                    isToday={date === today}
                    isHosted={isWithinRange(date, hostedStart, hostedEnd)}
                    milestones={milestones
                      .filter((m) => isWithinRange(date, m.start, m.end))
                      .map((m) => ({ m, isStart: date === m.start }))}
                    onEditMilestone={onEditMilestone}
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
