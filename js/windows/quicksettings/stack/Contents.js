import { Widget, Bluetooth, Network } from '../../../imports.js'

import Menu from './Menu.js'
import Cava from './Cava.js'
import WifiList from './WifiList.js'
import AudioContent from './Audio.js'
import BluetoothList from './BluetoothList.js'
import MprisPlayerList from './mpris/PlayerList.js'

import { icons } from '../../../constants/main.js'

const Page = content => Widget.Scrollable({ className: 'qs-page',
  vexpand: true,
  hexpand: true,
  hscroll: 'never',
  child: content
})

export default state => Widget.Stack({
  transition: 'slide_left_right',
  visible_child_name: state.bind(),
  items: [
    // ["notifications", Page(Menu({
    //   title: "Notifications",
    //   icon: icons.notifications.chat,
    //   content: NotificationList(),
    //   headerChild: Widget.Box({
    //     spacing: 5,
    //     children: [
    //       Widget.Button({
    //         onClicked: () => Notifications.clear(),
    //         child: Widget.Box({
    //           children: [
    //             Widget.Label("Clear "),
    //             Widget.Icon(icons.trash.empty)
    //           ]
    //         }),
    //         visible: Notifications.bind("notifications").transform(notifs => notifs.length > 0)
    //       }),
    //       Widget.Switch().hook(Notifications, sw => {
    //         if (sw.active === Notifications.dnd)
    //           sw.active = !Notifications.dnd;
    //       }).on("notify::active", ({ active }) => {
    //         if (active === Notifications.dnd)
    //           Notifications.dnd = !active;
    //       })
    //     ]
    //   })
    // }))],
    ['wifi', Page(Menu({
      icon: '󰤨',
      title: 'Wi-Fi',
      content: WifiList(),
      headerChild: Widget.Switch().hook(Network, sw => {
        if (sw.active !== Network.wifi.enabled)
          sw.active = Network.wifi.enabled
      }).on('notify::active', ({ active }) => {
        if (active !== Network.wifi.enabled)
          Network.wifi.enabled = active
      })
    }))],
    ['bluetooth', Page(Menu({
      title: 'Bluetooth',
      icon: icons.bluetooth.enabled,
      content: BluetoothList(),
      headerChild: Widget.Switch().hook(Bluetooth, sw => {
        if (sw.active !== Bluetooth.enabled)
          sw.active = Bluetooth.enabled
      }).on('notify::active', ({ active }) => {
        if (active !== Bluetooth.enabled)
          Bluetooth.enabled = active
      })
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
    //   headerChild: Widget.Button({
    //     on_clicked: () => ChatGPT.clear(),
    //     child: Widget.Box({
    //       children: [
    //         Widget.Label("Clear "),
    //         Widget.Icon(icons.trash.empty),
    //       ]
    //     }),
    //   })
    }))]
  ],
})
