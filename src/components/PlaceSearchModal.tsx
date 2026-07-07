import { useState } from 'react'
import { searchPlaces, type PlaceResult } from '../googlePlaces'
import { useEscapeToClose } from '../useEscapeToClose'

/**
 * Look up a real place via Google (Places API) and add it straight to the
 * library — no manual typing of a description or category, since Google
 * already knows the name, address, kind of place, and its rating.
 */
export function PlaceSearchModal({
  onAdd,
  onClose,
}: {
  onAdd: (place: PlaceResult) => void
  onClose: () => void
}) {
  useEscapeToClose(onClose)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<PlaceResult[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')

  const runSearch = async () => {
    const q = query.trim()
    if (!q) return
    setStatus('loading')
    setError('')
    try {
      const found = await searchPlaces(q)
      setResults(found)
      setStatus('idle')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed.')
      setStatus('error')
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Search for a place" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-card__title">🔍 Search for a Place</h2>
        <p className="modal-card__hint">
          Find a real place on Google and add it straight to the library — its name, address, and rating fill in for
          you.
        </p>

        <form
          className="place-search__form"
          onSubmit={(e) => {
            e.preventDefault()
            runSearch()
          }}
        >
          <input
            type="search"
            className="form-input"
            placeholder="e.g. Maymont, or a restaurant name…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button type="submit" className="primary-btn" disabled={status === 'loading' || !query.trim()}>
            {status === 'loading' ? 'Searching…' : 'Search'}
          </button>
        </form>

        {status === 'error' && <p className="form-error">{error}</p>}

        {results.length > 0 && (
          <ul className="place-search__results">
            {results.map((r) => (
              <li key={`${r.name}-${r.address}`} className="place-search__result">
                <div className="place-search__result-body">
                  <span className="place-search__result-name">
                    <span aria-hidden="true">{r.emoji}</span> {r.name}
                  </span>
                  <span className="place-search__result-address">{r.address}</span>
                  {typeof r.rating === 'number' && <span className="place-search__result-rating">⭐ {r.rating.toFixed(1)}</span>}
                </div>
                <button type="button" className="secondary-btn" onClick={() => onAdd(r)}>
                  + Add
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="modal-card__actions">
          <button type="button" className="text-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
