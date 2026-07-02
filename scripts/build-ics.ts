// Generates public/itinerary.ics from the shared seed data at build time, so
// the static file GitHub Pages serves stays in sync with src/data.ts without
// a bundler. Run with `node --experimental-strip-types` (see package.json).
//
// Note: this only ever reflects the shared/default itinerary baked in here —
// each visitor's in-browser drag-and-drop customizations live in their own
// browser's localStorage and are never uploaded anywhere, so they can't be
// part of a subscribed feed.

import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { SEED_ACTIVITIES, SEED_ENTRIES, SEED_MILESTONES } from '../src/data.ts'
import { buildItineraryIcs } from '../src/ics.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public')
const outFile = join(outDir, 'itinerary.ics')

mkdirSync(outDir, { recursive: true })
writeFileSync(outFile, buildItineraryIcs(SEED_ENTRIES, SEED_ACTIVITIES, SEED_MILESTONES))

console.log(`Wrote ${outFile}`)
