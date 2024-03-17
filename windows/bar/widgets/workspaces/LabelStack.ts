import options from 'options'
import { capitalize } from 'lib/utils'

const { workspaces } = options.bar
const hyprland = await Service.import('hyprland')

const getLabel = (isStack: bool) => {
  const items = workspaces.items.value
  const id = hyprland.active.workspace.id - 1
  const client = hyprland.active.client.class
  const window = client.length > 0 ? '  '+capitalize(client) : ''
  return isStack ? items[id] : capitalize(items[id]) + window
}

const Items = (ws: string[]) => {
  ws.push(workspaces.fallback)
  const Label = (workspace: string) => Widget.Label({
    label: workspace,
    maxWidthChars: 28,
    justification: 'center',
    css: `margin-right: ${options.theme.spacing};`,
    setup: self => self.hook(hyprland, () => self.label = getLabel())
  })

  return ws.reduce((acc, label) => (acc[label] = Label(label), acc), {})
}

export default Widget.Stack({
  transition: 'slide_left_right',
  children: workspaces.items.bind().as(Items),
  setup: self => self.hook(hyprland, () => self.shown = getLabel(true))
})
