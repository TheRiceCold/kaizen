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
  connections: [[
    active.client, self => {
      const icon = substitute(icons, active.client.class) + '-symbolic'
      self.visible = !!Utils.lookUpIcon(icon)
      self.icon = icon
    }
  ]],
})

export default Widget.Box({
  className: 'focused-client',
  children: [ ClientIcon, ClientLabel ],
  binds: [[
    'tooltip-text', active, 
    'client', c => c.title
  ]],
})
