import { type ToggleButtonProps } from 'types/widgets/togglebutton'

import { setupCursorHover } from 'misc/cursorhover'
import { type TDevice } from '.'

const bluetooth = await Service.import('bluetooth')

function Battery (device: TDevice) {
  const icon = (p: number) => 
    (p < 10) ? '󰁺' : (p < 30) ? '󰁼' : (p < 40) ? '󰁽' : (p < 50) ? '󰁾' : (p < 60) ? '󰁿' : (p < 80) ? '󰂁' : '󰁹'

  return Widget.Label({
    visible: device.bind('battery_percentage').as((p: number) => p > 0),
    label: device.bind('battery_percentage').as((p: number) => `${icon(p)} ${p}%`),
  })
}

const ToggleButton = (device: TDevice) => Widget.ToggleButton({
  hpack: 'end',
  hexpand: true,
  active: device.connected,
  setup (self: ToggleButtonProps) { 
    setupCursorHover(self)
    self.on('notify::active', () => device.setConnection(self.active))
  },
  label: device.bind('connected').as((c: boolean) => c ? 'Connected' : 'Connect'),
  visible: Utils.merge([
    bluetooth.bind('enabled'),
    device.bind('connecting'),
  ], (enabled: boolean, connecting: boolean) => enabled && !connecting),
})


export default (device: TDevice) => Widget.Box(
  { className: 'device-item' },
  Widget.Icon(device.icon_name + '-symbolic'),
  Widget.Label({ label: device.name, className: 'name' }),
  Battery(device),
  Widget.Spinner({
    hpack: 'end',
    hexpand: true,
    active: device.bind('connecting'),
    visible: device.bind('connecting'),
  }),
  ToggleButton(device)
)
