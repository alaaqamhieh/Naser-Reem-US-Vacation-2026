import { dayLabel, tripPhase } from '../dateUtils'

function countdownText(today: string, tripStart: string, tripEnd: string): string {
  const phase = tripPhase(today, tripStart, tripEnd)
  if (phase.kind === 'before') {
    return phase.daysUntil === 1 ? '1 day until arrival! 🎉' : `${phase.daysUntil} days until arrival! 🎉`
  }
  if (phase.kind === 'during') {
    return `Day ${phase.dayNumber} of ${phase.totalDays} 🌿`
  }
  return 'Thank you for a wonderful visit — until next time! 💛'
}

export function Hero({
  dadName,
  momName,
  tripStart,
  tripEnd,
  today,
  subscribeUrl,
  feedUrl,
  onOpenDeck,
}: {
  dadName: string
  momName: string
  tripStart: string
  tripEnd: string
  today: string
  subscribeUrl: string
  feedUrl: string
  onOpenDeck: () => void
}) {
  return (
    <header className="hero">
      <p className="hero__eyebrow">Welcome to Richmond</p>
      <h1 className="hero__title">
        {dadName} &amp; {momName}
      </h1>
      <p className="hero__dates">
        {dayLabel(tripStart)} – {dayLabel(tripEnd)}
      </p>
      <p className="hero__countdown">{countdownText(today, tripStart, tripEnd)}</p>
      <p className="hero__message">
        We can't wait to have you with us. We've put together a few weeks of things to see,
        taste, and do together — drag any idea onto the calendar below, or dream up your own.
        This is your trip too, so make it yours.
      </p>
      <div className="hero__actions">
        <button type="button" className="primary-btn" onClick={onOpenDeck}>
          💕 Play the Idea Deck
        </button>
        <a href="#calendar" className="secondary-btn">
          See the Calendar
        </a>
        <a href="#ideas" className="secondary-btn">
          Browse Ideas
        </a>
        <a href={subscribeUrl} className="text-btn">
          🔔 Subscribe to the calendar
        </a>
      </div>
      <p className="hero__subscribe-hint">
        Tap "Subscribe" to link the shared itinerary into your phone's calendar app — it'll stay up to date
        automatically. (It shows the shared plan, not anyone's personal drag-and-drop changes on this site.) Calendar
        app doesn't open it?{' '}
        <a href={feedUrl} className="hero__subscribe-fallback">
          Download the file instead
        </a>
        .
      </p>
    </header>
  )
}
