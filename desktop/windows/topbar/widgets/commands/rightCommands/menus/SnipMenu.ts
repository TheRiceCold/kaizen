import { type MenuItemProps } from 'types/widgets/menuitem'
import Menu from '../../Menu'
import screenTools from 'service/screen'

const commands: MenuItemProps[] = [
  { label: 'Fullscreen', onActivate: () => screenTools.snip(true) },
  { label: 'Region', onActivate: () => screenTools.snip(false) },
]

export default self => Menu(self, commands)
