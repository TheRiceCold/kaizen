import { notificationIcon } from 'lib/variables'
import icons from 'data/icons'

import AudioList from './audio'
import NetworkList from './networks'
import BluetoothList from './bluetooth'
import NotificationList from './notifications'

const { wifi } = await Service.import('network')
const bluetooth = await Service.import('bluetooth')

export default [
  { 
    name: 'notificationList', 
    icon: notificationIcon,
    content: NotificationList,  
  },
  { 
    name: 'networkList',
    content: NetworkList,
    icon: wifi.bind('icon_name'),
  },
  { 
    name: 'bluetoothList',
    content: BluetoothList,
    icon: bluetooth.bind('enabled').as((p: string) => icons.bluetooth[p ? 'enabled' : 'disabled']),
  },
  { name: 'audioList', 
    icon: icons.audio.type.speaker,
    content: AudioList,
  }
]
