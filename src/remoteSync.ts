// =============================================================================
//  Shared persistence — a single Firebase Realtime Database REST endpoint,
//  the same lightweight technique the Amman/Jordan trip site uses: no SDK,
//  just a plain fetch() GET/PUT of the whole state as one JSON blob. It's
//  last-write-wins (no real conflict resolution) — fine for a small family.
//  Entirely optional: if VITE_FIREBASE_DB_URL isn't set, every function
//  here is a silent no-op and the app stays local-only, same as before.
// =============================================================================

import type { AppState } from './types'

const DB_URL = (import.meta.env.VITE_FIREBASE_DB_URL as string | undefined)?.replace(/\/$/, '')
const DEVICE_KEY = 'naser-reem-vacation/device'

function deviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_KEY)
    if (!id) {
      id = `${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`
      localStorage.setItem(DEVICE_KEY, id)
    }
    return id
  } catch {
    return 'anon'
  }
}

export function remoteConfigured(): boolean {
  return !!DB_URL
}

export async function loadRemote(): Promise<AppState | null> {
  if (!DB_URL) return null
  try {
    const res = await fetch(`${DB_URL}/trip.json`)
    if (!res.ok) return null
    const data = await res.json()
    if (!data || typeof data !== 'object' || !data._meta) return null
    const { _meta: _unused, ...state } = data
    return state as AppState
  } catch {
    return null
  }
}

export async function saveRemote(state: AppState): Promise<boolean> {
  if (!DB_URL) return false
  try {
    const payload = { ...state, _meta: { deviceId: deviceId(), updatedAt: Date.now() } }
    const res = await fetch(`${DB_URL}/trip.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return res.ok
  } catch {
    return false
  }
}
