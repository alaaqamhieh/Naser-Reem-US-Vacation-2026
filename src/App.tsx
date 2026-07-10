// =============================================================================
//  Welcome Naser & Reem — interactive vacation itinerary
//  A single scrolling page: Hero -> Calendar -> Library. All state lives here
//  and persists to localStorage via storage.ts.
// =============================================================================

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { loadState, saveState } from './storage'
import { loadRemote, saveRemote } from './remoteSync'
import type { ActivityCategory, ActivityIdea, AppState, CalendarEntry } from './types'
import type { PlaceResult } from './googlePlaces'
import { Hero } from './components/Hero'
import { Calendar } from './components/Calendar'
import { TimelineView } from './components/TimelineView'
import { Library } from './components/Library'
import { DatePickerModal } from './components/DatePickerModal'
import { ActivityPickerModal } from './components/ActivityPickerModal'
import { ActivityFormModal } from './components/ActivityFormModal'
import { SwipeDeck } from './components/SwipeDeck'
import { ShortlistSection } from './components/ShortlistSection'
import { QuickNav } from './components/QuickNav'
import { DayDetailSheet } from './components/DayDetailSheet'
import { EntryEditModal } from './components/EntryEditModal'
import { MilestoneFormModal } from './components/MilestoneFormModal'
import { SubscribeModal } from './components/SubscribeModal'
import { DinnerSection } from './components/DinnerSection'
import { DinnerFormModal } from './components/DinnerFormModal'
import { PlaceSearchModal } from './components/PlaceSearchModal'
import { isWithinRange } from './dateUtils'

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
  const [activityFormMode, setActivityFormMode] = useState<'closed' | 'create' | 'create-for-date' | string>('closed')
  const [createPrefillTitle, setCreatePrefillTitle] = useState('')
  // The swipe deck is a full-screen mode, separate from the modals above.
  const [deckOpen, setDeckOpen] = useState(false)
  // Tap-a-day view (phones) and per-entry editing.
  const [dayDetailDate, setDayDetailDate] = useState<string | null>(null)
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null)
  // Special dates: 'closed' | 'create' | a milestone id being edited.
  const [milestoneFormMode, setMilestoneFormMode] = useState<'closed' | 'create' | string>('closed')
  const [subscribeOpen, setSubscribeOpen] = useState(false)
  const [dinnerFormMode, setDinnerFormMode] = useState<'closed' | 'create' | string>('closed')
  const [dinnerFormCuisine, setDinnerFormCuisine] = useState<string | undefined>(undefined)
  const [placeSearchOpen, setPlaceSearchOpen] = useState(false)
  const [calendarView, setCalendarView] = useState<'calendar' | 'timeline'>('calendar')

  // Guards the initial remote fetch from clobbering an edit the user made
  // in the brief window before it resolves.
  const editedSinceMount = useRef(false)

  const updateState = useCallback((updater: (prev: AppState) => AppState) => {
    editedSinceMount.current = true
    setState((prev) => {
      const next = updater(prev)
      saveState(next)
      saveRemote(next)
      return next
    })
  }, [])

  // On load, this browser's local copy paints instantly; a shared remote
  // copy (if configured — see remoteSync.ts) then takes over so everyone's
  // edits show up everywhere, without blocking the first paint on a fetch.
  useEffect(() => {
    let cancelled = false
    loadRemote().then((remote) => {
      if (cancelled || !remote || editedSinceMount.current) return
      setState(remote)
      saveState(remote)
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const toggleEntryCompleted = useCallback(
    (entryId: string) => {
      updateState((prev) => ({
        ...prev,
        entries: prev.entries.map((e) => (e.id === entryId ? { ...e, completed: !e.completed } : e)),
      }))
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

  const addPlaceActivity = useCallback(
    (place: PlaceResult) => {
      const id = newId('place')
      const activity: ActivityIdea = {
        id,
        title: place.name,
        emoji: place.emoji,
        category: place.category,
        description: place.address,
        isCustom: true,
        mapQuery: place.mapQuery,
        popularity: typeof place.rating === 'number' ? Math.round(place.rating) : undefined,
      }
      updateState((prev) => ({ ...prev, activities: [...prev.activities, activity] }))
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
        ...prev,
        activities: prev.activities.filter((a) => a.id !== id),
        entries: prev.entries.filter((e) => e.activityId !== id),
        shortlist: prev.shortlist.filter((sid) => sid !== id),
        rejected: prev.rejected.filter((rid) => rid !== id),
      }))
    },
    [updateState],
  )

  const toggleShortlist = useCallback(
    (activityId: string) => {
      updateState((prev) => ({
        ...prev,
        shortlist: prev.shortlist.includes(activityId)
          ? prev.shortlist.filter((id) => id !== activityId)
          : [...prev.shortlist, activityId],
        // Hearting something also clears any earlier "not for us".
        rejected: prev.rejected.filter((id) => id !== activityId),
      }))
    },
    [updateState],
  )

  const toggleRejected = useCallback(
    (activityId: string) => {
      updateState((prev) => ({
        ...prev,
        rejected: prev.rejected.includes(activityId)
          ? prev.rejected.filter((id) => id !== activityId)
          : [...prev.rejected, activityId],
        shortlist: prev.shortlist.filter((id) => id !== activityId),
      }))
    },
    [updateState],
  )

  const addMilestone = useCallback(
    (data: { title: string; emoji: string; start: string; end: string; color: string }) => {
      updateState((prev) => ({ ...prev, milestones: [...prev.milestones, { ...data, id: newId('m') }] }))
    },
    [updateState],
  )

  const editMilestone = useCallback(
    (id: string, data: { title: string; emoji: string; start: string; end: string; color: string }) => {
      updateState((prev) => ({
        ...prev,
        milestones: prev.milestones.map((m) => (m.id === id ? { ...m, ...data } : m)),
      }))
    },
    [updateState],
  )

  const deleteMilestone = useCallback(
    (id: string) => {
      updateState((prev) => ({ ...prev, milestones: prev.milestones.filter((m) => m.id !== id) }))
    },
    [updateState],
  )

  const addDinnerIdea = useCallback(
    (data: { dish: string; cuisine: string; emoji: string; notes: string; photo?: string }) => {
      updateState((prev) => ({
        ...prev,
        dinnerIdeas: [...prev.dinnerIdeas, { ...data, id: newId('dinner'), isCustom: true }],
      }))
    },
    [updateState],
  )

  const editDinnerIdea = useCallback(
    (id: string, data: { dish: string; cuisine: string; emoji: string; notes: string; photo?: string }) => {
      updateState((prev) => ({
        ...prev,
        dinnerIdeas: prev.dinnerIdeas.map((d) => (d.id === id ? { ...d, ...data } : d)),
      }))
    },
    [updateState],
  )

  const deleteDinnerIdea = useCallback(
    (id: string) => {
      updateState((prev) => ({
        ...prev,
        dinnerIdeas: prev.dinnerIdeas.filter((d) => d.id !== id),
        dinnerFavorites: prev.dinnerFavorites.filter((fid) => fid !== id),
      }))
    },
    [updateState],
  )

  const toggleDinnerFavorite = useCallback(
    (id: string) => {
      updateState((prev) => ({
        ...prev,
        dinnerFavorites: prev.dinnerFavorites.includes(id)
          ? prev.dinnerFavorites.filter((fid) => fid !== id)
          : [...prev.dinnerFavorites, id],
      }))
    },
    [updateState],
  )

  const updateEntry = useCallback(
    (entryId: string, patch: Partial<Pick<CalendarEntry, 'date' | 'endDate' | 'note' | 'startTime' | 'endTime'>>) => {
      updateState((prev) => ({
        ...prev,
        entries: prev.entries.map((e) => (e.id === entryId ? { ...e, ...patch } : e)),
      }))
    },
    [updateState],
  )

  const { tripStart, tripEnd, dadName, momName } = state.settings

  const scheduledIds = useMemo(() => new Set(state.entries.map((e) => e.activityId)), [state.entries])
  const dinnerCuisines = useMemo(
    () => Array.from(new Set(state.dinnerIdeas.map((d) => d.cuisine))).sort(),
    [state.dinnerIdeas],
  )

  // Deck candidates: ideas not hearted, not "not for us", and not already on
  // the calendar — skipped cards simply return the next time the deck opens.
  const deckCandidates = useMemo(() => {
    const hearted = new Set(state.shortlist)
    const rejected = new Set(state.rejected)
    return state.activities.filter((a) => !scheduledIds.has(a.id) && !hearted.has(a.id) && !rejected.has(a.id))
  }, [state.activities, scheduledIds, state.shortlist, state.rejected])

  const goToShortlist = () => {
    setDeckOpen(false)
    requestAnimationFrame(() => document.getElementById('shortlist')?.scrollIntoView({ behavior: 'smooth' }))
  }

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

  // The shared calendar feed is a static file generated at build time (see
  // scripts/build-ics.ts) from the same seed data — it can't reflect anyone's
  // personal in-browser drag-and-drop edits, which live only in localStorage.
  const feedUrl = new URL('itinerary.ics', window.location.href).href
  const subscribeUrl = feedUrl.replace(/^https?:/, 'webcal:')

  const editingActivity =
    activityFormMode !== 'closed' && activityFormMode !== 'create' && activityFormMode !== 'create-for-date'
      ? state.activities.find((a) => a.id === activityFormMode)
      : undefined

  const editingEntry = editingEntryId ? state.entries.find((e) => e.id === editingEntryId) : undefined
  const editingMilestone =
    milestoneFormMode !== 'closed' && milestoneFormMode !== 'create'
      ? state.milestones.find((m) => m.id === milestoneFormMode)
      : undefined
  const editingActivityForEntry = editingEntry
    ? state.activities.find((a) => a.id === editingEntry.activityId)
    : undefined
  const editingDinnerIdea =
    dinnerFormMode !== 'closed' && dinnerFormMode !== 'create'
      ? state.dinnerIdeas.find((d) => d.id === dinnerFormMode)
      : undefined

  return (
    <div className="app">
      <Hero
        dadName={dadName}
        momName={momName}
        tripStart={tripStart}
        tripEnd={tripEnd}
        today={todayIso()}
        onOpenDeck={() => setDeckOpen(true)}
        onOpenSubscribe={() => setSubscribeOpen(true)}
      />

      <section className="calendar-view-toggle-row" aria-label="Calendar view">
        <div className="view-toggle" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={calendarView === 'calendar'}
            className={calendarView === 'calendar' ? 'on' : ''}
            onClick={() => setCalendarView('calendar')}
          >
            🗓️ Calendar
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={calendarView === 'timeline'}
            className={calendarView === 'timeline' ? 'on' : ''}
            onClick={() => setCalendarView('timeline')}
          >
            📜 Timeline
          </button>
        </div>
      </section>

      {calendarView === 'calendar' ? (
        <Calendar
          tripStart={tripStart}
          tripEnd={tripEnd}
          entries={state.entries}
          activities={state.activities}
          onRemoveEntry={removeEntry}
          onToggleCompleted={toggleEntryCompleted}
          onOpenPicker={(date) => setPendingScheduleDate(date)}
          onEditEntry={setEditingEntryId}
          onOpenDay={setDayDetailDate}
          milestones={state.milestones}
          onAddMilestone={() => setMilestoneFormMode('create')}
          onEditMilestone={setMilestoneFormMode}
          today={todayIso()}
        />
      ) : (
        <section className="calendar-section" id="calendar" aria-label="Trip timeline">
          <div className="section-title-row">
            <h2 className="section-title">The Calendar</h2>
            <button
              type="button"
              className="secondary-btn section-title-row__action"
              onClick={() => setMilestoneFormMode('create')}
            >
              ✨ Add a special date
            </button>
          </div>
          <p className="section-hint">Tap "+ Add to this day" on any day to plan it out.</p>
          <TimelineView
            tripStart={tripStart}
            tripEnd={tripEnd}
            entries={state.entries}
            activities={state.activities}
            onRemoveEntry={removeEntry}
            onToggleCompleted={toggleEntryCompleted}
            onOpenPicker={(date) => setPendingScheduleDate(date)}
            onEditEntry={setEditingEntryId}
            milestones={state.milestones}
            today={todayIso()}
          />
        </section>
      )}

      <ShortlistSection
        shortlist={state.shortlist}
        rejected={state.rejected}
        activities={state.activities}
        scheduledIds={scheduledIds}
        onPickDay={(id) => setPendingScheduleActivityId(id)}
        onUnheart={toggleShortlist}
        onRestore={toggleRejected}
        onOpenDeck={() => setDeckOpen(true)}
      />

      <Library
        activities={state.activities}
        shortlist={state.shortlist}
        onToggleShortlist={toggleShortlist}
        onSchedule={handleSchedule}
        onCreateNew={() => setActivityFormMode('create')}
        onEdit={(id) => setActivityFormMode(id)}
        onDelete={deleteActivity}
        onSearchPlace={() => setPlaceSearchOpen(true)}
      />

      <DinnerSection
        dinnerIdeas={state.dinnerIdeas}
        favorites={state.dinnerFavorites}
        onToggleFavorite={toggleDinnerFavorite}
        onCreateNew={(cuisine) => {
          setDinnerFormCuisine(cuisine)
          setDinnerFormMode('create')
        }}
        onEdit={(id) => setDinnerFormMode(id)}
        onDelete={deleteDinnerIdea}
      />

      <QuickNav onOpenDeck={() => setDeckOpen(true)} />

      {pendingScheduleActivityId && (
        <DatePickerModal
          tripStart={tripStart}
          tripEnd={tripEnd}
          title={`Add "${state.activities.find((a) => a.id === pendingScheduleActivityId)?.title ?? ''}"`}
          entries={state.entries}
          today={todayIso()}
          onPick={handleDatePicked}
          onClose={() => setPendingScheduleActivityId(null)}
        />
      )}

      {pendingScheduleDate && activityFormMode === 'closed' && (
        <ActivityPickerModal
          date={pendingScheduleDate}
          activities={state.activities}
          onPick={handleActivityPicked}
          onCreateNew={(prefillTitle) => {
            setCreatePrefillTitle(prefillTitle)
            setActivityFormMode('create-for-date')
          }}
          onClose={() => setPendingScheduleDate(null)}
        />
      )}

      {activityFormMode !== 'closed' && (
        <ActivityFormModal
          initial={editingActivity}
          initialTitle={activityFormMode === 'create-for-date' ? createPrefillTitle : undefined}
          onSave={(data) => {
            if (activityFormMode === 'create-for-date') {
              const id = addActivity(data)
              if (pendingScheduleDate) addEntry(id, pendingScheduleDate)
              setPendingScheduleDate(null)
            } else if (activityFormMode === 'create') addActivity(data)
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

      {dayDetailDate && (
        <DayDetailSheet
          date={dayDetailDate}
          entries={state.entries.filter(
            (e) => dayDetailDate >= e.date && dayDetailDate <= (e.endDate ?? e.date),
          )}
          activities={state.activities}
          milestones={state.milestones.filter((m) => isWithinRange(dayDetailDate, m.start, m.end))}
          onEditMilestone={(id) => {
            setDayDetailDate(null)
            setMilestoneFormMode(id)
          }}
          onToggleCompleted={toggleEntryCompleted}
          onEditEntry={(id) => {
            setDayDetailDate(null)
            setEditingEntryId(id)
          }}
          onRemoveEntry={removeEntry}
          onAddActivity={() => {
            setPendingScheduleDate(dayDetailDate)
            setDayDetailDate(null)
          }}
          onClose={() => setDayDetailDate(null)}
        />
      )}

      {editingEntry && editingActivityForEntry && (
        <EntryEditModal
          entry={editingEntry}
          activity={editingActivityForEntry}
          tripStart={tripStart}
          tripEnd={tripEnd}
          onSave={(patch) => {
            updateEntry(editingEntry.id, patch)
            setEditingEntryId(null)
          }}
          onClose={() => setEditingEntryId(null)}
        />
      )}

      {milestoneFormMode !== 'closed' && (
        <MilestoneFormModal
          initial={editingMilestone}
          tripStart={tripStart}
          tripEnd={tripEnd}
          onSave={(data) => {
            if (milestoneFormMode === 'create') addMilestone(data)
            else editMilestone(milestoneFormMode, data)
            setMilestoneFormMode('closed')
          }}
          onDelete={
            editingMilestone
              ? () => {
                  deleteMilestone(editingMilestone.id)
                  setMilestoneFormMode('closed')
                }
              : undefined
          }
          onClose={() => setMilestoneFormMode('closed')}
        />
      )}

      {subscribeOpen && (
        <SubscribeModal subscribeUrl={subscribeUrl} feedUrl={feedUrl} onClose={() => setSubscribeOpen(false)} />
      )}

      {placeSearchOpen && (
        <PlaceSearchModal
          onAdd={(place) => {
            addPlaceActivity(place)
            setPlaceSearchOpen(false)
          }}
          onClose={() => setPlaceSearchOpen(false)}
        />
      )}

      {dinnerFormMode !== 'closed' && (
        <DinnerFormModal
          initial={editingDinnerIdea}
          initialCuisine={dinnerFormCuisine}
          cuisines={dinnerCuisines}
          onSave={(data) => {
            if (dinnerFormMode === 'create') addDinnerIdea(data)
            else editDinnerIdea(dinnerFormMode, data)
            setDinnerFormMode('closed')
            setDinnerFormCuisine(undefined)
          }}
          onDelete={
            editingDinnerIdea
              ? () => {
                  deleteDinnerIdea(editingDinnerIdea.id)
                  setDinnerFormMode('closed')
                }
              : undefined
          }
          onClose={() => {
            setDinnerFormMode('closed')
            setDinnerFormCuisine(undefined)
          }}
        />
      )}

      {deckOpen && (
        <SwipeDeck
          candidates={deckCandidates}
          heartedTotal={state.shortlist.length}
          rejectedTotal={state.rejected.length}
          onHeart={toggleShortlist}
          onReject={toggleRejected}
          onClose={() => setDeckOpen(false)}
          onGoToShortlist={goToShortlist}
        />
      )}
    </div>
  )
}
