import type { CSSProperties } from 'react'
import type { ActivityIdea, CalendarEntry, Milestone } from '../types'
import { spanEdges } from '../dateUtils'
import { milestoneColor } from '../milestoneColors'
import { ActivityChip } from './ActivityChip'

export function DayCell({
  date,
  entries,
  activities,
  onRemove,
  onToggleCompleted,
  onOpenPicker,
  onEditEntry,
  onOpenDay,
  milestones,
  onEditMilestone,
  isToday,
}: {
  date: string
  entries: { entry: CalendarEntry; isStart: boolean }[]
  activities: ActivityIdea[]
  onRemove: (entryId: string) => void
  onToggleCompleted: (entryId: string) => void
  onOpenPicker: () => void
  onEditEntry: (entryId: string) => void
  onOpenDay: () => void
  milestones: { m: Milestone; isStart: boolean }[]
  onEditMilestone: (milestoneId: string) => void
  isToday?: boolean
}) {
  const dayNum = Number(date.slice(8, 10))
  const byId = new Map(activities.map((a) => [a.id, a]))

  // The day's background tint comes straight from whichever special date
  // covers it (first one wins if more than one overlaps) — one system, not two.
  const primaryMilestone = milestones[0]?.m
  const cellColor = primaryMilestone ? milestoneColor(primaryMilestone.color) : null
  const cellStyle: CSSProperties | undefined = cellColor ? { background: cellColor.soft } : undefined

  return (
    <div
      className={`day-cell ${isToday ? 'day-cell--today' : ''} ${cellColor ? 'day-cell--milestone' : ''}`}
      style={cellStyle}
      data-dropzone={date}
    >
      {/* On phones the whole cell is one big tap target opening the day sheet;
          hidden on desktop where chips are interacted with directly. */}
      <button type="button" className="day-cell__tap" aria-label={`See plans for day ${dayNum}`} onClick={onOpenDay} />
      <div className="day-cell__num">{dayNum}</div>
      {milestones.map(({ m, isStart }) => {
        const c = milestoneColor(m.color)
        const { roundLeft, roundRight } = spanEdges(date, m.start, m.end)
        return (
          <button
            key={m.id}
            type="button"
            className={`span-bar milestone-ribbon ${roundLeft ? 'span-bar--round-left' : 'span-bar--cut-left'} ${roundRight ? 'span-bar--round-right' : 'span-bar--cut-right'}`}
            style={{ background: c.base, color: '#fffdf8' }}
            title={m.title}
            aria-label={`Special date: ${m.emoji} ${m.title}. Tap to edit.`}
            onClick={() => onEditMilestone(m.id)}
          >
            {isStart && <span className="span-bar__title">{m.title}</span>}
          </button>
        )
      })}
      <div className="day-cell__chips">
        {entries.map(({ entry: e, isStart }) => {
          const activity = byId.get(e.activityId)
          if (!activity) return null
          const isMultiDay = !!e.endDate && e.endDate !== e.date
          if (isMultiDay) {
            const { roundLeft, roundRight } = spanEdges(date, e.date, e.endDate ?? e.date)
            return (
              <button
                key={e.id}
                type="button"
                className={`span-bar entry-span-bar entry-span-bar--${activity.category} ${roundLeft ? 'span-bar--round-left' : 'span-bar--cut-left'} ${roundRight ? 'span-bar--round-right' : 'span-bar--cut-right'}`}
                title={activity.title}
                aria-label={`${activity.title}, multi-day plan. Tap to edit.`}
                onClick={() => onEditEntry(e.id)}
              >
                <span aria-hidden="true">{activity.emoji}</span>
                {isStart && <span className="span-bar__title">{activity.title}</span>}
              </button>
            )
          }
          return (
            <ActivityChip
              key={e.id}
              entry={e}
              activity={activity}
              onRemove={() => onRemove(e.id)}
              onToggleCompleted={() => onToggleCompleted(e.id)}
              onEdit={() => onEditEntry(e.id)}
            />
          )
        })}
      </div>
      <button type="button" className="day-cell__add" aria-label={`Add an activity on day ${dayNum}`} onClick={onOpenPicker}>
        +
      </button>
    </div>
  )
}
