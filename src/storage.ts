import type { AppState } from './types'
import { SEED_ACTIVITIES, SEED_ENTRIES, SEED_MILESTONES } from './data'

const STORAGE_KEY = 'naser-reem-vacation/state'
const STORAGE_VERSION = 5

interface StoredState extends AppState {
  _v: number
}

function buildSeedState(): AppState {
  return { activities: SEED_ACTIVITIES, entries: SEED_ENTRIES, milestones: SEED_MILESTONES, shortlist: [], rejected: [] }
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const seeded = buildSeedState()
      saveState(seeded)
      return seeded
    }
    const parsed = JSON.parse(raw) as StoredState
    if (parsed._v !== STORAGE_VERSION) {
      const seeded = buildSeedState()
      saveState(seeded)
      return seeded
    }
    return {
      activities: parsed.activities,
      entries: parsed.entries,
      milestones: parsed.milestones ?? [],
      shortlist: parsed.shortlist ?? [],
      rejected: parsed.rejected ?? [],
    }
  } catch {
    return buildSeedState()
  }
}

export function saveState(state: AppState) {
  try {
    const stored: StoredState = { ...state, _v: STORAGE_VERSION }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  } catch {
    /* storage unavailable — app still works in-memory for this session */
  }
}
