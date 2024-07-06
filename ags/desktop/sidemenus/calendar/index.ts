import MenuRevealer from '../MenuRevealer'

import Header, { calendarJson } from './Header'

const weekDays = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ]

const CalendarDay = (day, today) => Widget.Button({
  hpack: 'center',
  label: String(day),
  className: `calendar-btn ${
    (today === 1)
      ? 'calendar-btn-today'
      : (today === -1)
        ? 'calendar-btn-othermonth' : '' }`,
})

export function addCalendarChildren(box, calendarJson) {
  const children = box.get_children()
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    child.destroy()
  }
  box.children = calendarJson.map(row => Widget.Box({
    children: row.map(day => CalendarDay(day.day, day.today)),
  }))
}

export const CalendarDays = Widget.Box({
  hexpand: true,
  vertical: true,
  className: 'body',
  setup(self) { addCalendarChildren(self, calendarJson) }
})

export default MenuRevealer('calendar', Widget.Box({
  vertical: true,
  hpack: 'center',
  className: 'calendar',
  children: [
    Header,
    Widget.Box({
      hexpand: true,
      className: 'weekdays',
      children: weekDays.map(day => CalendarDay(day, 0))
    }),
    CalendarDays
  ]
}))
