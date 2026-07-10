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
  /** 1-5 star popularity — manually curated, or pulled from a real Google rating when added via place search. */
  popularity?: number
  /** Search text for the "Open in Google Maps" link; falls back to the title when absent. */
  mapQuery?: string
}

export interface CalendarEntry {
  id: string
  activityId: string
  /** ISO date, e.g. '2026-07-04'. Always within TRIP_START..TRIP_END. */
  date: string
  /** Inclusive end date for a multi-day plan; absent/equal to `date` = single day. */
  endDate?: string
  /** Optional 24h 'HH:mm' times; entries without one default to a generic block. */
  startTime?: string
  endTime?: string
  note?: string
}

/** A special date — flights, travel windows, anniversaries. Can span days. */
export interface Milestone {
  id: string
  title: string
  emoji: string
  /** ISO dates, inclusive range; single-day when start === end. */
  start: string
  end: string
  /** Key into MILESTONE_COLORS (src/milestoneColors.ts) — drives both the
   *  ribbon and the calendar day's background tint. */
  color: string
}

export interface TripSettings {
  tripStart: string
  tripEnd: string
  dadName: string
  momName: string
}

/** A home-cooked dinner-night idea — brainstormed by the family, browsable by
 *  cuisine, and favorited by whoever wants to see it made during the visit. */
export interface DinnerIdea {
  id: string
  dish: string
  cuisine: string
  emoji: string
  notes?: string
  /** Path under public/ to a real photo of the dish, e.g. "photos/dinner/pho.jpg". */
  photo?: string
  /** 1-5 star popularity — manually curated. */
  popularity?: number
  /** Search text for the "Find a restaurant" Google Maps link; falls back to a generated one when absent. */
  mapQuery?: string
  /** All dinner ideas are family-editable — this is a shared brainstorm list, not a curated one. */
  isCustom?: boolean
}

export interface AppState {
  activities: ActivityIdea[]
  entries: CalendarEntry[]
  milestones: Milestone[]
  /** Activity ids Naser & Reem hearted in the swipe deck, in the order added. */
  shortlist: string[]
  /** Activity ids marked "not for us" in the deck — hidden from future decks, always restorable. */
  rejected: string[]
  settings: TripSettings
  dinnerIdeas: DinnerIdea[]
  /** Dinner idea ids favorited for the stay. */
  dinnerFavorites: string[]
}
