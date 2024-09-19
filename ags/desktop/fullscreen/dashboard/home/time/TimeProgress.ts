import { capitalize } from 'lib/utils'
import { VBox } from 'widgets'

function yearProgress(now) {
  const start = new Date(now.getFullYear(), 0, 1)
  const end = new Date(now.getFullYear() + 1, 0, 1)
  const total = Number(end) - Number(start)
  const elapsed = Number(now) - Number(start)
  return elapsed / total
}

function monthProgress(now) {
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  const total = Number(end) - Number(start)
  const elapsed = now - Number(start)
  return elapsed / total
}

function weekProgress(now) {
  const startOfWeek = new Date(now)

  startOfWeek.setDate(now.getDate() - now.getDay())
  startOfWeek.setHours(0, 0, 0, 0)

  const startOfNextWeek = new Date(startOfWeek)

  startOfNextWeek.setDate(startOfWeek.getDate() + 7)

  const totalWeekTime = Number(startOfNextWeek) - Number(startOfWeek)
  const elapsedWeekTime = now - Number(startOfWeek)
  return elapsedWeekTime / totalWeekTime
}

function dayProgress(now) {
  const start = new Date(now)
  start.setHours(0, 0, 0, 0)

  const end = new Date(start)
  end.setDate(start.getDate() + 1)

  const total = Number(end) - Number(start)
  const elapsed = Number(now) - Number(start)
  return elapsed / total
}

export default (time: 'day' | 'week' | 'month' | 'year') => VBox({
  attribute: {
    getValue(now) {
      switch (time) {
        case 'day': return dayProgress(now)
        case 'week': return weekProgress(now)
        case 'month': return monthProgress(now)
        case 'year': return yearProgress(now)
      }
    }
  },
}).poll(900_000, (self: typeof Widget.Box) => { // every 15 minutes
  const value = self.attribute.getValue(new Date())
  self.children = [
    Widget.ProgressBar({
      value,
      vertical: true,
      inverted: true,
      hpack: 'center',
    }),
    Widget.Label(Math.floor(value * 100) + '%'),
    Widget.Label(capitalize(time)),
  ]
})

