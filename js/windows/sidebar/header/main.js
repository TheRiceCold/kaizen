import { Widget } from '../../../imports.js'

import Weather from './Weather.js'
import LockButton from './LockButton.js'
import PowerButton from './PowerButton.js'
import ReloadButton from './ReloadButton.js'
import SettingsButton from './SettingsButton.js'

import { uptime } from '../../../variables.js'

export default Widget.Box({
  className: 'spacing-h-5 sidebar-group-invisible-morehorizpad',
  children: [
    Widget.Box({
      vertical: true,
      children: [
        Weather,
        Widget.Label({
          hpack: 'center',
          binds: [['label', uptime, 'value', v => `System uptime: ${v}`]],
        }),
      ]
    }),
    Widget.Box({ hexpand: true }),
    ReloadButton,
    SettingsButton,
    LockButton,
    PowerButton,
  ]
})
