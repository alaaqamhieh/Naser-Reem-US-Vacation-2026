import { useState } from 'react'
import { useEscapeToClose } from '../useEscapeToClose'

/**
 * A plain `webcal://` link silently does nothing on browsers/OSes that have
 * no app registered for that scheme (most desktop Chrome, many Android
 * setups) — there's no error, it just looks broken. This gives people a
 * working fallback: a copyable link plus the couple of taps each calendar
 * app actually needs to import it.
 */
export function SubscribeModal({
  subscribeUrl,
  feedUrl,
  onClose,
}: {
  subscribeUrl: string
  feedUrl: string
  onClose: () => void
}) {
  useEscapeToClose(onClose)
  const [copied, setCopied] = useState(false)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(feedUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — the link is
      // still selectable in the text field for a manual copy.
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Subscribe to the calendar" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-card__title">🔔 Subscribe to the Calendar</h2>
        <p className="modal-card__hint">
          This links the shared trip itinerary into your phone's calendar app so it stays up to date on its own — it
          shows the shared plan, not anyone's personal drag-and-drop changes on this site.
        </p>

        <div className="subscribe-modal__url-row">
          <input type="text" readOnly value={feedUrl} className="form-input subscribe-modal__url" onFocus={(e) => e.target.select()} />
          <button type="button" className="secondary-btn subscribe-modal__copy" onClick={copyLink}>
            {copied ? '✓ Copied!' : '📋 Copy link'}
          </button>
        </div>

        <a href={subscribeUrl} className="primary-btn subscribe-modal__open">
          📱 Open in a calendar app
        </a>

        <div className="subscribe-modal__steps">
          <p>
            <strong>iPhone or Mac (Apple Calendar):</strong> tap "Open in a calendar app" above — it should prompt you
            to subscribe right away.
          </p>
          <p>
            <strong>Android or Google Calendar:</strong> copy the link above, then on
            calendar.google.com go to Settings → Add calendar → "From URL", and paste it in.
          </p>
          <p>
            <strong>Outlook:</strong> copy the link, then Add calendar → "Subscribe from web", and paste it in.
          </p>
        </div>

        <div className="modal-card__actions">
          <button type="button" className="text-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
