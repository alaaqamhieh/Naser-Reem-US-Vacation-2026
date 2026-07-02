import type { AppState } from './types'
import { DEFAULT_SETTINGS, SEED_ACTIVITIES, SEED_DINNER_IDEAS, SEED_ENTRIES, SEED_MILESTONES } from './data'

const STORAGE_KEY = 'naser-reem-vacation/state'
const STORAGE_VERSION = 7

interface StoredState extends AppState {
  _v: number
}

function buildSeedState(): AppState {
  return {
    activities: SEED_ACTIVITIES,
    entries: SEED_ENTRIES,
    milestones: SEED_MILESTONES,
    shortlist: [],
    rejected: [],
    settings: DEFAULT_SETTINGS,
    dinnerIdeas: SEED_DINNER_IDEAS,
    dinnerFavorites: [],
  }
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
      settings: parsed.settings ?? DEFAULT_SETTINGS,
      dinnerIdeas: parsed.dinnerIdeas ?? SEED_DINNER_IDEAS,
      dinnerFavorites: parsed.dinnerFavorites ?? [],
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
