import { Menu, MenuItemLabel as Item } from 'widgets'
import { sh } from 'lib/utils'

const dispatch = (cmd: string) => sh(`hyprctl dispatch ${cmd}`)

export default widget => Menu(widget, [
  Item(' Fullscreen', () => dispatch('fullscreen')),
  Item('󱂬 Toggle Float', () => dispatch('togglefloating'),),
  Item('  Center Layout', () => sh('pypr layout_center toggle')),
  Item('󰉧 Center (Float)', () => dispatch('centerwindow')),
  Item(' Pin (Float)', () => dispatch('pin')),
  Item(' Quit', () => dispatch('killactive')),
])
