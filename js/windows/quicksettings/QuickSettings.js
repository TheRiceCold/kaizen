import { options } from '../../constants/main.js'
import { setupCursorHover } from '../../misc/CursorHover.js'
import FontIcon from '../../misc/FontIcon.js'
import Header from './header/main.js'

const Row = props => Widget.Box({
  hpack: 'center',
  className: 'toggle-row',
  spacing: options.padding.value,
  ...props,
})

const Button = (icon, label, sub) => Widget.Button({
  className: 'toggle-button',
  setup: setupCursorHover,
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
  className: 'quicksettings',
  children: [ 
    Header, 
    Widget.Box({
      vpack: 'center',
      vertical: true,
      children: [
        Row({
          children: [
            Button('󰖩', 'wifi_name', '121Mbps'),
            Button('󰂲', 'Disabled'),
            Button('', 'default'),
          ]
        }),
        Row({
          children: [
            Button('󰕧', 'Screen Record', 'Click to start'),
            Button('', 'Night Light'),
            Button('', 'Idle Inhibihor'),
          ]
        })
      ]
    })
  ]
})
