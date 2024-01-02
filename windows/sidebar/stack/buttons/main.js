import { Widget } from '../../../../imports.js'
import { FontIcon } from '../../../../misc/main.js'
import { setupCursorHover } from '../../../../misc/CursorHover.js'
import icons from '../../../../icons.js'

const items = [
  {
    title: 'notifications',
    tooltip_text: 'Notifications',
    icon: icons.notifications.bell,
  },
  {
    icon: '󰖩',
    title: 'wifi',
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
]

export default (state) => 
  items.map(({ icon, title, ...props }) => Widget.Button({
    ...props,
    css: 'font-size: 16px;',
    className: 'sidebar-iconbutton',
    setup: btn => setupCursorHover(btn),
    onClicked: () => state.value = title,
    child: (typeof icon === 'string') ? FontIcon(icon) : Widget.Icon(icon.img),
  }).hook(
    state, 
    btn => btn.toggleClassName('active', title === state.value)
  ))

