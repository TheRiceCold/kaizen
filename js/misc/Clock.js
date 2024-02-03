import { Widget, Variable } from '../imports.js'
const { DateTime } = imports.gi.GLib

const INTERVAL = 1000
const local = DateTime.new_now_local
const defaultFormat = '%H:%M:%S %B %e. %A'

export default ({ format, ...props }) => {
  const clock = Variable(local(), { poll: [INTERVAL, () => local()] })

  const getFormat = time =>
    time.format((format ?? defaultFormat) || 'wrong format')

  return Widget.Label({
    ...props,
    label: clock.bind('value').transform(getFormat),
  })
}
