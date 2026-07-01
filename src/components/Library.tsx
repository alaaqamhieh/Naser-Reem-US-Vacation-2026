import { useMemo, useState } from 'react'
import type { ActivityCategory, ActivityIdea } from '../types'
import { useActivitySearch } from '../useActivitySearch'
import { ActivityCard } from './ActivityCard'

const CATEGORIES: { key: ActivityCategory; label: string }[] = [
  { key: 'big-trip', label: 'Big Trips' },
  { key: 'garden', label: 'Gardens' },
  { key: 'food', label: 'Food' },
  { key: 'home', label: 'Home & Family' },
  { key: 'local', label: 'Local Richmond' },
  { key: 'event', label: 'Events' },
]

export function Library({
  activities,
  onSchedule,
  onCreateNew,
  onEdit,
  onDelete,
}: {
  activities: ActivityIdea[]
  onSchedule: (activityId: string, dropZone: string | null) => void
  onCreateNew: () => void
  onEdit: (activityId: string) => void
  onDelete: (activityId: string) => void
}) {
  const [active, setActive] = useState<ActivityCategory | 'all'>('all')
  const { query, setQuery, filtered } = useActivitySearch(activities)

  const grouped = useMemo(() => {
    const cats = active === 'all' ? CATEGORIES : CATEGORIES.filter((c) => c.key === active)
    return cats
      .map((c) => ({ ...c, items: filtered.filter((a) => a.category === c.key) }))
      .filter((g) => g.items.length > 0)
  }, [filtered, active])

  return (
    <section className="library-section" id="ideas" aria-label="Things to do">
      <h2 className="section-title">Things To Do</h2>
      <p className="section-hint">
        Drag an idea onto a day, or tap it to choose one. Don't see something you love? Add your own.
      </p>

      <input
        type="search"
        className="library-search"
        placeholder="Search ideas…"
        aria-label="Search ideas"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="filter-row" role="tablist" aria-label="Filter by category">
        <button
          type="button"
          className={`filter-chip ${active === 'all' ? 'filter-chip--on' : ''}`}
          aria-pressed={active === 'all'}
          onClick={() => setActive('all')}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            type="button"
            className={`filter-chip ${active === c.key ? 'filter-chip--on' : ''}`}
            aria-pressed={active === c.key}
            onClick={() => setActive(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {grouped.length === 0 && <p className="empty-state">No ideas match your search.</p>}

      {grouped.map((g) => (
        <div className="library-group" key={g.key}>
          {active === 'all' && <h3 className="library-group__label">{g.label}</h3>}
          <div className="card-grid">
            {g.items.map((a) => (
              <ActivityCard
                key={a.id}
                activity={a}
                onChoose={(zone) => onSchedule(a.id, zone)}
                onEdit={a.isCustom ? () => onEdit(a.id) : undefined}
                onDelete={a.isCustom ? () => onDelete(a.id) : undefined}
              />
            ))}
          </div>
        </div>
      ))}

      <button type="button" className="add-idea-btn" onClick={onCreateNew}>
        + Add your own idea
      </button>
    </section>
  )
}
