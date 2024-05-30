import { capitalize } from 'lib/utils'
import options from 'options'

const hyprland = await Service.import('hyprland')

const getId = () => hyprland.active.workspace.id.toString()

const Label = (num: number) => Widget.Label({
  maxWidthChars: 28,
  label: num.toString(),
  justification: 'center',
}).hook(hyprland, self => {
  const { active } = hyprland
  const client = active.client.class
  self.label = client.length > 0 ? `${getId()}: ${capitalize(client)} ` : getId()
})

export default Widget.Stack({
  transition: 'slide_left_right',
  children: options.workspaces.num.bind().as(
    (number: number) => Array(number)
      .fill(null)
      .map((_, i) => i+1)
      .reduce((acc, num) => (acc[num] = Label(num), acc), {})
  ),
}).hook(hyprland, self => self.shown = getId())
