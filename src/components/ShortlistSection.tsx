import type { ActivityIdea } from '../types'

/**
 * The places Naser & Reem hearted in the idea deck (or via a card's heart
 * button), each one tap away from landing on the calendar.
 */
export function ShortlistSection({
  shortlist,
  rejected,
  activities,
  scheduledIds,
  onPickDay,
  onUnheart,
  onRestore,
  onOpenDeck,
}: {
  shortlist: string[]
  rejected: string[]
  activities: ActivityIdea[]
  scheduledIds: Set<string>
  onPickDay: (activityId: string) => void
  onUnheart: (activityId: string) => void
  onRestore: (activityId: string) => void
  onOpenDeck: () => void
}) {
  const byId = new Map(activities.map((a) => [a.id, a]))
  const items = shortlist.map((id) => byId.get(id)).filter((a): a is ActivityIdea => !!a)
  const rejectedItems = rejected.map((id) => byId.get(id)).filter((a): a is ActivityIdea => !!a)

  return (
    <section className="shortlist-section" id="shortlist" aria-label="Shortlist">
      <h2 className="section-title">The Shortlist ❤️</h2>
      <p className="section-hint">
        Places Naser &amp; Reem picked from the idea deck — one tap to put them on a day.
      </p>

      {items.length === 0 ? (
        <div className="shortlist-empty">
          <p>Nothing hearted yet.</p>
          <button type="button" className="primary-btn" onClick={onOpenDeck}>
            💕 Play the Idea Deck
          </button>
        </div>
      ) : (
        <ul className="shortlist-list">
          {items.map((a) => (
            <li key={a.id} className={`shortlist-item shortlist-item--${a.category}`}>
              <span className="shortlist-item__emoji" aria-hidden="true">
                {a.emoji}
              </span>
              <div className="shortlist-item__body">
                <span className="shortlist-item__title">{a.title}</span>
                <span className="shortlist-item__meta">
                  {a.driveTime && <span>🚗 {a.driveTime} from home</span>}
                  {scheduledIds.has(a.id) && <span className="shortlist-item__scheduled">📅 on the calendar</span>}
                </span>
              </div>
              <div className="shortlist-item__actions">
                <button type="button" className="secondary-btn shortlist-item__pick" onClick={() => onPickDay(a.id)}>
                  Pick a day
                </button>
                <button
                  type="button"
                  className="shortlist-item__unheart"
                  aria-label={`Remove ${a.title} from the shortlist`}
                  onClick={() => onUnheart(a.id)}
                >
                  💔
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {rejectedItems.length > 0 && (
        <details className="rejected-list">
          <summary className="rejected-list__summary">
            🚫 Not for us ({rejectedItems.length}) — tap to review or bring back
          </summary>
          <ul className="rejected-list__items">
            {rejectedItems.map((a) => (
              <li key={a.id} className="rejected-list__item">
                <span aria-hidden="true">{a.emoji}</span>
                <span className="rejected-list__title">{a.title}</span>
                <button type="button" className="secondary-btn rejected-list__restore" onClick={() => onRestore(a.id)}>
                  ↩️ Bring back
                </button>
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  )
}
