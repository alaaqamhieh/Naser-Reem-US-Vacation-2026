import type { ActivityIdea, CalendarEntry } from '../types'
import { ActivityChip } from './ActivityChip'

export function DayCell({
  date,
  entries,
  activities,
  onRemove,
  onOpenPicker,
  onExportEntry,
  isToday,
}: {
  date: string
  entries: CalendarEntry[]
  activities: ActivityIdea[]
  onRemove: (entryId: string) => void
  onOpenPicker: () => void
  onExportEntry: (entryId: string) => void
  isToday?: boolean
}) {
  const dayNum = Number(date.slice(8, 10))
  const byId = new Map(activities.map((a) => [a.id, a]))

  return (
    <div className={`day-cell ${isToday ? 'day-cell--today' : ''}`} data-dropzone={date}>
      <div className="day-cell__num">{dayNum}</div>
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
