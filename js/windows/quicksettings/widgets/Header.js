import { Widget, Battery } from '../../../imports.js'
import { PowerMenu } from '../../../services/main.js'
import { Avatar, FontIcon } from '../../../misc/main.js'
import { icons, variables } from '../../../constants/main.js'

export default () => Widget.Box({
  className: 'header horizontal',
  children: [
    Avatar(),
    Widget.Box({
      hpack: 'end',
      vpack: 'center',
      hexpand: true,
      children: [
        Widget.Box({
          className: 'battery horizontal',
          children: [
            FontIcon({ binds: [['icon', Battery, 'icon-name']] }),
            Widget.Label({ binds: [['label', Battery, 'percent', p => `${p}%`]] }),
          ],
        }),
        Widget.Label({
          className: 'uptime',
          binds: [['label', variables.uptime, 'value', v => `up: ${v}`]],
        }),
        Widget.Button({
          onClicked: () => PowerMenu.action('shutdown'),
          child: FontIcon(icons.powermenu.shutdown),
        }),
      ],
    }),
  ],
})
