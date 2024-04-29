import { type MenuItemProps } from 'types/widgets/menuitem'
import Menu from '../../Menu'
import { sh } from 'lib/utils'

const dispatch = (cmd: string) => sh(`hyprctl dispatch ${cmd}`)

const commands: MenuItemProps[] = [
  { label: 'Fullscreen', onActivate: () => dispatch('fullscreen')},
  { label: 'Toggle float', onActivate: () => dispatch('togglefloating') },
  { label: 'Center Layout', onActivate: () => sh('pypr layout_center toggle') },
  { label: 'Quit', onActivate: () => dispatch('killactive') },
  { label: 'Floats Only' },
  { label: 'Pin', onActivate: () => dispatch('pin') },
  { label: 'Center', onActivate: () => dispatch('centerwindow') },
]

export const openWindowMenu = self => Menu(self, commands)
