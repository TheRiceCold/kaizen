import { type MenuItemProps } from 'types/widgets/menuitem'
import { type ButtonProps } from 'types/widgets/button'
import Menu from '../../Menu'
import { sh } from 'lib/utils'

const zoom = (val: number | string = '') => sh(`pypr zoom ${val}`)

const commands: MenuItemProps[] = [
  { label: 'Toggle', onActivate: () => zoom() },
  { label: '3x', onActivate: () => zoom(3) } ,
  { label: '4x', onActivate: () => zoom(4) },
  { label: '5x', onActivate: () => zoom(5) },
]

export default (self: ButtonProps) => Menu(self, commands)
