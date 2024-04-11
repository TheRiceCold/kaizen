import { type MenuItemProps } from 'types/widgets/menuitem'
import Menu from '../../Menu'

const commands: MenuItemProps[] = [
  { label: 'Fullscreen', onActivate: () => { } },
  { label: 'Region', onActivate: () => { } },
  { label: 'Voice', onActivate: () => { } },
  { label: 'Open Files', onActivate: () => { } },
]

export default self => Menu(self, commands)
