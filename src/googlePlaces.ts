import type { ActivityCategory } from './types'

export interface PlaceResult {
  name: string
  address: string
  category: ActivityCategory
  emoji: string
  rating?: number
  mapQuery: string
  googleUrl: string
}

const CATEGORY_RULES: { pattern: RegExp; category: ActivityCategory; emoji: string }[] = [
  { pattern: /restaurant|cafe|bakery|bar|meal_takeaway|meal_delivery|food/, category: 'food', emoji: '🍽️' },
  { pattern: /park|garden|zoo|aquarium|campground|hiking_area|beach|natural_feature/, category: 'garden', emoji: '🌳' },
  { pattern: /museum|historical|tourist_attraction|amusement_park|landmark|zoo|aquarium/, category: 'big-trip', emoji: '📍' },
  { pattern: /store|shopping_mall|supermarket|market/, category: 'local', emoji: '🛍️' },
  { pattern: /event_venue|stadium|movie_theater|concert_hall/, category: 'event', emoji: '🎉' },
]

function guessCategoryAndEmoji(types: string[]): { category: ActivityCategory; emoji: string } {
  const joined = types.join(' ')
  for (const rule of CATEGORY_RULES) {
    if (rule.pattern.test(joined)) return { category: rule.category, emoji: rule.emoji }
  }
  return { category: 'local', emoji: '📍' }
}

/**
 * Real place search via Google's Places API (New) "Text Search" — a plain
 * authenticated fetch, no Maps JS SDK. Requires VITE_GOOGLE_MAPS_API_KEY
 * with Places API (New) enabled on the project.
 */
export async function searchPlaces(query: string): Promise<PlaceResult[]> {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined
  if (!apiKey) throw new Error('Place search is not configured (missing API key).')

  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask':
        'places.displayName,places.formattedAddress,places.types,places.primaryType,places.googleMapsUri,places.rating,places.userRatingCount',
    },
    body: JSON.stringify({
      textQuery: `${query}, Virginia`,
      maxResultCount: 6,
      regionCode: 'US',
    }),
  })

  if (!res.ok) throw new Error(`Place search failed (${res.status})`)
  const data = await res.json()
  const places: unknown[] = data.places ?? []

  return places.map((p) => {
    const place = p as {
      displayName?: { text?: string }
      formattedAddress?: string
      types?: string[]
      primaryType?: string
      googleMapsUri?: string
      rating?: number
    }
    const name = place.displayName?.text ?? 'Unknown place'
    const address = place.formattedAddress ?? ''
    const types = place.types ?? (place.primaryType ? [place.primaryType] : [])
    const { category, emoji } = guessCategoryAndEmoji(types)
    return {
      name,
      address,
      category,
      emoji,
      rating: place.rating,
      mapQuery: name,
      googleUrl: place.googleMapsUri ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`,
    }
  })
}
