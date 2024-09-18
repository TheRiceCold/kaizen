import Client from './Client'
import BarButton from '../../BarButton'

import options from 'options'

const hyprland = await Service.import('hyprland')

const Workspace = Widget.Stack({
  transition: 'slide_left_right',
  children: options.workspaces.num.bind().as(
    (num: number) => Array(num)
      .fill(null).map((_, i) => i+1)
      .reduce((acc, i) => (acc[i] = Client(i), acc), {})
  ),
  shown: hyprland.active.workspace.bind('id').as((id: number) => id.toString())
})

export default Widget.Box(
  { className: 'workspaces' },
  BarButton({
    window: 'overview', label: 'Workspace',
    onClicked() { App.toggleWindow('overview') },
  }), Workspace
)

