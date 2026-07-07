import type { ActivityCategory, ActivityIdea } from '../types'
import { DragItem } from './DragItem'
import { StarRating } from './StarRating'
import { googleMapsUrl } from '../mapsLink'

const CATEGORY_LABELS: Record<ActivityCategory, string> = {
  'big-trip': 'Big Trip',
  garden: 'Garden',
  food: 'Food',
  home: 'Home & Family',
  local: 'Local',
  event: 'Event',
}

export function ActivityCard({
  activity,
  onChoose,
  onEdit,
  onDelete,
  isShortlisted,
  onToggleShortlist,
}: {
  activity: ActivityIdea
  onChoose: (dropZone: string | null) => void
  onEdit?: () => void
  onDelete?: () => void
  isShortlisted?: boolean
  onToggleShortlist?: () => void
}) {
  return (
    <div className={`activity-card-wrap activity-card--${activity.category}`}>
      <DragItem
        ariaLabel={`${activity.title}. Drag onto a day, or tap to choose a day.`}
        onChoose={onChoose}
        className={`activity-card ${activity.photo ? 'activity-card--has-photo' : ''}`}
      >
        {activity.photo && (
          <img
            className="activity-card__photo"
            src={`${import.meta.env.BASE_URL}${activity.photo}`}
            alt=""
            loading="lazy"
            draggable={false}
          />
        )}
        <span className="activity-card__emoji" aria-hidden="true">
          {activity.emoji}
        </span>
        <span className="activity-card__title">{activity.title}</span>
        {!!activity.popularity && <StarRating value={activity.popularity} />}
        {activity.driveTime && <span className="activity-card__drive">🚗 {activity.driveTime} from home</span>}
        <span className="activity-card__desc">{activity.description}</span>
        {activity.tags && activity.tags.length > 0 && (
          <span className="activity-card__tags">{activity.tags.join(' · ')}</span>
        )}
        {(activity.easyPace || activity.firstVisitHighlight || activity.stretchTrip) && (
          <span className="activity-card__badges">
            {activity.easyPace && <span className="activity-card__badge activity-card__badge--easy">🌿 easy pace</span>}
            {activity.firstVisitHighlight && (
              <span className="activity-card__badge activity-card__badge--highlight">⭐ first-time must-see</span>
            )}
            {activity.stretchTrip && (
              <span className="activity-card__badge activity-card__badge--stretch">🧳 stretch trip</span>
            )}
          </span>
        )}
        <span className="activity-card__category">{CATEGORY_LABELS[activity.category]}</span>
      </DragItem>
      <button type="button" className="activity-card__schedule-btn" onClick={() => onChoose(null)}>
        📅 Pick a day
      </button>
      <a
        href={googleMapsUrl(activity.mapQuery ?? activity.title)}
        target="_blank"
        rel="noopener noreferrer"
        className="activity-card__maps-btn"
        onClick={(e) => e.stopPropagation()}
      >
        📍 Maps
      </a>
      <div className="activity-card__corner-actions">
        {activity.isCustom && (
          <>
            <button type="button" className="icon-btn-sm" aria-label={`Edit ${activity.title}`} onClick={onEdit}>
              ✏️
            </button>
            <button type="button" className="icon-btn-sm" aria-label={`Delete ${activity.title}`} onClick={onDelete}>
              🗑
            </button>
          </>
        )}
        {onToggleShortlist && (
          <button
            type="button"
            className={`icon-btn-sm activity-card__heart ${isShortlisted ? 'activity-card__heart--on' : ''}`}
            aria-label={isShortlisted ? `Remove ${activity.title} from the shortlist` : `Add ${activity.title} to the shortlist`}
            aria-pressed={!!isShortlisted}
            onClick={onToggleShortlist}
          >
            {isShortlisted ? '❤️' : '🤍'}
          </button>
        )}
      </div>
    </div>
  )
}
