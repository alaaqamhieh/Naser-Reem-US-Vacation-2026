import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import type { ActivityCategory, ActivityIdea } from '../types'
import { useEscapeToClose } from '../useEscapeToClose'
import { useBodyScrollLock } from '../useBodyScrollLock'

const CATEGORY_LABELS: Record<ActivityCategory, string> = {
  'big-trip': 'Big Trip',
  garden: 'Garden',
  food: 'Food',
  home: 'Home & Family',
  local: 'Local',
  event: 'Event',
}

const EXIT_MS = 300

const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Full-screen "idea deck": swipe a card right to shortlist it, left to skip.
 * Big heart/skip buttons run the same commit path, so tapping works exactly
 * like swiping — important for parents who may find swipe gestures fiddly.
 */
export function SwipeDeck({
  candidates,
  heartedTotal,
  onHeart,
  onClose,
  onGoToShortlist,
}: {
  candidates: ActivityIdea[]
  heartedTotal: number
  onHeart: (activityId: string) => void
  onClose: () => void
  onGoToShortlist: () => void
}) {
  // Snapshot on mount: hearting changes the candidates upstream, and the deck
  // must not shift under the user mid-run. Re-opening takes a fresh snapshot.
  const [deck] = useState(() => candidates)
  const [index, setIndex] = useState(0)
  const [heartedThisRun, setHeartedThisRun] = useState(0)
  const [exiting, setExiting] = useState<'left' | 'right' | null>(null)
  const [drag, setDrag] = useState<{ dx: number; dy: number } | null>(null)

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

  const current = deck[index]
  const done = index >= deck.length

  const advance = (direction: 'left' | 'right', activityId: string) => {
    if (direction === 'right') {
      onHeart(activityId)
      setHeartedThisRun((n) => n + 1)
    }
    setIndex((i) => i + 1)
    setExiting(null)
    setDrag(null)
  }

  const commit = (direction: 'left' | 'right') => {
    if (!current || exiting) return
    if (prefersReducedMotion()) {
      advance(direction, current.id)
      return
    }
    // Drop the inline drag transform so the CSS exit class takes over; the
    // transition interpolates from the card's last painted position.
    setDrag(null)
    setExiting(direction)
    exitTimer.current = setTimeout(() => advance(direction, current.id), EXIT_MS)
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
    if (drag || Math.abs(dx) > 8) setDrag({ dx, dy })
  }

  const onPointerUp = () => {
    if (!start.current) return
    start.current = null
    const width = cardRef.current?.offsetWidth ?? 320
    if (drag && Math.abs(drag.dx) > width * 0.3) {
      commit(drag.dx > 0 ? 'right' : 'left')
    } else {
      setDrag(null) // rubber-band back via the card's resting transition
    }
  }

  const width = cardRef.current?.offsetWidth ?? 320
  const stampOpacity = drag ? Math.min(1, Math.abs(drag.dx) / (width * 0.3)) : 0
  const rotation = drag ? Math.max(-16, Math.min(16, drag.dx * 0.06)) : 0

  const topCardStyle = drag
    ? {
        transform: `translate(${drag.dx}px, ${drag.dy * 0.15}px) rotate(${rotation}deg)`,
        transition: 'none',
      }
    : undefined

  return (
    <div className="deck-overlay" role="dialog" aria-modal="true" aria-label="Idea deck">
      <div className="deck__header">
        <div className="deck__progress" aria-hidden={done}>
          {!done && (
            <>
              <span className="deck__progress-label">
                Idea {Math.min(index + 1, deck.length)} of {deck.length}
              </span>
              <div className="deck__progress-track">
                <div className="deck__progress-fill" style={{ width: `${(index / Math.max(1, deck.length)) * 100}%` }} />
              </div>
            </>
          )}
        </div>
        <button type="button" className="deck__close" aria-label="Close the idea deck" onClick={onClose}>
          ✕
        </button>
      </div>

      {done ? (
        <div className="deck__done">
          <div className="deck__done-emoji" aria-hidden="true">
            {deck.length === 0 ? '🎉' : heartedThisRun > 0 ? '💚' : '🌿'}
          </div>
          <h2 className="deck__done-title">
            {deck.length === 0 ? "You've sorted every idea!" : "That's all of them!"}
          </h2>
          <p className="deck__done-text">
            {deck.length === 0
              ? 'Everything is already hearted or on the calendar — check the shortlist, or add your own idea below.'
              : heartedThisRun === 0
                ? 'Nothing caught your eye this round — you can always browse the full list of ideas below.'
                : `You added ${heartedThisRun} ${heartedThisRun === 1 ? 'idea' : 'ideas'} to your shortlist${
                    heartedTotal > heartedThisRun ? ` (${heartedTotal} hearted in total)` : ''
                  }.`}
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
            {deck.slice(index, index + 3).map((a, depth) => {
              const isTop = depth === 0
              const exitClass = isTop && exiting ? ` swipe-card--exit-${exiting}` : ''
              return (
                <div
                  key={a.id}
                  ref={isTop ? cardRef : undefined}
                  className={`swipe-card swipe-card--${a.category} swipe-card--depth-${depth}${exitClass}`}
                  style={isTop ? topCardStyle : undefined}
                  onPointerDown={isTop ? onPointerDown : undefined}
                  onPointerMove={isTop ? onPointerMove : undefined}
                  onPointerUp={isTop ? onPointerUp : undefined}
                  onPointerCancel={isTop ? () => { start.current = null; setDrag(null) } : undefined}
                >
                  {isTop && (
                    <>
                      <div className="swipe-card__stamp swipe-card__stamp--yes" style={{ opacity: drag && drag.dx > 0 ? stampOpacity : 0 }}>
                        ❤️ Shortlist!
                      </div>
                      <div className="swipe-card__stamp swipe-card__stamp--no" style={{ opacity: drag && drag.dx < 0 ? stampOpacity : 0 }}>
                        ✖️ Skip
                      </div>
                    </>
                  )}
                  <span className="swipe-card__emoji" aria-hidden="true">{a.emoji}</span>
                  <h3 className="swipe-card__title">{a.title}</h3>
                  {(a.driveTime || a.stretchTrip) && (
                    <p className="swipe-card__meta">
                      {a.driveTime && <span className="swipe-card__drive">🚗 {a.driveTime}</span>}
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
              )
            })}
          </div>

          <div className="deck__actions">
            <button type="button" className="deck__btn deck__btn--no" aria-label="Skip this idea" onClick={() => commit('left')}>
              ✕
            </button>
            <button type="button" className="deck__btn deck__btn--yes" aria-label="Add to shortlist" onClick={() => commit('right')}>
              ❤️
            </button>
          </div>
          <p className="deck__hint">Swipe right to shortlist, left to skip — or just tap the buttons.</p>
        </>
      )}
    </div>
  )
}
