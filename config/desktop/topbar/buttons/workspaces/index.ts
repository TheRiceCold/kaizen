import { type StackProps } from 'types/widgets/stack'

import Client from './Client'
import BarButton from '../../BarButton'

import options from 'options'

const numOfWorkspaces = options.workspaces.num
const hyprland = await Service.import('hyprland')

const Workspace = Widget.Stack({
  transition: 'slide_left_right',
  shown: hyprland.active.workspace.bind('id').as((id: number) => id.toString())
}).hook(numOfWorkspaces, (self: StackProps) => {
  self.children = Array(numOfWorkspaces.value)
    .fill(null).map((_, i) => i + 1)
    .reduce((acc, i) => (acc[i] = Client(i), acc), {})
})

export default Widget.Box(
  { className: 'workspaces' },
  BarButton({
    window: 'overview', label: 'Workspace',
    onClicked() { App.toggleWindow('overview') },
  }), Workspace
)

