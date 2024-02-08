import { FontIcon } from '../../../../../misc/main.js'
import { setupCursorHover } from '../../../../../misc/CursorHover.js'
import { options, icons } from '../../../../../constants/main.js'

const Row = props => Widget.Box({
  ...props,
  hpack: 'center',
  className: 'toggle-row',
  spacing: options.padding.value,
})

const Button = (icon, label, sub) => Widget.Button({
  className: 'toggle-button',
  setup: setupCursorHover,
  tooltipText: 'Right-click to configure',
  child: Widget.Box({
    vertical: true,
    children: [
      FontIcon({ icon, className: 'toggle-button-icon' }),
      Widget.Label({ label, className: 'title' }),
      Widget.Label({ className: 'sub', label: sub })
    ]
  })
})

export default Widget.Box({
  vertical: true,
  vpack: 'center',
  spacing: options.spacing.value,
  children: [
    Row({
      children: [
        Button('󰖩', 'wifi_name', '121Mbps'),
        Button('󰂲', 'Disabled', ''),
        Button('', 'device_name', ''),
      ]
    }),
    Row({
      children: [
        Button(icons.notifications.bell, 'Notifications', 'On'),
        Button('', 'Themes', 'Yukopi'),
        Button('󰕧', 'Recorder', 'Click to start'),
      ]
    })
  ]
})
