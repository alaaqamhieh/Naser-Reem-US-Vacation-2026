import { useState } from 'react'
import type { Milestone } from '../types'
import { dayLabel, tripDates } from '../dateUtils'
import { DEFAULT_MILESTONE_COLOR, MILESTONE_COLORS } from '../milestoneColors'
import { useEscapeToClose } from '../useEscapeToClose'
import { useConfirm } from '../useConfirm'

/**
 * Create or edit a special date — a flight, a travel window, an anniversary.
 * Special dates can span multiple days and tint the calendar days they cover
 * in a color you pick.
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
  onSave: (data: { title: string; emoji: string; start: string; end: string; color: string }) => void
  onDelete?: () => void
  onClose: () => void
}) {
  useEscapeToClose(onClose)
  const [title, setTitle] = useState(initial?.title ?? '')
  const [emoji, setEmoji] = useState(initial?.emoji ?? '✈️')
  const [start, setStart] = useState(initial?.start ?? tripStart)
  const [end, setEnd] = useState(initial?.end ?? initial?.start ?? tripStart)
  const [color, setColor] = useState(initial?.color ?? DEFAULT_MILESTONE_COLOR)
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
        <p className="modal-card__hint">
          Flights, travel days, anniversaries — pick a color and they tint the calendar days they cover, and can span several days.
        </p>

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

        <div className="form-field">
          <span>Color</span>
          <div className="color-swatches" role="radiogroup" aria-label="Milestone color">
            {MILESTONE_COLORS.map((c) => (
              <button
                key={c.key}
                type="button"
                role="radio"
                aria-checked={color === c.key}
                aria-label={c.label}
                title={c.label}
                className={`color-swatch ${color === c.key ? 'color-swatch--on' : ''}`}
                style={{ background: c.base }}
                onClick={() => setColor(c.key)}
              />
            ))}
          </div>
        </div>

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
            onClick={() =>
              onSave({ title: title.trim(), emoji: emoji.trim() || '✈️', start, end: end < start ? start : end, color })
            }
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
