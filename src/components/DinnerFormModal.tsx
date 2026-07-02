import { useState } from 'react'
import type { DinnerIdea } from '../types'
import { useEscapeToClose } from '../useEscapeToClose'
import { useConfirm } from '../useConfirm'

/**
 * Add or edit a dinner-night idea — a shared brainstorm list, so anyone in
 * the family can pitch a dish, tweak one, or remove it.
 */
export function DinnerFormModal({
  initial,
  cuisines,
  onSave,
  onClose,
  onDelete,
}: {
  initial?: DinnerIdea
  cuisines: string[]
  onSave: (data: { dish: string; cuisine: string; emoji: string; notes: string }) => void
  onClose: () => void
  onDelete?: () => void
}) {
  useEscapeToClose(onClose)
  const [dish, setDish] = useState(initial?.dish ?? '')
  const [cuisine, setCuisine] = useState(initial?.cuisine ?? cuisines[0] ?? '')
  const [emoji, setEmoji] = useState(initial?.emoji ?? '🍽️')
  const [notes, setNotes] = useState(initial?.notes ?? '')
  const { armed, trigger } = useConfirm(onDelete ?? (() => {}))

  const canSave = dish.trim().length > 0 && cuisine.trim().length > 0

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={initial ? 'Edit dinner idea' : 'Add a dinner idea'}
      onClick={onClose}
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-card__title">{initial ? 'Edit Dinner Idea' : 'Add a Dinner Idea'}</h2>

        <label className="form-field">
          <span>Emoji</span>
          <input
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            maxLength={4}
            className="form-input form-input--emoji"
          />
        </label>

        <label className="form-field">
          <span>Dish</span>
          <input
            value={dish}
            onChange={(e) => setDish(e.target.value)}
            className="form-input"
            placeholder="e.g. Chicken Biryani"
          />
        </label>

        <label className="form-field">
          <span>Cuisine</span>
          <input
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="form-input"
            placeholder="e.g. Indian"
            list="dinner-cuisine-options"
          />
          <datalist id="dinner-cuisine-options">
            {cuisines.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </label>

        <label className="form-field">
          <span>Notes (optional)</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="form-input form-input--textarea"
            rows={2}
            placeholder="What makes it good, what it's served with…"
          />
        </label>

        <div className="modal-card__actions">
          <button
            type="button"
            className="primary-btn"
            disabled={!canSave}
            onClick={() =>
              onSave({
                dish: dish.trim(),
                cuisine: cuisine.trim(),
                emoji: emoji.trim() || '🍽️',
                notes: notes.trim(),
              })
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
