import { type ButtonProps } from 'types/widgets/button'

import { ButtonLabel } from 'widgets'
import { addCalendarChildren, CalendarDays } from '.'
import { getCalendarLayout } from 'misc/calendarlayout'

let monthshift = 0
export let calendarJson = getCalendarLayout(undefined, true)

function getDateInXMonthsTime(x: number) {
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

function shiftCalendarXMonths(x: number) {
  if (x === 0) monthshift = 0
  else monthshift += x

  let newDate
  if (monthshift === 0) newDate = new Date()
  else newDate = getDateInXMonthsTime(monthshift)

  const year = newDate.getFullYear()
  const month = newDate.toLocaleString('default', { month: 'long' })
  calendarJson = getCalendarLayout(newDate, (monthshift === 0))
  calendarMonthYear.label = `${month} ${year}`
  addCalendarChildren(CalendarDays, calendarJson)
}

const calendarMonthYear = Widget.Button({
  cursor: 'pointer',
  className: 'date',
  onClicked() { shiftCalendarXMonths(0) },
  setup(self: ButtonProps) {
    const year = new Date().getFullYear()
    const month = new Date().toLocaleString('default', { month: 'long' })
    self.label = month+' '+year
  }
})

const ShiftButton = (
  icon: string,
  shiftValue: number
) => ButtonLabel(icon, () => shiftCalendarXMonths(shiftValue), { className: 'monthshift-btn' })

export default Widget.Box(
  { className: 'header', hpack: 'center'},
  ShiftButton('', -1),
  calendarMonthYear,
  ShiftButton('', 1)
)
