import powermenu, { type Action } from 'service/powermenu'
import BarButton from '../BarButton'

import icons from 'data/icons'
import { sh, capitalize } from 'lib/utils'

const { Gdk } = imports.gi

const Item = (action: Action) => Widget.MenuItem({
  cursor: 'pointer',
  onActivate() {
    if (action === 'lock') sh('kaizen-lock')
    else powermenu.action(action)
  },
  child: Widget.Box([
    Widget.Icon(icons.powermenu[action]),
    Widget.Label({
      hpack: 'center',
      label: (action === 'logout') ? 'Log Out' : capitalize(action),
    }),
  ])
})

export default BarButton({
  label: '',
  onClicked: self => Widget.Menu({
    children: [
      Item('lock'),
      Item('sleep'),
      Item('reboot'),
      Item('logout'),
      Item('shutdown')
    ]
  }).popup_at_widget(self, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null)
})
