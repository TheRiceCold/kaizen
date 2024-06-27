import BarButton from '../BarButton'

import options from 'options'
import { capitalize } from 'lib/utils'

const { num, substitutes } = options.workspaces
const hyprland = await Service.import('hyprland')
const getId = () => hyprland.active.workspace.id.toString()

const Client = (num: number) => Widget.Label({
  maxWidthChars: 28,
  label: num.toString(),
  justification: 'center',
  className: 'workspace-client',
}).hook(hyprland, self => {
  const { active } = hyprland
  const subs = substitutes.value
  const client = active.client.class
  self.label = (client.length > 0) ?
    getId()+': '+capitalize((client in subs) ? subs[client] : client) : getId()
})

const Workspace = Widget.Stack({
  transition: 'slide_left_right',
  children: num.bind().as(
    (number: number) => Array(number)
      .fill(null)
      .map((_, i) => i+1)
      .reduce((acc, i) => (acc[i] = Client(i), acc), {})
  ),
}).hook(hyprland, self => self.shown = getId())

export default Widget.Box([
  BarButton({
    window: 'overview',
    label: 'Workspace',
    onClicked() { App.toggleWindow('overview') },
  }),
  Workspace
])
