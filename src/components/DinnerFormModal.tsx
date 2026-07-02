import { useEffect, useMemo, useRef, useState } from 'react'
import type { DinnerIdea } from '../types'
import { DINNER_KNOWLEDGE } from '../dinnerKnowledge'
import { useEscapeToClose } from '../useEscapeToClose'
import { useConfirm } from '../useConfirm'
import { EmojiPicker } from './EmojiPicker'

/**
 * Add or edit a dinner-night idea — a shared brainstorm list, so anyone in
 * the family can pitch a dish, tweak one, or remove it. Typing a dish name
 * that matches our little built-in dish knowledge base offers a one-tap
 * autofill for cuisine, emoji, notes, and a photo.
 */
export function DinnerFormModal({
  initial,
  initialCuisine,
  cuisines,
  onSave,
  onClose,
  onDelete,
}: {
  initial?: DinnerIdea
  initialCuisine?: string
  cuisines: string[]
  onSave: (data: { dish: string; cuisine: string; emoji: string; notes: string; photo?: string }) => void
  onClose: () => void
  onDelete?: () => void
}) {
  useEscapeToClose(onClose)
  const [dish, setDish] = useState(initial?.dish ?? '')
  const [cuisine, setCuisine] = useState(initial?.cuisine ?? initialCuisine ?? cuisines[0] ?? '')
  const [emoji, setEmoji] = useState(initial?.emoji ?? '🍽️')
  const [notes, setNotes] = useState(initial?.notes ?? '')
  const [photo, setPhoto] = useState(initial?.photo)
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const { armed, trigger } = useConfirm(onDelete ?? (() => {}))
  const suggestionsRef = useRef<HTMLDivElement>(null)

  const suggestions = useMemo(() => {
    const q = dish.trim().toLowerCase()
    if (!q) return []
    return DINNER_KNOWLEDGE.filter((k) => k.dish.toLowerCase().includes(q)).slice(0, 6)
  }, [dish])

  useEffect(() => {
    if (!suggestionsOpen) return
    const onDocPointerDown = (e: PointerEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) setSuggestionsOpen(false)
    }
    document.addEventListener('pointerdown', onDocPointerDown)
    return () => document.removeEventListener('pointerdown', onDocPointerDown)
  }, [suggestionsOpen])

  const pickSuggestion = (k: (typeof DINNER_KNOWLEDGE)[number]) => {
    setDish(k.dish)
    setCuisine(k.cuisine)
    setEmoji(k.emoji)
    setNotes(k.notes)
    setPhoto(k.photo)
    setSuggestionsOpen(false)
  }

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

        <div className="form-field">
          <span>Emoji</span>
          <EmojiPicker value={emoji} onChange={setEmoji} />
        </div>

        <div className="form-field dinner-form__dish-field" ref={suggestionsRef}>
          <span>Dish</span>
          <input
            value={dish}
            onChange={(e) => {
              setDish(e.target.value)
              setPhoto(undefined)
              setSuggestionsOpen(true)
            }}
            onFocus={() => setSuggestionsOpen(true)}
            className="form-input"
            placeholder="e.g. Chicken Biryani"
            autoComplete="off"
          />
          {suggestionsOpen && suggestions.length > 0 && (
            <div className="dinner-form__suggestions" role="listbox" aria-label="Matching dishes">
              {suggestions.map((k) => (
                <button
                  key={k.dish}
                  type="button"
                  className="dinner-form__suggestion"
                  onClick={() => pickSuggestion(k)}
                >
                  {k.photo && <img src={`${import.meta.env.BASE_URL}${k.photo}`} alt="" className="dinner-form__suggestion-photo" />}
                  <span aria-hidden="true">{k.emoji}</span>
                  <span className="dinner-form__suggestion-text">
                    <strong>{k.dish}</strong> <span className="dinner-form__suggestion-cuisine">{k.cuisine}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
          <p className="form-hint">Matches from our dish list fill in cuisine, emoji, notes, and a photo for you.</p>
        </div>

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
                photo,
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
