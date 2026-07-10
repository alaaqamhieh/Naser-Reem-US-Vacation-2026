import type { ActivityIdea } from '../types'
import { dayLabel } from '../dateUtils'
import { useEscapeToClose } from '../useEscapeToClose'
import { useActivitySearch } from '../useActivitySearch'

export function ActivityPickerModal({
  date,
  activities,
  onPick,
  onCreateNew,
  onClose,
}: {
  date: string
  activities: ActivityIdea[]
  onPick: (activityId: string) => void
  onCreateNew: (prefillTitle: string) => void
  onClose: () => void
}) {
  useEscapeToClose(onClose)
  const { query, setQuery, filtered } = useActivitySearch(activities)
  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Add an activity on ${dayLabel(date)}`}
      onClick={onClose}
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-card__title">Add to {dayLabel(date)}</h2>
        <input
          type="search"
          className="library-search"
          placeholder="Search ideas…"
          aria-label="Search ideas"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="activity-picker-list">
          {filtered.length === 0 && <p className="empty-state">No ideas match your search.</p>}
          {filtered.map((a) => (
            <button key={a.id} type="button" className="activity-picker-list__item" onClick={() => onPick(a.id)}>
              <span aria-hidden="true">{a.emoji}</span> {a.title}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="activity-picker-list__create"
          onClick={() => onCreateNew(query.trim())}
        >
          + Create {query.trim() ? `“${query.trim()}”` : 'a new idea'}
        </button>
        <button type="button" className="text-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  )
}
