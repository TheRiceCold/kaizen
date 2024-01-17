import { Widget } from '../../../../imports.js'

import Menu from './Menu.js'
// import Cava from './Cava.js'
import WifiList from './WifiList.js'
import AudioContent from './Audio.js'
import BluetoothList from './BluetoothList.js'
import MprisPlayerList from './mpris/PlayerList.js'

import NotificationList from './NotificationList.js'

const Page = content => Widget.Scrollable({
  vexpand: true,
  hexpand: true,
  child: content,
  hscroll: 'never',
  className: 'qs-page',
})

export default state => Widget.Stack({
  transition: 'slide_left_right',
  visibleChildName: state.bind(),
  items: [
    ['notifications', Page(NotificationList)],
    ['wifi', Page(WifiList)],
    ['bluetooth', Page(BluetoothList)],
    ['audio', Page(AudioContent)],
    ['mpris', Page(MprisPlayerList)],
    // ['chatgpt', Page(ChatGPT())]
    // ['themes', Page(Themes)],
  ],
})
