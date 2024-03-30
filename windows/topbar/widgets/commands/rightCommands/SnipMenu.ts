import { type MenuItemProps } from 'types/widgets/menuitem'
import { type ButtonProps } from 'types/widgets/button'
import Menu from '../Menu'
// import { sh } from 'lib/utils'

const commands: MenuItemProps[] = [
  { label: 'Fullscreen', onActivate: () => { } },
  { label: 'Region', onActivate: () => { } },
  { label: 'Open Files', onActivate: () => { } },
]

export const openRecordMenu = (self: ButtonProps) => Menu(self, commands)
