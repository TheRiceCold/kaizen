import { Widget, Hyprland, Utils } from '../../../imports.js'
import { options, utils } from '../../../constants/main.js'

export const ClientLabel = Widget.Label({
  binds: [['label', Hyprland.active.client, 'class', c => {
    const { titles } = options.substitutions
    return utils.substitute(titles, c)
  }]],
})

export const ClientIcon = Widget.Icon({
  connections: [[Hyprland.active.client, self => {
    const { icons } = options.substitutions
    const { client } = Hyprland.active

    const classIcon = utils.substitute(icons, client.class) + '-symbolic'
    const titleIcon = utils.substitute(icons, client.class) + '-symbolic'

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
