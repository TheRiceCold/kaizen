import { type MenuItemProps } from 'types/widgets/menuitem'
import { type ButtonProps } from 'types/widgets/button'
import Menu from '../Menu'
import { sh } from 'lib/utils'

const dispatch = (cmd: string) => sh(`hyprctl dispatch ${cmd}`)

const commands: MenuItemProps[] = [
  { label: 'Fullscreen', onActivate: () => dispatch('fullscreen')},
  { label: 'Center', onActivate: () => { sh('pypr layout_center toggle')} },
  { label: 'Float', onActivate: () => dispatch('togglefloating') },
  { label: 'Pin', onActivate: () => { dispatch('setfloating'); dispatch('pin') } },
  { label: 'Quit', onActivate: () => dispatch('killactive') },
]

export const openWindowMenu = (self: ButtonProps) => Menu(self, commands)
