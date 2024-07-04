import WifiList from './wifi'
import AudioList from './audio'
import DisplayOptions from './display'
import BluetoothList from './bluetooth'
import NotificationList from './notifications'

export default [
  {
    label: 'Notifications',
    name: 'notificationList',
    content: NotificationList,
  },
  {
    label: 'Network',
    name: 'wifiList',
    content: WifiList,
  },
  {
    label: 'Bluetooth',
    name: 'bluetoothList',
    content: BluetoothList,
  },
  {
    label: 'Audio',
    name: 'audioList',
    content: AudioList,
  },
  {
    label: 'Settings',
    name: 'displayOptions',
    content: DisplayOptions,
  }
]
