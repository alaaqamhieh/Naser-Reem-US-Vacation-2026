import { dayLabel, groupByMonth, monthLabel, tripDates } from '../dateUtils'
import type { CalendarEntry } from '../types'
import { useEscapeToClose } from '../useEscapeToClose'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function DatePickerModal({
  tripStart,
  tripEnd,
  title,
  entries,
  today,
  onPick,
  onClose,
}: {
  tripStart: string
  tripEnd: string
  title: string
  entries: CalendarEntry[]
  today?: string
  onPick: (date: string) => void
  onClose: () => void
}) {
  useEscapeToClose(onClose)
  const months = groupByMonth(tripDates(tripStart, tripEnd))
  const busy = new Set(entries.map((e) => e.date))

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-card__title">{title}</h2>
        <p className="modal-card__hint">
          Choose a day to add this to. A <span className="date-grid__dot date-grid__dot--inline" aria-hidden="true" /> means
          that day already has plans.
        </p>
        <div className="date-grid-months">
          {months.map((m) => (
            <div key={`${m.year}-${m.month}`}>
              <h3 className="date-grid__month-label">{monthLabel(m.year, m.month)}</h3>
              <div className="date-grid">
                {m.dates.map((d) => {
                  const weekday = WEEKDAYS[new Date(`${d}T00:00:00Z`).getUTCDay()]
                  const isBusy = busy.has(d)
                  const isToday = d === today
                  return (
                    <button
                      key={d}
                      type="button"
                      className={`date-grid__item ${isToday ? 'date-grid__item--today' : ''}`}
                      aria-label={`${dayLabel(d)}${isBusy ? ', already has plans' : ''}${isToday ? ', today' : ''}`}
                      onClick={() => onPick(d)}
                    >
                      <span className="date-grid__weekday">{weekday}</span>
                      <span className="date-grid__daynum">{Number(d.slice(8, 10))}</span>
                      {isBusy && <span className="date-grid__dot" aria-hidden="true" />}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
        <button type="button" className="text-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  )
}
