import { useMemo, useState } from 'react'
import type { ActivityIdea } from './types'

/** Simple substring filter by title/description — shared by the Library and the activity picker modal. */
export function useActivitySearch(activities: ActivityIdea[]) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return activities
    return activities.filter(
      (a) => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q),
    )
  }, [activities, query])
  return { query, setQuery, filtered }
}
