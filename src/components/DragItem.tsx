import { useRef, useState, type ReactNode, type PointerEvent as ReactPointerEvent } from 'react'

/**
 * A draggable-or-tappable surface. Dragging past an 8px threshold and
 * releasing over an element with [data-dropzone] resolves that zone's id.
 * A plain tap (no movement) calls onChoose(null) — callers use that as the
 * "open a picker instead" fallback, so the interaction is forgiving on
 * touch devices where dragging can be fiddly.
 */
export function DragItem({
  children,
  onChoose,
  ariaLabel,
  className = '',
}: {
  children: ReactNode
  onChoose: (dropZone: string | null) => void
  ariaLabel: string
  className?: string
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const start = useRef<{ x: number; y: number } | null>(null)
  const moved = useRef(false)
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null)

  const onDown = (e: ReactPointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY }
    moved.current = false
    ref.current?.setPointerCapture(e.pointerId)
  }

  const onMove = (e: ReactPointerEvent) => {
    if (!start.current) return
    const dx = e.clientX - start.current.x
    const dy = e.clientY - start.current.y
    if (Math.abs(dx) > 8 || Math.abs(dy) > 8) moved.current = true
    if (moved.current) setDrag({ x: dx, y: dy })
  }

  const onUp = (e: ReactPointerEvent) => {
    if (!start.current) return
    let zone: string | null = null
    if (moved.current) {
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
      zone = el?.closest<HTMLElement>('[data-dropzone]')?.dataset.dropzone ?? null
    }
    start.current = null
    setDrag(null)
    onChoose(zone)
  }

  return (
    <button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      className={`drag-item ${drag ? 'drag-item--dragging' : ''} ${className}`}
      style={drag ? { transform: `translate(${drag.x}px, ${drag.y}px)` } : undefined}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={() => {
        start.current = null
        setDrag(null)
      }}
    >
      {children}
    </button>
  )
}
