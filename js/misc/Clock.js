import { Widget } from '../imports.js'

const { DateTime } = imports.gi.GLib

export default ({
  format = '%H:%M:%S %B %e. %A',
  interval = 1000,
  ...props
} = {}) => {
  const date = DateTime.new_now_local().format(format) || 'wrong format'

  return Widget.Label({
    ...props,
    className: 'clock',
    connections: [[interval, label => label.label = date]],
  })
}
