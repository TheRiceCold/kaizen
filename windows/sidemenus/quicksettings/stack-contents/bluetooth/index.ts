import Header from '../Header'

import { sh } from 'lib/utils'
import { setupCursorHover } from 'misc/cursorhover'

const bluetooth = await Service.import('bluetooth')

const header = Header('Bluetooth', [
  Widget.Button({
    setup: setupCursorHover,
    tooltipText: 'Click to toggle',
    onClicked: () => bluetooth.enabled = !bluetooth.enabled,
    label: bluetooth.bind('enabled').as((p: boolean) => `Status: ${p ? 'enabled' : 'disabled'}`),
  }),

  Widget.Button({
    label: 'Settings',
    setup: setupCursorHover,
    onClicked: () => sh('blueman-manager')
  }) 
])

function Battery (device) {
  const icon = (p: number) => 
    (p < 10) ? '󰁺' : (p < 30) ? '󰁼' : (p < 40) ? '󰁽' : (p < 50) ? '󰁾' : (p < 60) ? '󰁿' : (p < 80) ? '󰂁' : '󰁹'

  return Widget.Label({
    visible: device.bind('battery_percentage').as((p: number) => p > 0),
    label: device.bind('battery_percentage').as((p: number) => `${icon(p)} ${p}%`),
  })
}

const ToggleButton = device => Widget.ToggleButton({
  hpack: 'end',
  hexpand: true,
  active: device.connected,
  visible: device.bind('connecting').as((p: boolean) => !p),
  label: device.bind('connected').as((c: boolean) => c ? 'Connected' : 'Connect'),
  setup (self) { 
    setupCursorHover(self)
    self.on('notify::active', () => device.setConnection(self.active))
  }
})

const Item = device => Widget.Box(
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

const list = Widget.Box({
  vertical: true,
  children: bluetooth.bind('devices').as(ds => ds.filter(d => d.name).map(Item)),
})

export default Widget.Box({
  vertical: true,
  children: [ header, list ],
  className: 'bluetooth-list',
})
