import { type MenuItemProps } from 'types/widgets/menuitem'
import Menu from '../../Menu'
import { sh } from 'lib/utils'

const commands: MenuItemProps[] = [
  { label: 'Fullscreen', onActivate: () => sh(`wl-screenrec --audio -f /home/${Utils.USER}/Videos/screenrec.mp4`) },
  { label: 'Region', onActivate: () => { } },
  { label: 'Voice', onActivate: () => { } },
  { label: 'Open Files', onActivate: () => { } },
]

export default self => Menu(self, commands)
