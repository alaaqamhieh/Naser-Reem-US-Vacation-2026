/** A small curated palette so custom milestone colors still feel like they
 * belong to the site's warm design system, rather than a raw color picker. */
export interface MilestoneColorOption {
  key: string
  label: string
  /** Ribbon border / accent color. */
  base: string
  /** Pale background tint for ribbons and the day cell itself. */
  soft: string
  /** Readable text color on top of `soft`. */
  text: string
}

export const MILESTONE_COLORS: MilestoneColorOption[] = [
  { key: 'gold', label: 'Gold', base: '#d9a441', soft: '#f6e6bf', text: '#7a5a17' },
  // A deeper, more indigo blue — deliberately distinct from the page's own
  // ambient sky-blue background glow (--sky/--sky-soft) so it still reads as
  // its own tinted day on the calendar instead of disappearing into it.
  { key: 'sky', label: 'Denim', base: '#46629e', soft: '#d7deef', text: '#2c3f6e' },
  { key: 'green', label: 'Green', base: '#4f8f68', soft: '#dcebe0', text: '#2f5c42' },
  { key: 'rose', label: 'Rose', base: '#c97b5a', soft: '#f3ddd2', text: '#7a4326' },
  { key: 'purple', label: 'Purple', base: '#a07fc4', soft: '#e8def2', text: '#5b3f7a' },
  { key: 'mauve', label: 'Mauve', base: '#c9617a', soft: '#f3dce1', text: '#7a2f42' },
]

export const DEFAULT_MILESTONE_COLOR = 'gold'

export function milestoneColor(key: string): MilestoneColorOption {
  return MILESTONE_COLORS.find((c) => c.key === key) ?? MILESTONE_COLORS[0]
}
