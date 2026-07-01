// =============================================================================
//  Welcome Naser & Reem — interactive vacation itinerary
//  A single scrolling page: Hero -> Calendar -> Library. All state lives here
//  and persists to localStorage via storage.ts.
// =============================================================================

import { useCallback, useState } from 'react'
import { TRIP_END, TRIP_START, WELCOME_NAMES } from './data'
import { loadState, saveState } from './storage'
import { buildItineraryIcs, buildSingleEventIcs, downloadIcs } from './ics'
import type { ActivityCategory, AppState, CalendarEntry } from './types'
import { Hero } from './components/Hero'
import { Calendar } from './components/Calendar'
import { Library } from './components/Library'
import { DatePickerModal } from './components/DatePickerModal'
import { ActivityPickerModal } from './components/ActivityPickerModal'
import { ActivityFormModal } from './components/ActivityFormModal'

function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function todayIso(): string {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

export default function App() {
  const [state, setState] = useState<AppState>(loadState)

  // Modal state: at most one of these is active at a time.
  const [pendingScheduleActivityId, setPendingScheduleActivityId] = useState<string | null>(null)
  const [pendingScheduleDate, setPendingScheduleDate] = useState<string | null>(null)
  const [activityFormMode, setActivityFormMode] = useState<'closed' | 'create' | string>('closed')

  const updateState = useCallback((updater: (prev: AppState) => AppState) => {
    setState((prev) => {
      const next = updater(prev)
      saveState(next)
      return next
    })
  }, [])

  const addEntry = useCallback(
    (activityId: string, date: string) => {
      const newEntry: CalendarEntry = { id: newId('c'), activityId, date }
      updateState((prev) => ({ ...prev, entries: [...prev.entries, newEntry] }))
    },
    [updateState],
  )

  const removeEntry = useCallback(
    (entryId: string) => {
      updateState((prev) => ({ ...prev, entries: prev.entries.filter((e) => e.id !== entryId) }))
    },
    [updateState],
  )

  const addActivity = useCallback(
    (data: { title: string; emoji: string; category: ActivityCategory; description: string }) => {
      const id = newId('custom')
      updateState((prev) => ({ ...prev, activities: [...prev.activities, { ...data, id, isCustom: true }] }))
      return id
    },
    [updateState],
  )

  const editActivity = useCallback(
    (id: string, data: { title: string; emoji: string; category: ActivityCategory; description: string }) => {
      updateState((prev) => ({
        ...prev,
        activities: prev.activities.map((a) => (a.id === id ? { ...a, ...data } : a)),
      }))
    },
    [updateState],
  )

  const deleteActivity = useCallback(
    (id: string) => {
      updateState((prev) => ({
        activities: prev.activities.filter((a) => a.id !== id),
        entries: prev.entries.filter((e) => e.activityId !== id),
      }))
    },
    [updateState],
  )

  // ----- Library card chosen: drop on a day schedules directly, plain tap opens the date picker -----
  const handleSchedule = (activityId: string, dropZone: string | null) => {
    if (dropZone) addEntry(activityId, dropZone)
    else setPendingScheduleActivityId(activityId)
  }

  const handleDatePicked = (date: string) => {
    if (pendingScheduleActivityId) addEntry(pendingScheduleActivityId, date)
    setPendingScheduleActivityId(null)
  }

  const handleActivityPicked = (activityId: string) => {
    if (pendingScheduleDate) addEntry(activityId, pendingScheduleDate)
    setPendingScheduleDate(null)
  }

  const handleExportEntry = (entryId: string) => {
    const entry = state.entries.find((e) => e.id === entryId)
    const activity = entry && state.activities.find((a) => a.id === entry.activityId)
    if (entry && activity) downloadIcs(`${activity.title}.ics`, buildSingleEventIcs(entry, activity))
  }

  const handleExportAll = () => {
    downloadIcs('naser-reem-itinerary.ics', buildItineraryIcs(state.entries, state.activities))
  }

  const editingActivity =
    activityFormMode !== 'closed' && activityFormMode !== 'create'
      ? state.activities.find((a) => a.id === activityFormMode)
      : undefined

  return (
    <div className="app">
      <Hero
        dadName={WELCOME_NAMES.dad}
        momName={WELCOME_NAMES.mom}
        tripStart={TRIP_START}
        tripEnd={TRIP_END}
        onExportAll={handleExportAll}
      />

      <Calendar
        tripStart={TRIP_START}
        tripEnd={TRIP_END}
        entries={state.entries}
        activities={state.activities}
        onRemoveEntry={removeEntry}
        onOpenPicker={(date) => setPendingScheduleDate(date)}
        onExportEntry={handleExportEntry}
        today={todayIso()}
      />

      <Library
        activities={state.activities}
        onSchedule={handleSchedule}
        onCreateNew={() => setActivityFormMode('create')}
        onEdit={(id) => setActivityFormMode(id)}
        onDelete={deleteActivity}
      />

      {pendingScheduleActivityId && (
        <DatePickerModal
          tripStart={TRIP_START}
          tripEnd={TRIP_END}
          title={`Add "${state.activities.find((a) => a.id === pendingScheduleActivityId)?.title ?? ''}"`}
          onPick={handleDatePicked}
          onClose={() => setPendingScheduleActivityId(null)}
        />
      )}

      {pendingScheduleDate && (
        <ActivityPickerModal
          date={pendingScheduleDate}
          activities={state.activities}
          onPick={handleActivityPicked}
          onClose={() => setPendingScheduleDate(null)}
        />
      )}

      {activityFormMode !== 'closed' && (
        <ActivityFormModal
          initial={editingActivity}
          onSave={(data) => {
            if (activityFormMode === 'create') addActivity(data)
            else editActivity(activityFormMode, data)
            setActivityFormMode('closed')
          }}
          onClose={() => setActivityFormMode('closed')}
          onDelete={
            editingActivity
              ? () => {
                  deleteActivity(editingActivity.id)
                  setActivityFormMode('closed')
                }
              : undefined
          }
        />
      )}
    </div>
  )
}
