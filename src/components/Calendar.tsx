import { groupByMonth, isWithinRange, monthLabel, tripDates, weekdayOf } from '../dateUtils'
import type { ActivityIdea, CalendarEntry, Milestone } from '../types'
import { DayCell } from './DayCell'

// Weeks run Monday–Sunday.
const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function Calendar({
  tripStart,
  tripEnd,
  entries,
  activities,
  onRemoveEntry,
  onOpenPicker,
  onEditEntry,
  onOpenDay,
  milestones,
  onAddMilestone,
  onEditMilestone,
  today,
}: {
  tripStart: string
  tripEnd: string
  entries: CalendarEntry[]
  activities: ActivityIdea[]
  onRemoveEntry: (entryId: string) => void
  onOpenPicker: (date: string) => void
  onEditEntry: (entryId: string) => void
  onOpenDay: (date: string) => void
  milestones: Milestone[]
  onAddMilestone: () => void
  onEditMilestone: (milestoneId: string) => void
  today?: string
}) {
  const dates = tripDates(tripStart, tripEnd)
  const months = groupByMonth(dates)

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
                    entries={entries
                      .filter((e) => date >= e.date && date <= (e.endDate ?? e.date))
                      .map((e) => ({ entry: e, isStart: date === e.date }))}
                    activities={activities}
                    onRemove={onRemoveEntry}
                    onOpenPicker={() => onOpenPicker(date)}
                    onEditEntry={onEditEntry}
                    onOpenDay={() => onOpenDay(date)}
                    isToday={date === today}
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
