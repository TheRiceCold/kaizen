import { notificationIcon } from 'lib/variables'
import icons from 'data/icons'

import WifiList from './wifi'
import AudioList from './audio'
import BluetoothList from './bluetooth'
import NotificationList from './notifications'

export default [
  { 
    name: 'notificationList', 
    content: NotificationList,  
    icon: notificationIcon,
  },
  { 
    name: 'wifiList',
    content: WifiList,
    icon: 'network-wireless-symbolic' ,
  },
  { 
    name: 'bluetoothList',
    content: BluetoothList,
    icon: icons.bluetooth.enabled,
  },
  { 
    name: 'audioList', 
    content: AudioList,
    icon: icons.audio.type.speaker,
  }
]
