import { capitalize } from 'lib/utils'

const now = new Date()

function yearProgress() {
  const start = new Date(now.getFullYear(), 0, 1)
  const end = new Date(now.getFullYear() + 1, 0, 1)
  const total = end - start
  const elapsed = now - start
  return elapsed / total
}

function monthProgress() {
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  const total = end - start
  const elapsed = now - start
  return elapsed / total
}

function weekProgress() {
  const startOfWeek = new Date(now)

  startOfWeek.setDate(now.getDate() - now.getDay())
  startOfWeek.setHours(0, 0, 0, 0)

  const startOfNextWeek = new Date(startOfWeek)

  startOfNextWeek.setDate(startOfWeek.getDate() + 7)

  const totalWeekTime = startOfNextWeek - startOfWeek
  const elapsedWeekTime = now - startOfWeek
  return elapsedWeekTime / totalWeekTime
}

function dayProgress() {
  const start = new Date(now)
  start.setHours(0, 0, 0, 0)

  const end = new Date(start)
  end.setDate(start.getDate() + 1)

  const total = end - start
  const elapsed = now - start
  return elapsed / total
}

function ProgressBar(time: 'day' | 'week' | 'month' | 'year') {
  const getValue = () => {
    switch(time) {
      case 'day': return dayProgress()
      case 'week': return weekProgress()
      case 'month': return monthProgress()
      case 'year': return yearProgress()
    }
  }

  return Widget.Box(
    { vertical: true },
    Widget.ProgressBar({
      vertical: true,
      inverted: true,
      hpack: 'center',
      value: getValue()
    }),
    Widget.Label(Math.floor(getValue() * 100)+'%'),
    Widget.Label(capitalize(time)),
  )
}

export default Widget.Box({
  className: 'time-progress',
  attribute: {
    updateChildren: () => [
      ProgressBar('year'),
      ProgressBar('month'),
      ProgressBar('week'),
      ProgressBar('day'),
    ]
  }
}).poll(1800000, self => self.children = self.attribute.updateChildren()) // Every 30mins

