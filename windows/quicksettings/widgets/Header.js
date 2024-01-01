import { Widget, Battery } from '../../../imports.js'
import PowerMenu from '../../../services/powermenu.js'
import { Avatar } from '../../../misc/main.js'

import icons from '../../../icons.js'
import { uptime } from '../../../variables.js'

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
            Widget.Icon({ binds: [['icon', Battery, 'icon-name']] }),
            Widget.Label({ binds: [['label', Battery, 'percent', p => `${p}%`]] }),
          ],
        }),
        Widget.Label({
          className: 'uptime',
          binds: [['label', uptime, 'value', v => `up: ${v}`]],
        }),
        Widget.Button({
          onClicked: () => PowerMenu.action('shutdown'),
          child: Widget.Icon(icons.powermenu.shutdown),
        }),
      ],
    }),
  ],
})
