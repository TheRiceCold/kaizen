import { Widget } from '../imports.js'

export default ({
  format = '%H:%M:%S %B %e. %A',
  interval = 1000,
  ...rest
} = {}) => Widget.Label({
  ...rest,
  className: 'clock',
  connections: [[interval, label =>
    label.label = imports.gi.GLib.DateTime.new_now_local().format(format) || 'wrong format',
  ]],
})
