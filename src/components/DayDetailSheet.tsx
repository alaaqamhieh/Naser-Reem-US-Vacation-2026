import type { ActivityIdea, CalendarEntry, Milestone } from '../types'
import { dayLabel, formatTime12h } from '../dateUtils'
import { milestoneColor } from '../milestoneColors'
import { useEscapeToClose } from '../useEscapeToClose'
import { useConfirm } from '../useConfirm'
import { googleMapsUrl } from '../mapsLink'

function EntryRow({
  entry,
  activity,
  onEdit,
  onRemove,
}: {
  entry: CalendarEntry
  activity: ActivityIdea
  onEdit: () => void
  onRemove: () => void
}) {
  const { armed, trigger } = useConfirm(onRemove)
  const isMultiDay = !!entry.endDate && entry.endDate !== entry.date
  return (
    <li className={`day-sheet__entry day-sheet__entry--${activity.category}`}>
      <div className="day-sheet__entry-body">
        <span className="day-sheet__entry-title">
          <span aria-hidden="true">{activity.emoji}</span> {activity.title}
        </span>
        {(entry.startTime || entry.note || isMultiDay) && (
          <span className="day-sheet__entry-meta">
            {isMultiDay && (
              <span className="chip__time">
                {dayLabel(entry.date)} – {dayLabel(entry.endDate!)}
              </span>
            )}
            {entry.startTime && (
              <span className="chip__time">
                {formatTime12h(entry.startTime)}
                {entry.endTime ? `–${formatTime12h(entry.endTime)}` : ''}
              </span>
            )}
            {entry.note && <span className="day-sheet__entry-note">{entry.note}</span>}
          </span>
        )}
      </div>
      <div className="day-sheet__entry-actions">
        <button type="button" className="icon-btn-sm" aria-label={`Edit ${activity.title}`} onClick={onEdit}>
          ✏️
        </button>
        <a
          href={googleMapsUrl(activity.mapQuery ?? activity.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="icon-btn-sm"
          aria-label={`Open ${activity.title} in Google Maps`}
        >
          📍
        </a>
        <button
          type="button"
          className={`icon-btn-sm ${armed ? 'icon-btn-sm--confirm' : ''}`}
          aria-label={armed ? `Confirm remove ${activity.title}` : `Remove ${activity.title} from this day`}
          onClick={trigger}
        >
          {armed ? '✓?' : '🗑'}
        </button>
      </div>
    </li>
  )
}

/**
 * A day's full plans in a bottom sheet — the tap-a-day view for phones, where
 * the compact calendar grid only shows emoji.
 */
export function DayDetailSheet({
  date,
  entries,
  activities,
  milestones,
  onEditMilestone,
  onEditEntry,
  onRemoveEntry,
  onAddActivity,
  onClose,
}: {
  date: string
  entries: CalendarEntry[]
  activities: ActivityIdea[]
  milestones: Milestone[]
  onEditMilestone: (milestoneId: string) => void
  onEditEntry: (entryId: string) => void
  onRemoveEntry: (entryId: string) => void
  onAddActivity: () => void
  onClose: () => void
}) {
  useEscapeToClose(onClose)
  const byId = new Map(activities.map((a) => [a.id, a]))

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={`Plans for ${dayLabel(date)}`} onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-card__title">{dayLabel(date)}</h2>
        {milestones.map((m) => {
          const c = milestoneColor(m.color)
          return (
            <button
              key={m.id}
              type="button"
              className="day-sheet__milestone"
              style={{ background: c.soft, borderLeftColor: c.base, color: c.text }}
              onClick={() => onEditMilestone(m.id)}
            >
              <span aria-hidden="true">{m.emoji}</span>
              <span className="day-sheet__milestone-title">{m.title}</span>
              <span aria-hidden="true">✏️</span>
            </button>
          )
        })}

        {entries.length === 0 ? (
          <p className="modal-card__hint">Nothing planned yet — a free day is a good day too.</p>
        ) : (
          <ul className="day-sheet__entries">
            {entries.map((e) => {
              const activity = byId.get(e.activityId)
              if (!activity) return null
              return (
                <EntryRow
                  key={e.id}
                  entry={e}
                  activity={activity}
                  onEdit={() => onEditEntry(e.id)}
                  onRemove={() => onRemoveEntry(e.id)}
                />
              )
            })}
          </ul>
        )}

        <div className="modal-card__actions">
          <button type="button" className="primary-btn" onClick={onAddActivity}>
            + Add an activity
          </button>
          <button type="button" className="text-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
