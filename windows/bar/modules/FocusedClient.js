import { Widget, Hyprland, Utils } from '../../../imports.js'
import { substitute } from '../../../utils.js'
import options from '../../../options.js'

export const ClientLabel = Widget.Label({
  binds: [['label', Hyprland.active.client, 'class', c => {
    const { titles } = options.substitutions
    return substitute(titles, c)
  }]],
})

export const ClientIcon = Widget.Icon({
  connections: [[Hyprland.active.client, self => {
    const { icons } = options.substitutions
    const { client } = Hyprland.active

    const classIcon = substitute(icons, client.class) + '-symbolic'
    const titleIcon = substitute(icons, client.class) + '-symbolic'

    const hasTitleIcon = Utils.lookUpIcon(titleIcon)
    const hasClassIcon = Utils.lookUpIcon(classIcon)

    if (hasClassIcon)
      self.icon = classIcon

    if (hasTitleIcon)
      self.icon = titleIcon

    self.visible = !!(hasTitleIcon || hasClassIcon)
  }]],
})

export default Widget.Box({
  className: 'focused-client',
  children: [ClientIcon, ClientLabel],
  binds: [['tooltip-text', Hyprland.active, 'client', c => c.title]],
})
