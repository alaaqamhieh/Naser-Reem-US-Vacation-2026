import type { ActivityIdea, CalendarEntry, Milestone } from '../types'
import { dayLabel, daysBetween, isWithinRange, tripDates } from '../dateUtils'
import { milestoneColor } from '../milestoneColors'
import { ActivityChip } from './ActivityChip'

export function TimelineView({
  tripStart,
  tripEnd,
  entries,
  activities,
  onRemoveEntry,
  onToggleCompleted,
  onOpenPicker,
  onEditEntry,
  milestones,
  today,
}: {
  tripStart: string
  tripEnd: string
  entries: CalendarEntry[]
  activities: ActivityIdea[]
  onRemoveEntry: (entryId: string) => void
  onToggleCompleted: (entryId: string) => void
  onOpenPicker: (date: string) => void
  onEditEntry: (entryId: string) => void
  milestones: Milestone[]
  today?: string
}) {
  const dates = tripDates(tripStart, tripEnd)
  const byId = new Map(activities.map((a) => [a.id, a]))

  return (
    <div className="timeline">
      {dates.map((date) => {
        const dayEntries = entries
          .filter((e) => date >= e.date && date <= (e.endDate ?? e.date))
          .map((e) => {
            const activity = byId.get(e.activityId)
            return activity ? { entry: e, activity } : null
          })
          .filter((x): x is { entry: CalendarEntry; activity: ActivityIdea } => !!x)
        const dayMilestones = milestones.filter((m) => isWithinRange(date, m.start, m.end))
        const primaryMilestone = dayMilestones[0]
        const dotColor = primaryMilestone ? milestoneColor(primaryMilestone.color) : null
        const dayNumber = daysBetween(tripStart, date) + 1

        return (
          <div key={date} className={`tl-day ${date === today ? 'tl-day--today' : ''}`}>
            <span
              className="tl-dot"
              aria-hidden="true"
              style={dotColor ? { borderColor: dotColor.base, background: dotColor.soft } : undefined}
            />
            <div className="tl-date">
              <span>{dayLabel(date)}</span>
              <span className="tl-date__num">Day {dayNumber}</span>
              {primaryMilestone && (
                <span className="tl-date__tag">
                  {primaryMilestone.emoji} {primaryMilestone.title}
                </span>
              )}
            </div>
            <div className="tl-items">
              {dayEntries.map(({ entry, activity }) => (
                <ActivityChip
                  key={entry.id}
                  entry={entry}
                  activity={activity}
                  onRemove={() => onRemoveEntry(entry.id)}
                  onToggleCompleted={() => onToggleCompleted(entry.id)}
                  onEdit={() => onEditEntry(entry.id)}
                />
              ))}
              {dayEntries.length === 0 && <p className="tl-empty">Free day</p>}
              <button type="button" className="tl-add" onClick={() => onOpenPicker(date)}>
                + Add to this day
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
