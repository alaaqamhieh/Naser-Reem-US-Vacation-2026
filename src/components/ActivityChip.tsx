import { useState } from 'react'
import type { ActivityIdea, CalendarEntry } from '../types'

export function ActivityChip({
  entry,
  activity,
  onRemove,
  onExport,
}: {
  entry: CalendarEntry
  activity: ActivityIdea
  onRemove: () => void
  onExport: () => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`chip chip--${activity.category} ${open ? 'chip--open' : ''}`}>
      <button
        type="button"
        className="chip__main"
        title={entry.note}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span aria-hidden="true">{activity.emoji}</span>
        <span className="chip__title">{activity.title}</span>
      </button>
      {open && (
        <div className="chip__actions">
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
            className="chip__action"
            aria-label={`Remove ${activity.title} from this day`}
            onClick={onRemove}
          >
            🗑
          </button>
        </div>
      )}
    </div>
  )
}
