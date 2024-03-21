import { type MenuItemProps } from 'types/widgets/menuitem'
import { type ButtonProps } from 'types/widgets/button'
import Menu from '../Menu'
import { sh } from 'lib/utils'

const dispatch = (cmd: string) => sh(`hyprctl dispatch ${cmd}`)

const commands: MenuItemProps[] = [
  { label: 'Fullscreen', onActivate: () => dispatch('fullscreen')},
  {
    label: 'Toggle float',
    onActivate: () => dispatch('togglefloating'),
  },
  { label: 'Toggle Center', onActivate: () => { sh('pypr layout_center toggle')} },
  { label: 'Pin (Floats only)', onActivate: () => { dispatch('pin') } },
  { label: 'Quit', onActivate: () => dispatch('killactive') },
]

export const openWindowMenu = (self: ButtonProps) => Menu(self, commands)
