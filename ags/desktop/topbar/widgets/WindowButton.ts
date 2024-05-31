import BarButton from '../BarButton'

import { sh } from 'lib/utils'

const { Gdk } = imports.gi
const hyprland = await Service.import('hyprland')
const dispatch = (cmd: string) => sh(`hyprctl dispatch ${cmd}`)

const Item = ({ label, onActivate }) => Widget.MenuItem({
  onActivate,
  cursor: 'pointer',
  child: Widget.Label({ label, hpack: 'center' }),
})

const openMenu = button => Widget.Menu({
  children: [
    { label: 'Fullscreen', onActivate() { dispatch('fullscreen') } },
    { label: 'Toggle float', onActivate() { dispatch('togglefloating') } },
    { label: 'Center Layout', onActivate() { sh('pypr layout_center toggle') } },
    { label: 'Center (Float)', onActivate() { dispatch('centerwindow') } },
    { label: 'Pin (Float)', onActivate() { dispatch('pin') } },
    { label: 'Quit', onActivate() { dispatch('killactive') } },
  ].map(Item)
}).popup_at_widget(button, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null)

export default BarButton({
  label: 'Window',
  onClicked: openMenu,
  visible: hyprland.active.bind('client').as(({ title, class: c }) => !!title && !!c)
})
