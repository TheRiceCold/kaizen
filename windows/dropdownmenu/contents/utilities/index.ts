import {
  MicMute,
  DarkModeToggle,
  NetworkToggle,
  WifiSelection,
  BluetoothToggle,
  BluetoothDevices,
} from './widgets'
import Row from './Row'
import Sliders from './Sliders'
import options from 'options'

export default Widget.Box({
  vertical: true,
  className: 'utilities',
  css: options.menu.width.bind().as(w => `min-width: ${w}px;`),
  children: [
    Row(
      [NetworkToggle, BluetoothToggle],
      [WifiSelection, BluetoothDevices],
    ),
    Row([MicMute, DarkModeToggle]),
    Sliders,
  ]
})
