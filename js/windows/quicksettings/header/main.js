import { Widget } from '../../../imports.js'
import {
  ModulePowerIcon,
  ModuleReloadIcon,
  ModuleSettingsIcon,
} from '../../sidebar/right/QuickToggles.js'

import { variables } from '../../../constants/main.js'

export default Widget.Box({
  className: 'spacing-h-5 sidebar-group-invisible-morehorizpad',
  children: [
    Widget.Label({
      hpack: 'center',
      className: 'txt-small txt',
      binds: [[
        'label', variables.uptime, 
        'value', v => `System uptime: ${v}`
      ]],
    }),
    Widget.Box({ hexpand: true }),
    ModuleReloadIcon({ hpack: 'end' }),
    ModuleSettingsIcon({ hpack: 'end' }),
    ModulePowerIcon({ hpack: 'end' }),
  ]
})
