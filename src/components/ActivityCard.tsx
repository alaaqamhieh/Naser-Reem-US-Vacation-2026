import type { ActivityCategory, ActivityIdea } from '../types'
import { DragItem } from './DragItem'

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
}: {
  activity: ActivityIdea
  onChoose: (dropZone: string | null) => void
  onEdit?: () => void
  onDelete?: () => void
}) {
  return (
    <div className={`activity-card-wrap activity-card--${activity.category}`}>
      <DragItem
        ariaLabel={`${activity.title}. Drag onto a day, or tap to choose a day.`}
        onChoose={onChoose}
        className="activity-card"
      >
        <span className="activity-card__emoji" aria-hidden="true">
          {activity.emoji}
        </span>
        <span className="activity-card__title">{activity.title}</span>
        <span className="activity-card__desc">{activity.description}</span>
        {activity.tags && activity.tags.length > 0 && (
          <span className="activity-card__tags">{activity.tags.join(' · ')}</span>
        )}
        {(activity.easyPace || activity.firstVisitHighlight) && (
          <span className="activity-card__badges">
            {activity.easyPace && <span className="activity-card__badge activity-card__badge--easy">🌿 easy pace</span>}
            {activity.firstVisitHighlight && (
              <span className="activity-card__badge activity-card__badge--highlight">⭐ first-time must-see</span>
            )}
          </span>
        )}
        <span className="activity-card__category">{CATEGORY_LABELS[activity.category]}</span>
      </DragItem>
      {activity.isCustom && (
        <div className="activity-card__custom-actions">
          <button type="button" className="icon-btn-sm" aria-label={`Edit ${activity.title}`} onClick={onEdit}>
            ✏️
          </button>
          <button type="button" className="icon-btn-sm" aria-label={`Delete ${activity.title}`} onClick={onDelete}>
            🗑
          </button>
        </div>
      )}
    </div>
  )
}
