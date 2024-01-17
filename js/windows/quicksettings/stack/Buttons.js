import { Widget } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'
import { icons } from '../../../constants/main.js'
import { setupCursorHover } from '../../../misc/CursorHover.js'

const buttons = [ 
  { 
    icon: FontIcon('󰂚'),
    title: 'notifications',
    tooltipText: 'Notifications',
  },
  {
    icon: FontIcon('󰤨'),
    title: 'wifi',
    tooltipText: 'Wi-Fi',
  },
  {
    icon: FontIcon('󰂯'),
    title: 'bluetooth',
    tooltipText: 'Bluetooth',
  },
  {
    icon: FontIcon(icons.audio.volume.high),
    title: 'audio',
    tooltipText: 'Audio',
  },
  {
    icon: FontIcon(icons.mpris.fallback),
    title: 'mpris',
    tooltipText: 'Media',
  },
  {
    icon: Widget.Icon(icons.ai.chatgpt),
    title: 'chatgpt',
    tooltipText: 'ChatGPT',
  },
  {
    icon: FontIcon('󰏘'),
    title: 'themes',
    tooltipText: 'Themes',
  }
]

const Button = ({ state, icon, title, ...props }) => Widget.Button({
  ...props,
  child: icon,
  setup: btn => setupCursorHover(btn),
  onClicked: () => state.value = title,
  className: 'txt-norm sidebar-iconbutton',
})

export default state => Widget.Box({
  hpack: 'center',
  className: 'sidebar-togglesbox spacing-h-10',
  children: buttons.map(props => Button({ state, ...props }))
})
