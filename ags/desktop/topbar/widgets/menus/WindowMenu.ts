import { type MenuItemProps } from 'types/widgets/menuitem'
import Menu from '../Menu'
import { sh } from 'lib/utils'

const dispatch = (cmd: string) => sh(`hyprctl dispatch ${cmd}`)

const commands: MenuItemProps[] = [
  { label: 'Fullscreen', onActivate: () => dispatch('fullscreen')},
  { label: 'Toggle float', onActivate: () => dispatch('togglefloating') },
  { label: 'Center Layout', onActivate: () => sh('pypr layout_center toggle') },
  { label: 'Center (Float)', onActivate: () => dispatch('centerwindow') },
  { label: 'Pin (Float)', onActivate: () => dispatch('pin') },
  { label: 'Quit', onActivate: () => dispatch('killactive') },
]

export const openWindowMenu = self => Menu(self, commands)
