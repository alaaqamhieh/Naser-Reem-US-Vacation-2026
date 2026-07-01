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
}

export interface AppState {
  activities: ActivityIdea[]
  entries: CalendarEntry[]
}
