import { Widget, Hyprland, Utils } from '../../../imports.js'
import { options, utils } from '../../../constants/main.js'

const { active } = Hyprland
const { substitute } = utils
const { icons, titles } = options.substitutions

const ClientLabel = Widget.Label({
  binds: [[
    'label', active.client, 
    'class', c => substitute(titles, c) 
  ]],
})

const ClientIcon = Widget.Icon({
  setup: self => self.hook(Hyprland.active.client, self => {
    const classIcon = substitute(icons, active.client.class) + '-symbolic'
    const titleIcon = substitute(icons, active.client.class) + '-symbolic'

    const hasTitleIcon = Utils.lookUpIcon(titleIcon)
    const hasClassIcon = Utils.lookUpIcon(classIcon)

    if (hasClassIcon)
      self.icon = classIcon

    if (hasTitleIcon)
      self.icon = titleIcon

    self.visible = !!(hasTitleIcon || hasClassIcon)
  }),
})

export default Widget.Box({
  className: 'focused-client',
  children: [ ClientIcon, ClientLabel ],
  binds: [[
    'tooltip-text', active, 
    'client', c => c.title
  ]],
})
