import { Widget } from '../../imports.js'
import { PopupWindow } from '../../misc/main.js'
import {
  LockButton,
  PowerButton,
  ReloadButton,
  SettingsButton,
} from './buttons/main.js'
// import Weather from './Weather.js'
import TabSettings from './TabSettings.js'

import { uptime } from '../../variables.js'

const Header = Widget.Box({
  className: 'spacing-h-5 sidebar-group-invisible-morehorizpad',
  children: [
    // Weather,
    Widget.Label({
      hpack: 'center',
      binds: [['label', uptime, 'value', v => `System uptime: ${v}`]],
    }),
    Widget.Box({ hexpand: true }),
    ReloadButton,
    SettingsButton,
    LockButton,
    PowerButton,
  ]
})

const Sidebar = Widget.Box({
  vexpand: true,
  hexpand: true,
  children: [
    Widget.Box({
      vexpand: true,
      vertical: true,
      className: 'sidebar-right',
      children: [
        Widget.Box({
          vertical: true,
          children: [ Header, TabSettings() ]
        }),
        // ModuleCalendar(),
      ]
    }),
  ]
})

export default PopupWindow({
  child: Sidebar,
  focusable: true,
  name: 'sideright',
  anchor: ['right', 'top', 'bottom'],
})
