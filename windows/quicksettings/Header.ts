import { TabNavigator } from './imports'
import { setupCursorHover } from 'misc/cursorhover'

const systemButtons = [
  {
    icon: '',
    onClicked: () => { },
    tooltip: 'Open Settings',
  },
  {
    icon: '',
    tooltip: 'Open Settings',
    onClicked: () => App.openWindow('settings-dialog'),
  },
  {
    icon: '',
    tooltip: 'Power Menu',
    onClicked: () => App.toggleWindow('powermenu')
  },
]

const Button = ({ icon, onClicked, tooltip }) => Widget.Button({
  onClicked,
  hpack: 'end',
  tooltipText: tooltip,
  className: 'icon-button',
  child: Widget.Label({ label: icon }),
  setup: setupCursorHover,
})

export default Widget.Box({
  hexpand: true,
  className: 'header',
  children: [
    TabNavigator,
    Widget.Box({ hexpand: true }),
  ].concat(systemButtons.map(Button))
})
