import type { ActivityIdea, CalendarEntry } from '../types'
import { ActivityChip } from './ActivityChip'

export function DayCell({
  date,
  entries,
  activities,
  onRemove,
  onToggleCompleted,
  onOpenPicker,
  onExportEntry,
  isToday,
  isHosted,
}: {
  date: string
  entries: CalendarEntry[]
  activities: ActivityIdea[]
  onRemove: (entryId: string) => void
  onToggleCompleted: (entryId: string) => void
  onOpenPicker: () => void
  onExportEntry: (entryId: string) => void
  isToday?: boolean
  isHosted?: boolean
}) {
  const dayNum = Number(date.slice(8, 10))
  const byId = new Map(activities.map((a) => [a.id, a]))

  return (
    <div
      className={`day-cell ${isToday ? 'day-cell--today' : ''} ${isHosted ? 'day-cell--hosted' : ''}`}
      data-dropzone={date}
    >
      <div className="day-cell__num">{dayNum}</div>
      {isHosted && (
        <div className="day-cell__hosted-badge" title="Hosted by the brothers while Alaa is in Jordan">
          🤝
        </div>
      )}
      <div className="day-cell__chips">
        {entries.map((e) => {
          const activity = byId.get(e.activityId)
          if (!activity) return null
          return (
            <ActivityChip
              key={e.id}
              entry={e}
              activity={activity}
              onRemove={() => onRemove(e.id)}
              onToggleCompleted={() => onToggleCompleted(e.id)}
              onExport={() => onExportEntry(e.id)}
            />
          )
        })}
      </div>
      <button type="button" className="day-cell__add" aria-label={`Add an activity on day ${dayNum}`} onClick={onOpenPicker}>
        +
      </button>
    </div>
  )
}
