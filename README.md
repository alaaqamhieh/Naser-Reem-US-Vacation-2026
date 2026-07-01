# 🧳 Welcome Naser & Reem

A warm, interactive welcome site and vacation itinerary planner for Naser &
Reem's visit to Richmond, VA (July 4 – Aug 13, 2026).

It runs entirely in the browser. There is **no backend, no accounts, no ads,
no analytics, and no external API calls** — everything happens locally on
your device.

---

## What it is

- **A welcome hero** with the trip dates and a short, warm message.
- **An interactive calendar** (July + August 2026) pre-filled with a
  recommended day-by-day itinerary — drag any idea from the list below onto
  a day, or tap a day's **+** to pick one.
- **A "Things To Do" library** of curated activity ideas (big trips,
  gardens, food experiences, home & family nights, local Richmond spots,
  and dated events), organized by category. Don't see something you love?
  Add your own idea — it becomes schedulable just like the built-in ones.
- **Calendar export** — every scheduled item (and the whole itinerary) can
  be downloaded as a `.ics` file to drop into a phone's calendar app.

Everything is fully editable: drag activities around, remove anything,
create your own ideas, and it all persists in your browser between visits.

---

## How to run

```bash
npm install     # install dependencies
npm run dev     # start the dev server (open the printed local URL)
npm run build   # type-check + production build into /dist
npm run preview # preview the production build
```

Requires Node 18+.

---

## Privacy

- ❌ No ads
- ❌ No accounts or logins
- ❌ No analytics
- ❌ No tracking
- ❌ No external API calls

The only thing stored is the calendar itself — which activities are
scheduled on which days, and any custom ideas you've added — saved in your
browser's `localStorage` on this device only.

---

## Customizing

Almost everything is data-driven and lives in `src/data.ts`.

### Change the trip dates or names

```ts
export const TRIP_START = '2026-07-04'
export const TRIP_END = '2026-08-13'
export const WELCOME_NAMES = { dad: 'Naser', mom: 'Reem' }
```

### Add more activity ideas

Copy an entry in the `SEED_ACTIVITIES` array:

```ts
{
  id: 'sunset-picnic',
  title: 'Sunset Picnic by the River',
  emoji: '🧺',
  category: 'local',
  description: 'A relaxed evening picnic with a view of the James.',
}
```

### Adjust the recommended starting itinerary

Edit `SEED_ENTRIES` — each entry links an activity id to a specific date
(and an optional note):

```ts
entry('2026-07-20', 'sunset-picnic', 'Bring the blanket and some tea.')
```

> Note: `SEED_ACTIVITIES` / `SEED_ENTRIES` only seed the calendar on first
> load. After that, everything you add, move, or remove lives in
> `localStorage` — editing `data.ts` won't change what's already saved in a
> browser that's visited the site before. To reset back to the shipped
> itinerary, clear the site's local storage.

### Change colors or style

All styling is in `src/index.css`. The palette is defined as CSS variables
at the top (`:root { --bg, --accent, --gold, --sky, ... }`), including
per-category accent colors (`--cat-big-trip`, `--cat-garden`, etc.).

---

## Project layout

```
index.html          # app shell + emoji favicon
src/main.tsx         # React entry point
src/App.tsx           # state ownership, persistence wiring, layout composition
src/types.ts            # ActivityIdea / CalendarEntry / AppState types
src/data.ts               # trip dates, welcome names, seed activities & calendar
src/storage.ts              # localStorage load/save
src/ics.ts                    # .ics calendar export
src/dateUtils.ts                # date math for the month-grid calendar
src/useEscapeToClose.ts           # shared Escape-to-close hook for modals
src/components/                     # Hero, Calendar, Library, cards, modals
```

Made to be warm, simple, private, and exciting. 🎉
