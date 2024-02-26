import { type BluetoothDevice } from 'types/service/bluetooth'
import { Menu, ArrowToggleButton } from '../ToggleButton'
import icons from "lib/icons"

const bluetooth = await Service.import('bluetooth')

export const BluetoothToggle = () => ArrowToggleButton({
  name: 'bluetooth',
  label: Utils.watch('Disabled', bluetooth, () => {
    if (!bluetooth.enabled)
      return 'Disabled'
    if (bluetooth.connected_devices.length === 1)
      return bluetooth.connected_devices[0].alias

    return `${bluetooth.connected_devices.length} Connected`
  }),
  activate: () => bluetooth.enabled = true,
  deactivate: () => bluetooth.enabled = false,
  connection: [bluetooth, () => bluetooth.enabled],
  icon: bluetooth.bind('enabled').as(p => icons.bluetooth[p ? 'enabled' : 'disabled']),
})

const DeviceItem = (device: BluetoothDevice) => Widget.Box({
  children: [
    Widget.Icon(device.icon_name + "-symbolic"),
    Widget.Label(device.name),
    Widget.Label({
      label: `${device.battery_percentage}%`,
      visible: device.bind("battery_percentage").as(p => p > 0),
    }),
    Widget.Box({ hexpand: true }),
    Widget.Spinner({
      active: device.bind("connecting"),
      visible: device.bind("connecting"),
    }),
    Widget.Switch({
      active: device.connected,
      visible: device.bind('connecting').as(p => !p),
      setup: self => self.on('notify::active', () => device.setConnection(self.active)),
    }),
  ],
})

export const BluetoothDevices = () => Menu({
  name: 'bluetooth',
  title: 'Bluetooth',
  icon: icons.bluetooth.disabled,
  content: [
    Widget.Box({
      hexpand: true,
      vertical: true,
      className: 'bluetooth-devices',
      children: bluetooth.bind('devices').as(ds => ds.filter(d => d.name).map(DeviceItem)),
    }),
  ],
})
