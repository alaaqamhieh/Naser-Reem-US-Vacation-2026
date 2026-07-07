/** A plain "open in Google Maps" search link — no API key or billing
 *  needed, just the public maps.google.com URL scheme. */
export function googleMapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
