import type { ActivityIdea, CalendarEntry } from '../types'
import { dayLabel } from '../dateUtils'
import { useEscapeToClose } from '../useEscapeToClose'
import { useConfirm } from '../useConfirm'

function EntryRow({
  entry,
  activity,
  onToggleCompleted,
  onEdit,
  onExport,
  onRemove,
}: {
  entry: CalendarEntry
  activity: ActivityIdea
  onToggleCompleted: () => void
  onEdit: () => void
  onExport: () => void
  onRemove: () => void
}) {
  const { armed, trigger } = useConfirm(onRemove)
  return (
    <li className={`day-sheet__entry day-sheet__entry--${activity.category} ${entry.completed ? 'day-sheet__entry--done' : ''}`}>
      <button
        type="button"
        className="day-sheet__done"
        aria-label={entry.completed ? `Mark ${activity.title} not done` : `Mark ${activity.title} done`}
        aria-pressed={!!entry.completed}
        onClick={onToggleCompleted}
      >
        {entry.completed ? '☑' : '☐'}
      </button>
      <div className="day-sheet__entry-body">
        <span className="day-sheet__entry-title">
          <span aria-hidden="true">{activity.emoji}</span> {activity.title}
        </span>
        {(entry.startTime || entry.note) && (
          <span className="day-sheet__entry-meta">
            {entry.startTime && (
              <span className="chip__time">
                {entry.startTime}
                {entry.endTime ? `–${entry.endTime}` : ''}
              </span>
            )}
            {entry.note && <span className="day-sheet__entry-note">{entry.note}</span>}
          </span>
        )}
      </div>
      <div className="day-sheet__entry-actions">
        <button type="button" className="icon-btn-sm" aria-label={`Edit ${activity.title}`} onClick={onEdit}>
          ✏️
        </button>
        <button type="button" className="icon-btn-sm" aria-label={`Add ${activity.title} to your phone calendar`} onClick={onExport}>
          📅
        </button>
        <button
          type="button"
          className={`icon-btn-sm ${armed ? 'icon-btn-sm--confirm' : ''}`}
          aria-label={armed ? `Confirm remove ${activity.title}` : `Remove ${activity.title} from this day`}
          onClick={trigger}
        >
          {armed ? '✓?' : '🗑'}
        </button>
      </div>
    </li>
  )
}

/**
 * A day's full plans in a bottom sheet — the tap-a-day view for phones, where
 * the compact calendar grid only shows emoji.
 */
export function DayDetailSheet({
  date,
  entries,
  activities,
  isHosted,
  onToggleCompleted,
  onEditEntry,
  onExportEntry,
  onRemoveEntry,
  onAddActivity,
  onClose,
}: {
  date: string
  entries: CalendarEntry[]
  activities: ActivityIdea[]
  isHosted: boolean
  onToggleCompleted: (entryId: string) => void
  onEditEntry: (entryId: string) => void
  onExportEntry: (entryId: string) => void
  onRemoveEntry: (entryId: string) => void
  onAddActivity: () => void
  onClose: () => void
}) {
  useEscapeToClose(onClose)
  const byId = new Map(activities.map((a) => [a.id, a]))

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={`Plans for ${dayLabel(date)}`} onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-card__title">{dayLabel(date)}</h2>
        {isHosted && <p className="day-sheet__hosted">✈️ Alaa is in Jordan — the brothers are hosting this day.</p>}

        {entries.length === 0 ? (
          <p className="modal-card__hint">Nothing planned yet — a free day is a good day too.</p>
        ) : (
          <ul className="day-sheet__entries">
            {entries.map((e) => {
              const activity = byId.get(e.activityId)
              if (!activity) return null
              return (
                <EntryRow
                  key={e.id}
                  entry={e}
                  activity={activity}
                  onToggleCompleted={() => onToggleCompleted(e.id)}
                  onEdit={() => onEditEntry(e.id)}
                  onExport={() => onExportEntry(e.id)}
                  onRemove={() => onRemoveEntry(e.id)}
                />
              )
            })}
          </ul>
        )}

        <div className="modal-card__actions">
          <button type="button" className="primary-btn" onClick={onAddActivity}>
            + Add an activity
          </button>
          <button type="button" className="text-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
