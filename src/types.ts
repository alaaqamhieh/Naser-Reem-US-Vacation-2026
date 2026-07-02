// =============================================================================
//  Shared types for the welcome site: the activity library and the calendar.
// =============================================================================

export type ActivityCategory =
  | 'big-trip' // weekend day-trips & overnight getaways
  | 'garden' // botanical gardens & outdoor strolls
  | 'food' // restaurants & food experiences
  | 'home' // home/family nights, rest days
  | 'local' // Richmond neighborhood spots
  | 'event' // dated festivals, concerts, watch parties

export interface ActivityIdea {
  id: string
  title: string
  emoji: string
  category: ActivityCategory
  description: string
  tags?: string[]
  /** True for ideas the family added themselves (enables edit/delete). */
  isCustom?: boolean
  /** Gentle pace, minimal walking/standing — good for Reem's back. */
  easyPace?: boolean
  /** An especially meaningful "first time in America" moment for Naser. */
  firstVisitHighlight?: boolean
  /** Rough drive time from home (Chester, VA), e.g. "~4.5h". */
  driveTime?: string
  /** Beyond the usual ~5h radius — a "worth it" stretch, shown honestly. */
  stretchTrip?: boolean
  /** Path under public/ to a real photo of the place, e.g. "photos/outer-banks.jpg". */
  photo?: string
  /** Extra gallery photos to flip through on the swipe card, cover excluded. */
  photos?: string[]
}

export interface CalendarEntry {
  id: string
  activityId: string
  /** ISO date, e.g. '2026-07-04'. Always within TRIP_START..TRIP_END. */
  date: string
  /** Optional 24h 'HH:mm' times; entries without one default to a generic block. */
  startTime?: string
  endTime?: string
  note?: string
  /** Marked once the family has done/enjoyed this — a UI tracking flag only. */
  completed?: boolean
}

/** A special date — flights, travel windows, anniversaries. Can span days. */
export interface Milestone {
  id: string
  title: string
  emoji: string
  /** ISO dates, inclusive range; single-day when start === end. */
  start: string
  end: string
}

export interface AppState {
  activities: ActivityIdea[]
  entries: CalendarEntry[]
  milestones: Milestone[]
  /** Activity ids Naser & Reem hearted in the swipe deck, in the order added. */
  shortlist: string[]
  /** Activity ids marked "not for us" in the deck — hidden from future decks, always restorable. */
  rejected: string[]
}
