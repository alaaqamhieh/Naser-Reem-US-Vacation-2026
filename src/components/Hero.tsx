import { dayLabel } from '../dateUtils'

export function Hero({
  dadName,
  momName,
  tripStart,
  tripEnd,
  onExportAll,
}: {
  dadName: string
  momName: string
  tripStart: string
  tripEnd: string
  onExportAll: () => void
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
      <p className="hero__message">
        We can't wait to have you with us. We've put together a few weeks of things to see,
        taste, and do together — drag any idea onto the calendar below, or dream up your own.
        This is your trip too, so make it yours.
      </p>
      <div className="hero__actions">
        <a href="#calendar" className="primary-btn">
          See the Calendar
        </a>
        <a href="#ideas" className="secondary-btn">
          Browse Ideas
        </a>
        <button type="button" className="text-btn" onClick={onExportAll}>
          📅 Export whole itinerary
        </button>
      </div>
    </header>
  )
}
