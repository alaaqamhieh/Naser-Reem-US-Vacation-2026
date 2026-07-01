/**
 * Sticky bottom navigation for phones (hidden on wider screens via CSS) —
 * one thumb-tap to jump between the main sections or open the idea deck.
 */
export function QuickNav({ onOpenDeck }: { onOpenDeck: () => void }) {
  return (
    <nav className="quick-nav" aria-label="Quick navigation">
      <a className="quick-nav__item" href="#calendar">
        <span aria-hidden="true">🗓️</span>
        Calendar
      </a>
      <a className="quick-nav__item" href="#shortlist">
        <span aria-hidden="true">❤️</span>
        Shortlist
      </a>
      <a className="quick-nav__item" href="#ideas">
        <span aria-hidden="true">💡</span>
        Ideas
      </a>
      <button type="button" className="quick-nav__item" onClick={onOpenDeck}>
        <span aria-hidden="true">🃏</span>
        Deck
      </button>
    </nav>
  )
}
