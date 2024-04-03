import { type MenuItemProps } from 'types/widgets/menuitem'
import { type ButtonProps } from 'types/widgets/button'
import Menu from '../../Menu'
import { sh } from 'lib/utils'

const commands: MenuItemProps[] = [
  { label: 'File Manager: yazi', onActivate: () => sh(`foot yazi`) },
  { label: 'System Resource: btop', onActivate: () => sh(`foot btop`) },
  { label: 'Last Session: zellij', onActivate: () => sh(`foot zellij a`) },
  { label: 'Containers: podman', onActivate: () => sh(`podman-tui`) },
]

export default (self: ButtonProps) => Menu(self, commands)
