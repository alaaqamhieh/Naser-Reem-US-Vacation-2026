import type { DinnerIdea } from '../types'

export function DinnerCard({
  idea,
  isFavorite,
  onToggleFavorite,
  onEdit,
  onDelete,
}: {
  idea: DinnerIdea
  isFavorite: boolean
  onToggleFavorite: () => void
  onEdit?: () => void
  onDelete?: () => void
}) {
  return (
    <div className={`dinner-card ${idea.photo ? 'dinner-card--has-photo' : ''}`}>
      {idea.photo && (
        <img className="dinner-card__photo" src={`${import.meta.env.BASE_URL}${idea.photo}`} alt="" loading="lazy" />
      )}
      <div className="dinner-card__top">
        <span className="dinner-card__emoji" aria-hidden="true">
          {idea.emoji}
        </span>
        <button
          type="button"
          className={`icon-btn-sm dinner-card__heart ${isFavorite ? 'dinner-card__heart--on' : ''}`}
          aria-label={isFavorite ? `Remove ${idea.dish} from favorites` : `Favorite ${idea.dish}`}
          aria-pressed={isFavorite}
          onClick={onToggleFavorite}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <span className="dinner-card__dish">{idea.dish}</span>
      {idea.notes && <span className="dinner-card__notes">{idea.notes}</span>}
      {(onEdit || onDelete) && (
        <div className="dinner-card__actions">
          {onEdit && (
            <button type="button" className="icon-btn-sm" aria-label={`Edit ${idea.dish}`} onClick={onEdit}>
              ✏️
            </button>
          )}
          {onDelete && (
            <button type="button" className="icon-btn-sm" aria-label={`Delete ${idea.dish}`} onClick={onDelete}>
              🗑
            </button>
          )}
        </div>
      )}
    </div>
  )
}
