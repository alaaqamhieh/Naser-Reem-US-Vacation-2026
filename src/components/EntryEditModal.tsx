import { useState } from 'react'
import type { ActivityIdea, CalendarEntry } from '../types'
import { dayLabel, tripDates } from '../dateUtils'
import { useEscapeToClose } from '../useEscapeToClose'

/**
 * Edit a scheduled plan: move it (or stretch it across several days), give it
 * a time, or leave a note — the friendly "change your mind" affordance for
 * the calendar.
 */
export function EntryEditModal({
  entry,
  activity,
  tripStart,
  tripEnd,
  onSave,
  onClose,
}: {
  entry: CalendarEntry
  activity: ActivityIdea
  tripStart: string
  tripEnd: string
  onSave: (patch: { date: string; endDate?: string; note?: string; startTime?: string; endTime?: string }) => void
  onClose: () => void
}) {
  useEscapeToClose(onClose)
  const [date, setDate] = useState(entry.date)
  const [endDate, setEndDate] = useState(entry.endDate ?? entry.date)
  const [startTime, setStartTime] = useState(entry.startTime ?? '')
  const [endTime, setEndTime] = useState(entry.endTime ?? '')
  const [note, setNote] = useState(entry.note ?? '')
  const dates = tripDates(tripStart, tripEnd)

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={`Edit ${activity.title}`} onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-card__title">
          <span aria-hidden="true">{activity.emoji}</span> Edit "{activity.title}"
        </h2>
        <p className="modal-card__hint">Stretch the last day forward to make this plan span several days.</p>

        <div className="form-row">
          <label className="form-field">
            <span>First day</span>
            <select
              value={date}
              onChange={(e) => {
                setDate(e.target.value)
                if (e.target.value > endDate) setEndDate(e.target.value)
              }}
              className="form-input"
            >
              {dates.map((d) => (
                <option key={d} value={d}>
                  {dayLabel(d)}
                </option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <span>Last day</span>
            <select value={endDate} onChange={(e) => setEndDate(e.target.value)} className="form-input">
              {dates
                .filter((d) => d >= date)
                .map((d) => (
                  <option key={d} value={d}>
                    {dayLabel(d)}
                  </option>
                ))}
            </select>
          </label>
        </div>

        <div className="form-row">
          <label className="form-field">
            <span>Starts (optional)</span>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="form-input" />
          </label>
          <label className="form-field">
            <span>Ends (optional)</span>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="form-input" />
          </label>
        </div>

        <label className="form-field">
          <span>Note</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="form-input form-input--textarea"
            rows={2}
            placeholder="e.g. Leave by 9am, pack sunscreen"
          />
        </label>

        <div className="modal-card__actions">
          <button
            type="button"
            className="primary-btn"
            onClick={() =>
              onSave({
                date,
                endDate: endDate !== date ? endDate : undefined,
                note: note.trim() || undefined,
                startTime: startTime || undefined,
                endTime: endTime || undefined,
              })
            }
          >
            Save
          </button>
          <button type="button" className="text-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
