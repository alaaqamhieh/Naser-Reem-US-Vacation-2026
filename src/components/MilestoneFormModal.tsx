import { useState } from 'react'
import type { Milestone } from '../types'
import { dayLabel, tripDates } from '../dateUtils'
import { useEscapeToClose } from '../useEscapeToClose'
import { useConfirm } from '../useConfirm'

/**
 * Create or edit a special date — a flight, a travel window, an anniversary.
 * Special dates can span multiple days and show as gold ribbons on the calendar.
 */
export function MilestoneFormModal({
  initial,
  tripStart,
  tripEnd,
  onSave,
  onDelete,
  onClose,
}: {
  initial?: Milestone
  tripStart: string
  tripEnd: string
  onSave: (data: { title: string; emoji: string; start: string; end: string }) => void
  onDelete?: () => void
  onClose: () => void
}) {
  useEscapeToClose(onClose)
  const [title, setTitle] = useState(initial?.title ?? '')
  const [emoji, setEmoji] = useState(initial?.emoji ?? '✈️')
  const [start, setStart] = useState(initial?.start ?? tripStart)
  const [end, setEnd] = useState(initial?.end ?? initial?.start ?? tripStart)
  const { armed, trigger } = useConfirm(onDelete ?? (() => {}))
  const dates = tripDates(tripStart, tripEnd)
  const canSave = title.trim().length > 0

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={initial ? 'Edit special date' : 'Add a special date'}
      onClick={onClose}
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-card__title">{initial ? 'Edit Special Date' : 'Add a Special Date'}</h2>
        <p className="modal-card__hint">Flights, travel days, anniversaries — they show as gold ribbons on the calendar and can span several days.</p>

        <label className="form-field">
          <span>Emoji</span>
          <input value={emoji} onChange={(e) => setEmoji(e.target.value)} maxLength={4} className="form-input form-input--emoji" />
        </label>

        <label className="form-field">
          <span>Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="e.g. Cousins visiting from Texas"
          />
        </label>

        <div className="form-row">
          <label className="form-field">
            <span>First day</span>
            <select
              value={start}
              onChange={(e) => {
                setStart(e.target.value)
                if (e.target.value > end) setEnd(e.target.value)
              }}
              className="form-input"
            >
              {dates.map((d) => (
                <option key={d} value={d}>
                  {dayLabel(d)}
                </option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <span>Last day</span>
            <select value={end} onChange={(e) => setEnd(e.target.value)} className="form-input">
              {dates
                .filter((d) => d >= start)
                .map((d) => (
                  <option key={d} value={d}>
                    {dayLabel(d)}
                  </option>
                ))}
            </select>
          </label>
        </div>

        <div className="modal-card__actions">
          <button
            type="button"
            className="primary-btn"
            disabled={!canSave}
            onClick={() => onSave({ title: title.trim(), emoji: emoji.trim() || '✈️', start, end: end < start ? start : end })}
          >
            Save
          </button>
          {onDelete && (
            <button type="button" className={`danger-btn ${armed ? 'danger-btn--confirm' : ''}`} onClick={trigger}>
              {armed ? 'Really delete?' : 'Delete'}
            </button>
          )}
          <button type="button" className="text-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
