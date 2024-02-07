import Header from './header/main.js'
import { FontIcon } from '../../misc/main.js'
import NotificationList from './NotificationList.js'

import { options } from '../../constants/main.js'
import { setupCursorHover } from '../../misc/CursorHover.js'

const Row = props => Widget.Box({
  hpack: 'center',
  className: 'toggle-row',
  spacing: options.padding.value,
  ...props,
})

const Button = (icon, label, sub) => Widget.Button({
  className: 'toggle-button',
  setup: setupCursorHover,
  tooltipText: 'Right-click to configure',
  child: Widget.Box({
    vertical: true,
    children: [
      FontIcon({ 
        icon: icon,
        className: 'toggle-button-icon',
      }),
      Widget.Label({
        className: 'title',
        label
      }),
      Widget.Label({ className: 'sub', label: sub })
    ]
  })
})

export default Widget.Box({
  vertical: true,
  className: 'quicksettings spacing-v-15',
  children: [ 
    Header, 
    Widget.Box({
      vpack: 'center',
      vertical: true,
      children: [
        Row({
          children: [
            Button('󰖩', 'wifi_name', '121Mbps'),
            Button('󰂲', 'Disabled', ''),
            Button('', 'Enabled', 'device_name'),
          ]
        }),
        Row({
          children: [
            Button('󰕧', 'Screen Record', 'Click to start'),
            Button('󰌁', 'Dark Mode', 'Off'),
            Button('', 'Coffee', 'Do not disturb'),
          ]
        })
      ]
    }),
    NotificationList,
  ]
})
