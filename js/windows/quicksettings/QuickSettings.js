import Header from './header/main.js'
import { FontIcon } from '../../misc/main.js'
import NotificationList from './notification-list/main.js'

import { options, icons } from '../../constants/main.js'
import { setupCursorHover } from '../../misc/CursorHover.js'

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
  spacing: options.padding.value,
  className: 'quicksettings spacing-v-15',
  children: [ 
    Header, 
    Widget.Box({
      vertical: true,
      className: 'content',
      spacing: options.padding.value * 2,
      children: [
        Widget.Box({
          vertical: true,
          vpack: 'center',
          spacing: options.padding.value,
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
                Button(icons.notifications.bell, 'Notifications', ''),
                Button('', 'Themes', 'Yukopi'),
                Button('󰕧', 'Recorder', 'Click to start'),
              ]
            })
          ]
        }),
        NotificationList,
      ]
    })
  ]
})
