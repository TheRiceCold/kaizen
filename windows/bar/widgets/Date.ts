import PanelButton from './PanelButton'
import options from 'options'

const { DateTime } = imports.gi.GLib
const { format, action } = options.bar.date

const INTERVAL = 1000
const local = DateTime.new_now_local
const clock = Variable(local(), { poll: [INTERVAL, () => local()] })

const Time = Widget.Label({
  label: Utils.derive([clock, format], (c, f) => c.format(f) || '').bind()
})

export default () => PanelButton({
  child: Time,
  window: 'dashboard',
  onClicked: action.bind(),
})
