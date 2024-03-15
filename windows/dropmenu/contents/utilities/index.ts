import {
  // MicMute,
  NetworkToggle,
  WifiSelection,
  BluetoothToggle,
  BluetoothDevices,
} from './widgets'
import Row from './Row'
import Header from './header'
import Sliders from './Sliders'
import Notifications from './notifications'
import options from 'options'

export default Widget.Box({
  vertical: true,
  className: 'utilities',
  spacing: options.theme.spacing,
  css: options.dropmenu.width.bind().as(w => `min-width: ${w}px;`),
  children: [
    Header,
    Row(
      [NetworkToggle, BluetoothToggle],
      [WifiSelection, BluetoothDevices],
    ),
    Sliders,
    Notifications
  ]
})
