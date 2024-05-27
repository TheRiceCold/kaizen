import { getCalendarLayout } from 'misc/calendarlayout'

let monthshift = 0
let calendarJson = getCalendarLayout(undefined, true)

function getDateInXMonthsTime(x) {
  const currentDate = new Date() // Get the current date
  let targetMonth = currentDate.getMonth() + x // Calculate the target month
  let targetYear = currentDate.getFullYear() // Get the current year

  // Adjust the year and month if necessary
  targetYear += Math.floor(targetMonth / 12)
  targetMonth = (targetMonth % 12 + 12) % 12

  // Create a new date object with the target year and month
  const targetDate = new Date(targetYear, targetMonth, 1)

  // Set the day to the last day of the month to get the desired date
  // targetDate.setDate(0)

  return targetDate
}

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

export default () => {
  const calendarMonthYear = Widget.Button({
    cursor: 'pointer',
    className: 'date',
    onClicked() { shiftCalendarXMonths(0) },
    setup(self) {
      const year = new Date().getFullYear()
      const month = new Date().toLocaleString('default', { month: 'long' })
      self.label = month+' '+year
    }
  })

  const addCalendarChildren = (box, calendarJson) => {
    const children = box.get_children()
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      child.destroy()
    }
    box.children = calendarJson.map(row => Widget.Box({
      children: row.map(day => CalendarDay(day.day, day.today)),
    }))
  }

  function shiftCalendarXMonths(x) {
    if (x == 0) monthshift = 0
    else monthshift += x

    let newDate
    if (monthshift === 0) newDate = new Date()
    else newDate = getDateInXMonthsTime(monthshift)

    const year = newDate.getFullYear()
    const month = newDate.toLocaleString('default', { month: 'long' })
    calendarJson = getCalendarLayout(newDate, (monthshift === 0))
    calendarMonthYear.label = month+' '+year
    addCalendarChildren(calendarDays, calendarJson)
  }

  const calendarHeader = Widget.Box(
    { className: 'header', hpack: 'center' },
    Widget.Button({
      label : '',
      cursor: 'pointer',
      className: 'monthshift-btn',
      onClicked() { shiftCalendarXMonths(-1) },
    }),
    calendarMonthYear,
    Widget.Button({
      label : '',
      cursor: 'pointer',
      className: 'monthshift-btn',
      onClicked() { shiftCalendarXMonths(1) },
    })
  )

  const calendarDays = Widget.Box({
    hexpand: true,
    vertical: true,
    className: 'body',
    setup(self) { addCalendarChildren(self, calendarJson) }
  })

  return Widget.EventBox({
    className: 'calendar',
    onScrollUp() { shiftCalendarXMonths(-1) },
    onScrollDown() { shiftCalendarXMonths(1) },
    child: Widget.Box(
      { hpack: 'center', vertical: true },
      calendarHeader,
      Widget.Box({
        hexpand: true,
        className: 'weekdays',
        children: weekDays.map(day => CalendarDay(day, 0))
      }),
      calendarDays,
    )
  })
}
