import { Widget, Bluetooth, Network } from '../../imports.js'
import { StackState } from '../../services/main.js'

import Menu from './Menu.js'
import Cava from './Cava.js'
import WifiList from './WifiList.js'
import AudioContent from './Audio.js'
import BluetoothList from './BluetoothList.js'
import MprisPlayerList from './mpris/PlayerList.js'

import { FontIcon } from '../../misc/main.js'
import { icons } from '../../constants/main.js'

export const QSState = new StackState('audio')

const QuickSettingsButton = ({ icon, title, ...props }) => Widget.Button({
  child: icon,
  className: 'qs-button',
  ...props,
  onClicked: () => QSState.value = title
  ,
}).hook(QSState, btn => {
  btn.toggleClassName("active", title === QSState.value);
});

const Header = () => Widget.Box({
  homogeneous: true,
  spacing: 5,
  className: 'qs-header',
  children: [
    QuickSettingsButton({
      icon: FontIcon('󰂚'),
      title: 'notifications',
      className: "qs-button active",
      tooltip_text: "Notifications",
    }),
    QuickSettingsButton({
      icon: FontIcon('󰤨'),
      title: 'wifi',
      tooltip_text: 'Wi-Fi',
    }),
    QuickSettingsButton({
      icon: FontIcon('󰂯'),
      title: 'bluetooth',
      tooltip_text: 'Bluetooth',
    }),
    QuickSettingsButton({
      icon: FontIcon(icons.audio.volume.high),
      title: 'audio',
      tooltip_text: 'Audio',
    }),
    QuickSettingsButton({
      icon: FontIcon(icons.mpris.fallback),
      title: 'mpris',
      tooltip_text: 'Media',
    }),
    QuickSettingsButton({
      icon: Widget.Icon(icons.ai.chatgpt),
      title: 'chatgpt',
      tooltip_text: 'ChatGPT',
    })
  ]
});

const Page = content => Widget.Scrollable({
  className: 'qs-page',
  vexpand: true,
  hexpand: true,
  hscroll: 'never',
  child: content
})

const Content = () => Widget.Stack({
  transition: 'slide_left_right',
  visible_child_name: QSState.bind(),
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
    ["wifi", Page(Menu({
      title: "Wi-Fi",
      icon: "network-wireless-signal-good-symbolic",
      content: WifiList(),
      headerChild: Widget.Switch().hook(Network, sw => {
        if (sw.active !== Network.wifi.enabled)
          sw.active = Network.wifi.enabled;
      }).on("notify::active", ({ active }) => {
        if (active !== Network.wifi.enabled)
          Network.wifi.enabled = active;
      })
    }))],
    ["bluetooth", Page(Menu({
      title: "Bluetooth",
      icon: icons.bluetooth.enabled,
      content: BluetoothList(),
      headerChild: Widget.Switch().hook(Bluetooth, sw => {
        if (sw.active !== Bluetooth.enabled)
          sw.active = Bluetooth.enabled
      }).on("notify::active", ({ active }) => {
        if (active !== Bluetooth.enabled)
          Bluetooth.enabled = active
      })
    }))],
    ["audio", Page(Menu({
      title: "Audio",
      icon: icons.audio.volume.high,
      content: AudioContent()
    }))],
    ["mpris", Page(Menu({
      title: "Player",
      icon: icons.mpris.fallback,
      content: MprisPlayerList(),
    }))],
    // ["chatgpt", Page(Menu({
    //   title: "ChatGPT",
    //   icon: icons.ai,
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
    // }))]
  ],
})

export default () =>  {
  const header = Header()
  const content = Content()
  QSState.items = content.items.map(i => i[0])
  return Widget.EventBox({
    child: Widget.Box({
      vertical: true, 
      children: [
        header,
        content,
      ]
    })
  })
}
