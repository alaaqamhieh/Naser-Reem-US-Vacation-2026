import type { DinnerIdea } from '../types'
import { StarRating } from './StarRating'
import { googleMapsUrl } from '../mapsLink'

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
      {!!idea.popularity && <StarRating value={idea.popularity} />}
      {idea.notes && <span className="dinner-card__notes">{idea.notes}</span>}
      <div className="dinner-card__actions">
        <a
          href={googleMapsUrl(idea.mapQuery ?? `${idea.dish} restaurant near Richmond VA`)}
          target="_blank"
          rel="noopener noreferrer"
          className="icon-btn-sm"
          aria-label={`Find a restaurant serving ${idea.dish} on Google Maps`}
        >
          📍
        </a>
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
    </div>
  )
}
