import { useMemo, useState } from 'react'
import type { DinnerIdea } from '../types'
import { DinnerCard } from './DinnerCard'

export function DinnerSection({
  dinnerIdeas,
  favorites,
  onToggleFavorite,
  onCreateNew,
  onEdit,
  onDelete,
}: {
  dinnerIdeas: DinnerIdea[]
  favorites: string[]
  onToggleFavorite: (id: string) => void
  onCreateNew: (cuisine?: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}) {
  const favoriteSet = new Set(favorites)
  const cuisines = useMemo(
    () => Array.from(new Set(dinnerIdeas.map((d) => d.cuisine))).sort(),
    [dinnerIdeas],
  )
  const [active, setActive] = useState<string>('all')

  const grouped = useMemo(() => {
    if (active === 'favorites') {
      const favs = dinnerIdeas.filter((d) => favorites.includes(d.id))
      return favs.length > 0 ? [{ cuisine: 'Favorites', items: favs }] : []
    }
    if (active === 'top') {
      const top = dinnerIdeas
        .filter((d) => (d.popularity ?? 0) >= 4)
        .sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0))
      return top.length > 0 ? [{ cuisine: '⭐ Top Rated', items: top }] : []
    }
    const cs = active === 'all' ? cuisines : cuisines.filter((c) => c === active)
    return cs
      .map((c) => ({ cuisine: c, items: dinnerIdeas.filter((d) => d.cuisine === c) }))
      .filter((g) => g.items.length > 0)
  }, [dinnerIdeas, cuisines, active, favorites])

  return (
    <section className="dinner-section" id="dinner" aria-label="Dinner night ideas">
      <h2 className="section-title">🍽️ Dinner Night Ideas</h2>
      <p className="section-hint">
        Brainstorm dishes together, then favorite the ones you want to make during the visit.
      </p>

      <div className="filter-row" role="tablist" aria-label="Filter by cuisine">
        <button
          type="button"
          className={`filter-chip ${active === 'all' ? 'filter-chip--on' : ''}`}
          aria-pressed={active === 'all'}
          onClick={() => setActive('all')}
        >
          All
        </button>
        <button
          type="button"
          className={`filter-chip ${active === 'favorites' ? 'filter-chip--on' : ''}`}
          aria-pressed={active === 'favorites'}
          onClick={() => setActive('favorites')}
        >
          ❤️ Favorites
        </button>
        <button
          type="button"
          className={`filter-chip ${active === 'top' ? 'filter-chip--on' : ''}`}
          aria-pressed={active === 'top'}
          onClick={() => setActive('top')}
        >
          ⭐ Top rated
        </button>
        {cuisines.map((c) => (
          <button
            key={c}
            type="button"
            className={`filter-chip ${active === c ? 'filter-chip--on' : ''}`}
            aria-pressed={active === c}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {grouped.length === 0 && (
        <p className="empty-state">
          {active === 'favorites'
            ? 'No favorites yet — heart a dish to add it here.'
            : active === 'top'
              ? 'No top-rated dishes yet — rate one by editing it.'
              : 'No dinner ideas yet.'}
        </p>
      )}

      {grouped.map((g) => (
        <div className="library-group" key={g.cuisine}>
          {(active === 'all' || active === 'top') && <h3 className="library-group__label">{g.cuisine}</h3>}
          <div className="card-grid card-grid--dinner">
            {g.items.map((idea) => (
              <DinnerCard
                key={idea.id}
                idea={idea}
                isFavorite={favoriteSet.has(idea.id)}
                onToggleFavorite={() => onToggleFavorite(idea.id)}
                onEdit={idea.isCustom ? () => onEdit(idea.id) : undefined}
                onDelete={idea.isCustom ? () => onDelete(idea.id) : undefined}
              />
            ))}
            {active !== 'favorites' && active !== 'top' && (
              <button
                type="button"
                className="dinner-card dinner-card--add"
                onClick={() => onCreateNew(g.cuisine)}
              >
                <span aria-hidden="true">+</span>
                <span>Add a {g.cuisine} dish</span>
              </button>
            )}
          </div>
        </div>
      ))}

      <button type="button" className="add-idea-btn" onClick={() => onCreateNew()}>
        + Add a dinner idea
      </button>
    </section>
  )
}
