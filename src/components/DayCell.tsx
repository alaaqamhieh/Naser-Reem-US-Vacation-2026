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
  onEditEntry,
  onOpenDay,
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
  onEditEntry: (entryId: string) => void
  onOpenDay: () => void
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
      {/* On phones the whole cell is one big tap target opening the day sheet;
          hidden on desktop where chips are interacted with directly. */}
      <button type="button" className="day-cell__tap" aria-label={`See plans for day ${dayNum}`} onClick={onOpenDay} />
      <div className="day-cell__num">{dayNum}</div>
      {isHosted && (
        <div className="day-cell__hosted-badge" title="Alaa is in Jordan — the brothers are hosting">
          ✈️
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
              onEdit={() => onEditEntry(e.id)}
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
