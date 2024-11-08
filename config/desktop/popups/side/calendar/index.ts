import { type BoxProps } from 'types/widgets/box'

import popups from 'service/popups'

import { VBox } from 'widgets'

import Header, { calendarJson } from './Header'
import PopupRevealer from '../../PopupRevealer'

const { Box, Button } = Widget
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const CalendarDay = (day: number, today: number) => Button({
  hpack: 'center',
  label: String(day),
  className: `calendar-btn ${(today === 1)
    ? 'calendar-btn-today'
    : (today === -1)
      ? 'calendar-btn-othermonth' : ''}`,
})

export function addCalendarChildren(box, calendarJson) {
  const children = box.get_children()
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    child.destroy()
  }
  box.children = calendarJson.map(row => Box({
    children: row.map(day => CalendarDay(day.day, day.today)),
  }))
}

export const CalendarDays = VBox({
  hexpand: true,
  hpack: 'center',
  className: 'body',
  setup(self: BoxProps) {
    addCalendarChildren(self, calendarJson)
  }
})

export default PopupRevealer({
  vertical: true,
  className: 'calendar',
  reveal: popups.bind('calendar-shown'),
  children: [
    Header,
    Box({
      hexpand: true,
      hpack: 'center',
      className: 'weekdays',
      children: weekDays.map(day => CalendarDay(day, 0))
    }),
    CalendarDays

  ]
})
