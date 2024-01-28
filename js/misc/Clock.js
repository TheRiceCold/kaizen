import { Widget, Variable } from '../imports.js'
const { DateTime } = imports.gi.GLib

export default ({
  format = '%H:%M:%S %B %e. %A',
  interval = 1000,
  ...props
} = {}) => {
  const clock = Variable(DateTime.new_now_local(), {
    poll: [1000, () => DateTime.new_now_local()],
  })

  return Widget.Label({
    ...props,
    className: 'clock',
    label: clock.bind('value').transform(time => time.format(format) || 'wrong format'),
  })
}
