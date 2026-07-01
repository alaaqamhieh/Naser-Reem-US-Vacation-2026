import { dayLabel, tripDates } from '../dateUtils'
import { useEscapeToClose } from '../useEscapeToClose'

export function DatePickerModal({
  tripStart,
  tripEnd,
  title,
  onPick,
  onClose,
}: {
  tripStart: string
  tripEnd: string
  title: string
  onPick: (date: string) => void
  onClose: () => void
}) {
  useEscapeToClose(onClose)
  const dates = tripDates(tripStart, tripEnd)
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-card__title">{title}</h2>
        <p className="modal-card__hint">Choose a day to add this to.</p>
        <div className="date-grid">
          {dates.map((d) => (
            <button key={d} type="button" className="date-grid__item" onClick={() => onPick(d)}>
              {dayLabel(d)}
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
