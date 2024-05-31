import BarButton from '../BarButton'

import { sh } from 'lib/utils'

const { Gdk } = imports.gi

const Item = ({ label, onActivate }) => Widget.MenuItem({
  onActivate,
  cursor: 'pointer',
  child: Widget.Label({ label, hpack: 'center' }),
})

const openMenu = button => Widget.Menu({
  children: [
    { label: ' Files', onActivate() { sh('nautilus') } },
    { label: '󰖟 Browser', onActivate() { sh('firefox') } },
    { label: ' Terminal', onActivate() { sh('pypr toggle term') } },
    { label: ' Windows 11', onActivate() { } },
  ].map(Item)
}).popup_at_widget(button, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null)

export default BarButton({ label: 'Run', onClicked: openMenu })
