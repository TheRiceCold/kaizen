import Gdk from 'gi://Gdk'
import Revealer from './revealer'
import { sh } from 'lib/utils'

const dispatch = (cmd: string) => sh(`hyprctl dispatch ${cmd}`)

const windowRules = [
  { label: 'Float', onActivate: () => dispatch('togglefloating') },
  { label: 'Fullscreen', onActivate: () => dispatch('fullscreen')},
  { label: 'Center', onActivate: () => { sh('pypr layout_center toggle')} },
  { label: 'Pin', onActivate: () => { dispatch('setfloating'); dispatch('pin') } },
  { label: 'Mirror', onActivate: () => {} },
  { label: 'Quit', onActivate: () => dispatch('killactive') },
]

const windowMenu = Widget.Menu({
  children: windowRules.map(({ label, ...props })=> Widget.MenuItem({
    child: Widget.Label(label),
    ...props
  }))
})

const commands = [
  {
    label: 'Window',
    onClicked: self => windowMenu.popup_at_widget(self, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null)
  },
  { label: 'Files', onClicked: () => sh(`nautilus`) },
  { label: 'AI Tools', onClicked: () => App.openWindow('ai-tools') },
  { label: 'Shortcuts', onClicked: () => App.openWindow('shortcuts') },
]

export default () => Revealer('right', commands)
