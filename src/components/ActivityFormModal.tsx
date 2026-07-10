import { useState } from 'react'
import type { ActivityCategory, ActivityIdea } from '../types'
import { useEscapeToClose } from '../useEscapeToClose'
import { useConfirm } from '../useConfirm'
import { EmojiPicker } from './EmojiPicker'

const CATEGORY_OPTIONS: { key: ActivityCategory; label: string }[] = [
  { key: 'big-trip', label: 'Big Trip' },
  { key: 'garden', label: 'Garden' },
  { key: 'food', label: 'Food' },
  { key: 'home', label: 'Home & Family' },
  { key: 'local', label: 'Local' },
  { key: 'event', label: 'Event' },
]

export function ActivityFormModal({
  initial,
  initialTitle,
  onSave,
  onClose,
  onDelete,
}: {
  initial?: ActivityIdea
  initialTitle?: string
  onSave: (data: { title: string; emoji: string; category: ActivityCategory; description: string }) => void
  onClose: () => void
  onDelete?: () => void
}) {
  useEscapeToClose(onClose)
  const [title, setTitle] = useState(initial?.title ?? initialTitle ?? '')
  const [emoji, setEmoji] = useState(initial?.emoji ?? '✨')
  const [category, setCategory] = useState<ActivityCategory>(initial?.category ?? 'home')
  const [description, setDescription] = useState(initial?.description ?? '')
  const { armed, trigger } = useConfirm(onDelete ?? (() => {}))

  const canSave = title.trim().length > 0

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={initial ? 'Edit idea' : 'Add a new idea'}
      onClick={onClose}
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-card__title">{initial ? 'Edit Idea' : 'Add Your Own Idea'}</h2>

        <div className="form-field">
          <span>Emoji</span>
          <EmojiPicker value={emoji} onChange={setEmoji} />
        </div>

        <label className="form-field">
          <span>Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="e.g. Sunset picnic by the river"
          />
        </label>

        <label className="form-field">
          <span>Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ActivityCategory)}
            className="form-input"
          >
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span>Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input form-input--textarea"
            rows={3}
            placeholder="A short note about the idea"
          />
        </label>

        <div className="modal-card__actions">
          <button
            type="button"
            className="primary-btn"
            disabled={!canSave}
            onClick={() =>
              onSave({ title: title.trim(), emoji: emoji.trim() || '✨', category, description: description.trim() })
            }
          >
            Save
          </button>
          {onDelete && (
            <button
              type="button"
              className={`danger-btn ${armed ? 'danger-btn--confirm' : ''}`}
              onClick={trigger}
            >
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
