import { useState } from 'react'
import type { ActivityIdea, CalendarEntry } from '../types'
import { useConfirm } from '../useConfirm'

export function ActivityChip({
  entry,
  activity,
  onRemove,
  onToggleCompleted,
  onExport,
  onEdit,
}: {
  entry: CalendarEntry
  activity: ActivityIdea
  onRemove: () => void
  onToggleCompleted: () => void
  onExport: () => void
  onEdit: () => void
}) {
  const [open, setOpen] = useState(false)
  const { armed, trigger } = useConfirm(onRemove)

  return (
    <div className={`chip chip--${activity.category} ${open ? 'chip--open' : ''} ${entry.completed ? 'chip--completed' : ''}`}>
      <button
        type="button"
        className="chip__done"
        aria-label={entry.completed ? `Mark ${activity.title} not done` : `Mark ${activity.title} done`}
        aria-pressed={!!entry.completed}
        onClick={(e) => {
          e.stopPropagation()
          onToggleCompleted()
        }}
      >
        {entry.completed ? '☑' : '☐'}
      </button>
      <button
        type="button"
        className="chip__main"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span aria-hidden="true">{activity.emoji}</span>
        <span className="chip__title">{activity.title}</span>
      </button>
      {open && (
        <>
          {(entry.note || entry.startTime) && (
            <div className="chip__details">
              {entry.startTime && (
                <span className="chip__time">
                  {entry.startTime}
                  {entry.endTime ? `–${entry.endTime}` : ''}
                </span>
              )}
              {entry.note && <p className="chip__note">{entry.note}</p>}
            </div>
          )}
          <div className="chip__actions">
            <button type="button" className="chip__action" aria-label={`Edit ${activity.title} — move day, time, or note`} onClick={onEdit}>
              ✏️
            </button>
            <button
              type="button"
              className="chip__action"
              aria-label={`Add ${activity.title} to your phone calendar`}
              onClick={onExport}
            >
              📅
            </button>
            <button
              type="button"
              className={`chip__action ${armed ? 'chip__action--confirm' : ''}`}
              aria-label={armed ? `Confirm remove ${activity.title}` : `Remove ${activity.title} from this day`}
              onClick={trigger}
            >
              {armed ? '✓ Confirm?' : '🗑'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
