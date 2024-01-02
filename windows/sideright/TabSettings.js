import { Widget } from '../../imports.js'
import { StackState } from '../../services/main.js'
import TabButtons from './TabButtons.js'

import icons from '../../icons.js'

const state = new StackState('audio')

const Header = Widget.Box({
  hpack: 'center',
  homogeneous: true,
  className: 'sidebar-togglesbox spacing-h-10',
  children: TabButtons(state, [
    {
      title: 'notifications',
      tooltip_text: 'Notifications',
      icon: icons.notifications.bell,
    },
    {
      title: 'wifi',
      icon: icons.notifications.bell,
      tooltip_text: 'Wi-Fi | Right-click to configure',
    },
    {
      title: 'bluetooth',
      icon: icons.bluetooth.enabled,
      tooltip_text: 'Bluetooth | Right-click to configure',
    },
    {
      title: 'chatgpt',
      tooltip_text: 'ChatGPT',
      icon: { img: icons.ai.chatgpt },
    },
    {
      title: 'theme',
      icon: icons.dialog.Color,
      tooltip_text: 'Theme Settings',
    },
    {
      icon: '',
      title: 'idle',
      tooltip_text: 'Keep system awake',
    },
  ])
})

export default () => {
  // stackState.items = stack.items.map(item => item[0])
  return Widget.EventBox({
    child: Widget.Box({
      vertical: true,
      children: [ 
        Header
      ]
    })
  })
}
