import { useState } from 'react'
import type { TripSettings } from '../types'
import { DEFAULT_SETTINGS } from '../data'
import { useEscapeToClose } from '../useEscapeToClose'

/**
 * Trip-wide settings — names and the trip date range — editable without
 * touching code, since flights (and plans) can change.
 */
export function SettingsModal({
  settings,
  onSave,
  onClose,
}: {
  settings: TripSettings
  onSave: (patch: Partial<TripSettings>) => void
  onClose: () => void
}) {
  useEscapeToClose(onClose)
  const [dadName, setDadName] = useState(settings.dadName)
  const [momName, setMomName] = useState(settings.momName)
  const [tripStart, setTripStart] = useState(settings.tripStart)
  const [tripEnd, setTripEnd] = useState(settings.tripEnd)

  const canSave = dadName.trim().length > 0 && momName.trim().length > 0 && tripStart <= tripEnd

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Settings" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-card__title">⚙️ Settings</h2>
        <p className="modal-card__hint">Names and trip dates — update these if flights or plans change.</p>

        <div className="form-row">
          <label className="form-field">
            <span>Dad's name</span>
            <input value={dadName} onChange={(e) => setDadName(e.target.value)} className="form-input" />
          </label>
          <label className="form-field">
            <span>Mom's name</span>
            <input value={momName} onChange={(e) => setMomName(e.target.value)} className="form-input" />
          </label>
        </div>

        <div className="form-row">
          <label className="form-field">
            <span>Trip start</span>
            <input
              type="date"
              value={tripStart}
              onChange={(e) => setTripStart(e.target.value)}
              className="form-input"
            />
          </label>
          <label className="form-field">
            <span>Trip end</span>
            <input type="date" value={tripEnd} onChange={(e) => setTripEnd(e.target.value)} className="form-input" />
          </label>
        </div>
        {tripStart > tripEnd && <p className="form-error">Trip start must be before the end date.</p>}

        <div className="modal-card__actions">
          <button
            type="button"
            className="primary-btn"
            disabled={!canSave}
            onClick={() => onSave({ dadName: dadName.trim(), momName: momName.trim(), tripStart, tripEnd })}
          >
            Save
          </button>
          <button
            type="button"
            className="text-btn"
            onClick={() => {
              setDadName(DEFAULT_SETTINGS.dadName)
              setMomName(DEFAULT_SETTINGS.momName)
              setTripStart(DEFAULT_SETTINGS.tripStart)
              setTripEnd(DEFAULT_SETTINGS.tripEnd)
            }}
          >
            Reset to default
          </button>
          <button type="button" className="text-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
