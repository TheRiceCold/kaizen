import { type StackProps } from 'types/widgets/stack'

import Client from './Client'
import BarButton from '../../BarButton'
import LayoutMenu from 'desktop/dropdowns/layouts'

import options from 'options'
import { capitalize } from 'lib/utils'

const numOfWorkspaces = options.workspaces.num
const hyprland = await Service.import('hyprland')

const Workspace = Widget.Stack({
  transition: 'slide_left_right',
  shown: hyprland.active.workspace.bind('id').as((id: number) => id.toString()),
}).hook(numOfWorkspaces, (self: StackProps) => {
  self.children = Array(numOfWorkspaces.value)
    .fill(null)
    .map((_, i) => i + 1)
    .reduce((acc, i) => ((acc[i] = Client(i)), acc), {})
})

export default Widget.Box(
  { className: 'workspaces' },
  BarButton({
    onClicked: LayoutMenu,
    label: options.hyprland.layout.bind().as((layout: string) => `${capitalize(layout)}:`),
  }),
  BarButton({
    window: 'overview',
    label: 'Workspace',
    onClicked() {
      App.toggleWindow('overview')
    },
  }),
  Workspace,
)
