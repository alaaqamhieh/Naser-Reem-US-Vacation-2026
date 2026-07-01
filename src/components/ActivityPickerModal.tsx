import type { ActivityIdea } from '../types'
import { dayLabel } from '../dateUtils'
import { useEscapeToClose } from '../useEscapeToClose'

export function ActivityPickerModal({
  date,
  activities,
  onPick,
  onClose,
}: {
  date: string
  activities: ActivityIdea[]
  onPick: (activityId: string) => void
  onClose: () => void
}) {
  useEscapeToClose(onClose)
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
        <div className="activity-picker-list">
          {activities.map((a) => (
            <button key={a.id} type="button" className="activity-picker-list__item" onClick={() => onPick(a.id)}>
              <span aria-hidden="true">{a.emoji}</span> {a.title}
            </button>
          ))}
        </div>
        <button type="button" className="text-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  )
}
