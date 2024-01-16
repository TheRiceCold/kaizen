import { Widget } from '../../../../imports.js'

import Menu from './Menu.js'
// import Cava from './Cava.js'
import WifiList from './WifiList.js'
import AudioContent from './Audio.js'
import BluetoothList from './BluetoothList.js'
import MprisPlayerList from './mpris/PlayerList.js'

import { FontIcon } from '../../../../misc/main.js'
import { icons } from '../../../../constants/main.js'
import NotificationList from './NotificationList.js'

const Page = content => Widget.Scrollable({
  vexpand: true,
  hexpand: true,
  hscroll: 'never',
  className: 'qs-page',
  child: content
})

export default state => Widget.Stack({
  transition: 'slide_left_right',
  visible_child_name: state.bind(),
  items: [
    ['notifications', Page(NotificationList())],
    ['wifi', Page(Menu({
      icon: '󰤨',
      title: 'Wi-Fi',
      content: WifiList(),
    }))],
    ['bluetooth', Page(Menu({
      title: 'Bluetooth',
      icon: icons.bluetooth.enabled,
      content: BluetoothList(),
    }))],
    ['audio', Page(Menu({
      title: 'Audio',
      icon: icons.audio.volume.high,
      content: AudioContent()
    }))],
    ['mpris', Page(Menu({
      title: 'Player',
      icon: icons.mpris.fallback,
      content: MprisPlayerList(),
    }))],
    ['chatgpt', Page(Menu({
      title: 'ChatGPT',
      icon: icons.ai,
      //   content: AIContent(),
      headerChild: Widget.Button({
        //     on_clicked: () => ChatGPT.clear(),
        child: Widget.Box({
          children: [
            Widget.Label('Clear '),
            FontIcon(icons.trash.empty),
          ]
        }),
      })
    }))]
  ],
})
