import { Widget, Bluetooth } from '../../../imports.js'
// @ts-ignore
import { Switch } from './Widgets.js'

export default () => Widget.Box({
  hexpand: true,
  vertical: true,
}).hook(Bluetooth, box => {
  box.children = Bluetooth.devices.map(device => Widget.Box({
    hexpand: false,
    children: [
      Widget.Label(device.name),
      Widget.Box({hexpand: true}),
      device.connecting ?
        Widget.Spinner({ active: true }) :
        Switch({active: device.connected})
          .on('notify::active', ({active}) => {
            if (active !== device.connected)
              device.setConnection(active)
          })
    ],
  }))
})
