import { notificationIcon } from 'lib/variables'
import icons from 'data/icons'

import WifiList from './wifi'
import AudioList from './audio'
import BluetoothList from './bluetooth'
import NotificationList from './notifications'

const { wifi } = await Service.import('network')
const bluetooth = await Service.import('bluetooth')

export default [
  { 
    name: 'notificationList', 
    content: NotificationList,  
    icon: notificationIcon,
  },
  { 
    name: 'wifiList',
    content: WifiList,
    icon: wifi.bind('icon_name'),
  },
  { 
    name: 'bluetoothList',
    content: BluetoothList,
    icon: bluetooth.bind('enabled').as((p: string) => icons.bluetooth[p ? 'enabled' : 'disabled']),
  },
  { 
    name: 'audioList', 
    content: AudioList,
    icon: icons.audio.type.speaker,
  }
]
