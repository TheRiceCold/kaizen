import { Widget } from '../../imports.js'
import { StackState } from '../../services/main.js'
import { FontIcon } from '../../misc/main.js'

import icons from '../../icons.js'

const stackState = new StackState('audio')

const SettingsButton = ({ icon, title, ...props }) => Widget.Button({
  ...props,
  className: 'qs-button',
  child: FontIcon(icon),
  onClicked: () => stackState.value = title,
}).hook(stackState, btn => btn.toggleClassName('active', title === stackState.value))

const Header = Widget.Box({
  spacing: 5,
  homogeneous: true,
  class_name: 'qs-header',
  children: [
    SettingsButton({
      icon: icons.notifications.chat,
      title: 'notifications',
      class_name: 'qs-button active',
      tooltip_text: 'Notifications',
    }),
    SettingsButton({
      icon: 'network-wireless-signal-good-symbolic',
      title: 'wifi',
      tooltip_text: 'Wi-Fi',
    }),
    SettingsButton({
      icon: icons.bluetooth.enabled,
      title: 'bluetooth',
      tooltip_text: 'Bluetooth',
    }),
    SettingsButton({
      icon: icons.audio.volume.high,
      title: 'audio',
      tooltip_text: 'Audio',
    }),
    SettingsButton({
      icon: icons.mpris.fallback,
      title: 'mpris',
      tooltip_text: 'Media',
    }),
    SettingsButton({
      icon: icons.ai,
      title: 'chatgpt',
      tooltip_text: 'ChatGPT',
    })
  ]
})

export default () => {
  stackState.items = stack.items.map(item => item[0])
  return Widget.EventBox({
    child: Widget.Box({
      vertical: true,
      children: [ Header ]
    })
  })
}
