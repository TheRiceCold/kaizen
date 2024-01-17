import { Widget } from '../../../../imports.js'

// import Cava from './Cava.js'
import WifiList from './WifiList.js'
import AudioContent from './Audio.js'
import BluetoothList from './BluetoothList.js'
import MprisPlayerList from './mpris/PlayerList.js'

import NotificationList from './NotificationList.js'

export default state => Widget.Stack({
  transition: 'slide_left_right',
  visibleChildName: state.bind(),
  items: [
    ['notifications', NotificationList],
    ['wifi', WifiList],
    ['bluetooth', BluetoothList],
    ['audio', AudioContent],
    ['mpris', MprisPlayerList],
    // ['chatgpt', ChatGPT]
    // ['themes', Themes],
  ],
})
