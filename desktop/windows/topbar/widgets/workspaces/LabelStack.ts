import { type LabelProps } from 'types/widgets/label'
import { capitalize } from 'lib/utils'
import options from 'options'

export type TWorkspace = {
  label: string
  gerund: string
}

const { workspaces } = options.bar
const hyprland = await Service.import('hyprland')

const getLabel = (isStack: bool = true) => {
  const { active } = hyprland
  const id = active.workspace.id - 1
  const client = active.client.class
  const subs = workspaces.substitutes

  const ws = workspaces.items.value[id]
  const win = client in subs ? subs[client] : capitalize(client)
  const withWindow = client.length > 0 ? `${capitalize(ws.gerund)} ${win}` : capitalize(ws.label)

  return isStack ? ws.label : withWindow
}

const Items = (ws: TWorkspace) => {
  const Label = (workspace: string) => Widget.Label({
    label: workspace,
    maxWidthChars: 28,
    justification: 'center',
    css: `margin-right: ${options.theme.spacing}px;`,
  }).hook(hyprland, (self: LabelProps) => self.label = getLabel(false))

  return ws.reduce((acc, {label}) => (acc[label] = Label(label), acc), {})
}

export default Widget.Stack({
  transition: 'slide_left_right',
  children: workspaces.items.bind().as(Items),
}).hook(hyprland, self => self.shown = getLabel())

