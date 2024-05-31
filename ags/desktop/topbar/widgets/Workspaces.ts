import BarButton from '../BarButton'

import options from 'options'
import { sh, capitalize } from 'lib/utils'

const hyprland = await Service.import('hyprland')
const getId = () => hyprland.active.workspace.id.toString()
const dispatch = (arg: string | number) => sh(`hyprctl dispatch workspace ${arg}`)

const Label = (num: number) => Widget.Label({
  maxWidthChars: 28,
  label: num.toString(),
  justification: 'center',
}).hook(hyprland, self => {
  const { active } = hyprland
  const client = active.client.class
  self.label = client.length > 0 ? `${getId()}: ${capitalize(client)} ` : getId()
})

const WorkspaceStack = Widget.Stack({
  transition: 'slide_left_right',
  children: options.workspaces.num.bind().as(
    (number: number) => Array(number)
      .fill(null)
      .map((_, i) => i+1)
      .reduce((acc, num) => (acc[num] = Label(num), acc), {})
  ),
}).hook(hyprland, self => self.shown = getId())

export default Widget.EventBox({
  onScrollUp() { dispatch('m+1') },
  onScrollDown() { dispatch('m-1') },
  child: Widget.Box([
    BarButton({
      window: 'overview',
      label: 'Workspace',
      className: 'workspaces',
      onClicked() { App.toggleWindow('overview') },
    }),
    WorkspaceStack
  ])
})
