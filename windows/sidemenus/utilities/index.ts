import {
  // MicMute,
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
  spacing: options.theme.spacing,
  css: options.sideright.width.bind().as(w => `min-width: ${w}px;`),
  children: [
    Row(
      [NetworkToggle, BluetoothToggle],
      [WifiSelection, BluetoothDevices],
    ),
    Sliders,
  ]
})
