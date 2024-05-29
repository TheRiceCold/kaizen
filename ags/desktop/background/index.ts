import Annotation from 'service/annotation'

import { sh } from 'lib/utils'
import { toggleWidget } from 'lib/globals'

const Item = (label, onActivate) => Widget.MenuItem({
  onActivate,
  cursor: 'pointer',
  child: Widget.Box([
    Widget.Label({
      label,
      hexpand: true,
    }),
  ]),
})

export default Widget.Window({
  child: Widget.EventBox({
    onSecondaryClick(_, event) {
      return Widget.Menu({
        children: [
          Item('Terminal', () => sh('foot')),
          Item('Browser', () => sh('firefox')),
          Item('Files', () => sh('nautilus')),
          Item('Refresh', () => sh('pkill ags & ags')),
          Item('Dashboard', () => App.openWindow('dashboard')),
          Widget.MenuItem({
            child: Widget.Label('Tools '),
            submenu: Widget.Menu({
              children: [
                Item('Draw', () => Annotation.start()),
                Item('Keyboard', () => toggleWidget('keyboard')),
                Item('Color Wheel', () => toggleWidget('color')),
              ],
            }),
          }),
          Item('Shortcuts', () => App.openWindow('shortcuts')),
          Item('Help', () => {} ), // TODO: Create documentation
        ]
      }).popup_at_pointer(event)
    }
  }),
  popup: false,
  visible: true,
  layer: 'bottom',
  focusable: false,
  name: 'bgoverlay',
  anchor: ['top', 'bottom', 'left', 'right'],
})
