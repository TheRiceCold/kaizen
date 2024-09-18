import { type ButtonProps } from 'types/widgets/button'
import { sh } from 'lib/utils'

const { Gdk } = imports.gi
const dispatch = (cmd: string) => sh(`hyprctl dispatch ${cmd}`)

const Item = ({label, onActivate}) => Widget.MenuItem({
  onActivate,
  cursor: 'pointer',
  child: Widget.Label({ label, hpack: 'center' }),
})

export default (button: ButtonProps) => Widget.Menu({
  children: [
    { label: 'Fullscreen', onActivate() { dispatch('fullscreen') } },
    { label: 'Toggle float', onActivate() { dispatch('togglefloating') } },
    { label: 'Center Layout', onActivate() { sh('pypr layout_center toggle') } },
    { label: 'Center (Float)', onActivate() { dispatch('centerwindow') } },
    { label: 'Pin (Float)', onActivate() { dispatch('pin') } },
    { label: 'Quit', onActivate() { dispatch('killactive') } },
  ].map(Item)
}).popup_at_widget(button, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null)
