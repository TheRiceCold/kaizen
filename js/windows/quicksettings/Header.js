import { TabNavigator } from './exports.js'
import { FontIcon } from '../../misc/main.js'
import { openSettings } from '../../settings/theme.js'
import { setupCursorHover } from '../../misc/CursorHover.js'
import { variables, options } from '../../constants/main.js'

const Uptime = Widget.Label({
  className: 'uptime',
  label: variables.uptime.bind('value').transform(v => `Uptime: ${v}`),
})

const Avatar = Widget.Box({ className: 'avatar' })
.hook(options.desktop.avatar, box => box.setCss(`
  background-image: url('${options.desktop.avatar.value}');
`)).on('size-allocate', box => {
  const h = box.get_allocated_height();
  box.set_size_request(Math.ceil(h * 1.1), -1);
})

const systemButtons = [
  {
    icon: '',
    onClicked: openSettings,
    tooltipText: 'Open Settings',
  },
  {
    icon: '',
    tooltipText: 'Power Menu',
    onClicked: () => App.toggleWindow('powermenu')
  },
]

const Button = ({ icon, onClicked, tooltipText }) => Widget.Button({
  onClicked,
  tooltipText,
  hpack: 'end',
  child: FontIcon(icon),
  setup: setupCursorHover,
  className: 'icon-button',
})

export default Widget.Box({
  hexpand: true,
  className: 'header',
  children: [ 
    TabNavigator, 
    Widget.Box({ hexpand: true }), 
  ].concat(systemButtons.map(Button))
})
