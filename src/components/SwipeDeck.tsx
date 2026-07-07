import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import type { ActivityCategory, ActivityIdea } from '../types'
import { useEscapeToClose } from '../useEscapeToClose'
import { useBodyScrollLock } from '../useBodyScrollLock'
import { StarRating } from './StarRating'

const CATEGORY_LABELS: Record<ActivityCategory, string> = {
  'big-trip': 'Big Trip',
  garden: 'Garden',
  food: 'Food',
  home: 'Home & Family',
  local: 'Local',
  event: 'Event',
}

const FILTERS: { key: ActivityCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'big-trip', label: 'Big Trips' },
  { key: 'garden', label: 'Gardens' },
  { key: 'food', label: 'Food' },
  { key: 'home', label: 'Home' },
  { key: 'local', label: 'Local' },
  { key: 'event', label: 'Events' },
]

type Verdict = 'skip' | 'heart' | 'reject'

const VERDICT_ICON: Record<Verdict, string> = { heart: '❤️', skip: '↷', reject: '🚫' }
const VERDICT_LABEL: Record<Verdict, string> = { heart: 'Shortlist!', skip: 'Skip for now', reject: 'Not for us' }

const EXIT_MS = 300

const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Full-screen "idea deck". Three verdicts, all equally doable by swipe or by
 * the labeled buttons below the card (parents may find gestures fiddly):
 *   swipe right / ❤️  — add to the shortlist
 *   swipe left  / ↷   — skip for now (comes back next time the deck opens)
 *   swipe down  / 🚫  — not for us (hidden from future decks, restorable)
 */
