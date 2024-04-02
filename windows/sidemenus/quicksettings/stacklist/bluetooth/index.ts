import Header from '../Header'
import { sh } from 'lib/utils'

const bluetooth = await Service.import('bluetooth')

const header = Header('Bluetooth', [
  Widget.Switch({
    active: !bluetooth.enabled,
    onActivate: () => bluetooth.enabled = !bluetooth.enabled,
  }),
  Widget.Button({
    label: 'Settings',
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
  active: device.connected,
  visible: device.bind('connecting').as((p: boolean) => !p),
  label: device.bind('connected').as((c: boolean) => c ? 'Disconnect' : 'Connect'),
  setup: (self) => self.on('notify::active', () => device.setConnection(self.active))
})

const Item = device => Widget.Box({
  className: 'device-item',
  children: [
    Widget.Icon(device.icon_name + '-symbolic'),
    Widget.Label({ label: device.name, className: 'name' }),
    Battery(device),
    Widget.Box({ hexpand: true }),
    Widget.Spinner({
      active: device.bind('connecting'),
      visible: device.bind('connecting'),
    }),
    ToggleButton(device)
  ]
})

const list = Widget.Box({
  vertical: true,
  children: bluetooth.bind('devices').as(
    ds => ds.filter(d => d.name).map(Item)
  ),
})

export default Widget.Box({
  vertical: true,
  children: [ header, list ],
  className: 'bluetooth-list',
})