export function SwipeDeck({
  candidates,
  heartedTotal,
  rejectedTotal,
  onHeart,
  onReject,
  onClose,
  onGoToShortlist,
}: {
  candidates: ActivityIdea[]
  heartedTotal: number
  rejectedTotal: number
  onHeart: (activityId: string) => void
  onReject: (activityId: string) => void
  onClose: () => void
  onGoToShortlist: () => void
}) {
  // Snapshot on mount: verdicts change the candidate list upstream, and the
  // deck must not shift under the user mid-run. Re-opening re-snapshots.
  const [deck] = useState(() => candidates)
  const [seen, setSeen] = useState<Set<string>>(() => new Set())
  const [filter, setFilter] = useState<ActivityCategory | 'all'>('all')
  const [heartedThisRun, setHeartedThisRun] = useState(0)
  const [exiting, setExiting] = useState<Verdict | null>(null)
  const [drag, setDrag] = useState<{ dx: number; dy: number } | null>(null)
  // Recent verdicts, most recent last — powers the Undo button.
  const [verdictHistory, setVerdictHistory] = useState<{ id: string; verdict: Verdict }[]>([])
  // Which picture of the top card's gallery is showing; resets on advance.
  const [photoIndex, setPhotoIndex] = useState(0)

  const cardRef = useRef<HTMLDivElement>(null)
  const start = useRef<{ x: number; y: number } | null>(null)
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEscapeToClose(onClose)
  useBodyScrollLock()

  // Android back button closes the deck instead of leaving the site. Push a
  // guard entry once (checking first keeps this idempotent under StrictMode's
  // double-mounted effects); never pop it programmatically — a stale entry
  // just means one silent back-press, which beats a close/reopen race.
  useEffect(() => {
    if (!history.state?.deck) history.pushState({ deck: true }, '')
    const onPop = () => onClose()
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => () => {
    if (exitTimer.current) clearTimeout(exitTimer.current)
  }, [])

  const inFilter = useMemo(
    () => deck.filter((a) => filter === 'all' || a.category === filter),
    [deck, filter],
  )
  const remaining = useMemo(() => inFilter.filter((a) => !seen.has(a.id)), [inFilter, seen])
  const current = remaining[0]
  const done = !current

  const advance = (verdict: Verdict, activityId: string) => {
    if (verdict === 'heart') {
      onHeart(activityId)
      setHeartedThisRun((n) => n + 1)
    } else if (verdict === 'reject') {
      onReject(activityId)
    }
    setSeen((prev) => new Set(prev).add(activityId))
    setVerdictHistory((prev) => [...prev, { id: activityId, verdict }])
    setExiting(null)
    setDrag(null)
    setPhotoIndex(0)
  }

  // Reverses the most recent verdict: onHeart/onReject are toggles upstream,
  // so calling them again flips the shortlist/rejected membership right back.
  const undoLast = () => {
    if (exiting || verdictHistory.length === 0) return
    const last = verdictHistory[verdictHistory.length - 1]
    if (last.verdict === 'heart') {
      onHeart(last.id)
      setHeartedThisRun((n) => Math.max(0, n - 1))
    } else if (last.verdict === 'reject') {
      onReject(last.id)
    }
    setSeen((prev) => {
      const next = new Set(prev)
      next.delete(last.id)
      return next
    })
    setVerdictHistory((prev) => prev.slice(0, -1))
  }

  const commit = (verdict: Verdict) => {
    if (!current || exiting) return
    if (prefersReducedMotion()) {
      advance(verdict, current.id)
      return
    }
    // Drop the inline drag transform so the CSS exit class takes over; the
    // transition interpolates from the card's last painted position.
    setDrag(null)
    setExiting(verdict)
    const id = current.id
    exitTimer.current = setTimeout(() => advance(verdict, id), EXIT_MS)
  }

  const onPointerDown = (e: ReactPointerEvent) => {
    if (exiting) return
    start.current = { x: e.clientX, y: e.clientY }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!start.current || exiting) return
    const dx = e.clientX - start.current.x
    const dy = e.clientY - start.current.y
    if (drag || Math.abs(dx) > 8 || Math.abs(dy) > 8) setDrag({ dx, dy })
  }

  const onPointerUp = () => {
    if (!start.current) return
    start.current = null
    const w = cardRef.current?.offsetWidth ?? 320
    const h = cardRef.current?.offsetHeight ?? 440
    if (drag && drag.dy > h * 0.3 && Math.abs(drag.dy) > Math.abs(drag.dx)) {
      commit('reject')
    } else if (drag && Math.abs(drag.dx) > w * 0.3) {
      commit(drag.dx > 0 ? 'heart' : 'skip')
    } else {
      setDrag(null) // rubber-band back via the card's resting transition
    }
  }

  const w = cardRef.current?.offsetWidth ?? 320
  const h = cardRef.current?.offsetHeight ?? 440
  const horizontal = drag ? Math.abs(drag.dx) >= Math.abs(drag.dy) : true
  const heartOpacity = drag && horizontal && drag.dx > 0 ? Math.min(1, drag.dx / (w * 0.3)) : 0
  const skipOpacity = drag && horizontal && drag.dx < 0 ? Math.min(1, -drag.dx / (w * 0.3)) : 0
  const rejectOpacity = drag && !horizontal && drag.dy > 0 ? Math.min(1, drag.dy / (h * 0.3)) : 0
  const rotation = drag ? Math.max(-16, Math.min(16, drag.dx * 0.06)) : 0

  // One centered "verdict" badge stands in for the old separate corner
  // stamps — driven by drag progress, or shown at full strength the instant
  // a verdict is committed (tap or completed swipe), so button taps get the
  // same satisfying confirmation as a swipe does.
  const activeVerdict: Verdict | null = exiting ?? (heartOpacity > 0 ? 'heart' : skipOpacity > 0 ? 'skip' : rejectOpacity > 0 ? 'reject' : null)
  const activeOpacity = exiting ? 1 : Math.max(heartOpacity, skipOpacity, rejectOpacity)

  const topCardStyle = drag
    ? {
        transform: `translate(${drag.dx}px, ${drag.dy * (horizontal ? 0.15 : 1)}px) rotate(${rotation}deg)`,
        transition: 'none',
      }
    : undefined

  return (
    <div className="deck-overlay" role="dialog" aria-modal="true" aria-label="Idea deck">
      <div className="deck__header">
        <button
          type="button"
          className="deck__undo"
          aria-label={verdictHistory.length > 0 ? `Undo: ${VERDICT_LABEL[verdictHistory[verdictHistory.length - 1].verdict]}` : 'Undo'}
          disabled={verdictHistory.length === 0}
          onClick={undoLast}
        >
          ↺
        </button>
        <div className="deck__progress" aria-hidden={done}>
          {!done && (
            <>
              <span className="deck__progress-label">{remaining.length} of {inFilter.length} ideas left</span>
              <div className="deck__progress-track">
                <div
                  className="deck__progress-fill"
                  style={{ width: `${inFilter.length ? ((inFilter.length - remaining.length) / inFilter.length) * 100 : 0}%` }}
                />
              </div>
            </>
          )}
        </div>
        <button type="button" className="deck__close" aria-label="Close the idea deck" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="deck__filters" role="tablist" aria-label="Filter ideas by type">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`deck__filter ${filter === f.key ? 'deck__filter--on' : ''}`}
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {done ? (
        <div className="deck__done">
          <div className="deck__done-emoji" aria-hidden="true">
            {inFilter.length === 0 ? '🎉' : heartedThisRun > 0 ? '💚' : '🌿'}
          </div>
          <h2 className="deck__done-title">
            {inFilter.length === 0 ? 'Nothing left in this group!' : "That's all of them!"}
          </h2>
          <p className="deck__done-text">
            {heartedThisRun > 0
              ? `You added ${heartedThisRun} ${heartedThisRun === 1 ? 'idea' : 'ideas'} to your shortlist${
                  heartedTotal > heartedThisRun ? ` (${heartedTotal} hearted in total)` : ''
                }.`
              : 'Skipped ideas will be waiting next time you open the deck.'}
            {rejectedTotal > 0 && ' Anything marked "not for us" can be brought back from the shortlist section.'}
          </p>
          <div className="deck__done-actions">
            <button type="button" className="primary-btn" onClick={onGoToShortlist}>
              ❤️ See your shortlist
            </button>
            <button type="button" className="text-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="deck__stage">
            {remaining.slice(0, 3).map((a, depth) => {
              const isTop = depth === 0
              const exitClass = isTop && exiting ? ` swipe-card--exit-${exiting}` : ''
              return (
                <div
                  key={a.id}
                  ref={isTop ? cardRef : undefined}
                  className={`swipe-card swipe-card--${a.category} swipe-card--depth-${depth}${exitClass} ${a.photo ? 'swipe-card--photo' : ''}`}
                  style={isTop ? topCardStyle : undefined}
                  onPointerDown={isTop ? onPointerDown : undefined}
                  onPointerMove={isTop ? onPointerMove : undefined}
                  onPointerUp={isTop ? onPointerUp : undefined}
                  onPointerCancel={isTop ? () => { start.current = null; setDrag(null) } : undefined}
                >
                  {isTop && activeVerdict && (
                    <div className="swipe-card__verdict" style={{ opacity: activeOpacity }}>
                      <div className={`swipe-card__verdict-ring swipe-card__verdict-ring--${activeVerdict}`} aria-hidden="true">
                        {VERDICT_ICON[activeVerdict]}
                      </div>
                      <span className="swipe-card__verdict-label">{VERDICT_LABEL[activeVerdict]}</span>
                    </div>
                  )}
                  {a.photo &&
                    (() => {
                      const gallery = [a.photo, ...(a.photos ?? [])]
                      const idx = isTop ? Math.min(photoIndex, gallery.length - 1) : 0
                      return (
                        <div className="swipe-card__photo-frame">
                          <img
                            className="swipe-card__photo"
                            src={`${import.meta.env.BASE_URL}${gallery[idx]}`}
                            alt=""
                            loading={depth === 0 ? 'eager' : 'lazy'}
                            draggable={false}
                          />
                          {isTop && gallery.length > 1 && (
                            <>
                              <button
                                type="button"
                                className="swipe-card__photo-nav swipe-card__photo-nav--prev"
                                aria-label="Previous picture"
                                onPointerDown={(e) => e.stopPropagation()}
                                onClick={() => setPhotoIndex((i) => (i - 1 + gallery.length) % gallery.length)}
                              >
                                ‹
                              </button>
                              <button
                                type="button"
                                className="swipe-card__photo-nav swipe-card__photo-nav--next"
                                aria-label="Next picture"
                                onPointerDown={(e) => e.stopPropagation()}
                                onClick={() => setPhotoIndex((i) => (i + 1) % gallery.length)}
                              >
                                ›
                              </button>
                              <div className="swipe-card__photo-dots" aria-hidden="true">
                                {gallery.map((g, i) => (
                                  <span key={g} className={`swipe-card__photo-dot ${i === idx ? 'swipe-card__photo-dot--on' : ''}`} />
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      )
                    })()}
                  <div className="swipe-card__body">
                    <h3 className="swipe-card__title">
                      <span aria-hidden="true">{a.emoji}</span> {a.title}
                    </h3>
                    {!!a.popularity && <StarRating value={a.popularity} />}
                    {(a.driveTime || a.stretchTrip) && (
                      <p className="swipe-card__meta">
                        {a.driveTime && <span className="swipe-card__drive">🚗 {a.driveTime} from home</span>}
                        {a.stretchTrip && <span className="activity-card__badge activity-card__badge--stretch">🧳 stretch trip</span>}
                      </p>
                    )}
                    <p className="swipe-card__desc">{a.description}</p>
                    <div className="swipe-card__badges">
                      {a.easyPace && <span className="activity-card__badge activity-card__badge--easy">🌿 easy pace</span>}
                      {a.firstVisitHighlight && (
                        <span className="activity-card__badge activity-card__badge--highlight">⭐ first-time must-see</span>
                      )}
                    </div>
                    <span className="swipe-card__category">{CATEGORY_LABELS[a.category]}</span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="deck__actions">
            <div className="deck__action">
              <button type="button" className="deck__btn deck__btn--skip" aria-label="Skip for now — it will come back later" onClick={() => commit('skip')}>
                ↷
              </button>
              <span className="deck__btn-label">Skip for now</span>
            </div>
            <div className="deck__action">
              <button type="button" className="deck__btn deck__btn--no" aria-label="Not for us — hide from future decks (you can bring it back)" onClick={() => commit('reject')}>
                🚫
              </button>
              <span className="deck__btn-label">Not for us</span>
            </div>
            <div className="deck__action">
              <button type="button" className="deck__btn deck__btn--yes" aria-label="Add to shortlist" onClick={() => commit('heart')}>
                ❤️
              </button>
              <span className="deck__btn-label">Love it!</span>
            </div>
          </div>
          <p className="deck__hint">
            Swipe right to shortlist, left to skip, down for "not for us" — or tap the buttons. Changed your mind? Tap
            ↺ to undo.
          </p>
        </>
      )}
    </div>
  )
}
