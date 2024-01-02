import { Widget } from '../../imports.js'
import { PopupWindow } from '../../misc/main.js'
import {
  WifiToggle,
  PowerButton,
  ReloadButton,
  SettingsButton,
  BluetoothToggle,
  NightLightToggle,
  IdleInhibitorToggle,
  LockButton,
} from './buttons/main.js'
// import Weather from './Weather.js'
import QuickSettings from './QuickSettings.js'

import { uptime } from '../../variables.js'

const ToggleButtons = Widget.Box({
  hpack: 'center',
  className: 'sidebar-togglesbox spacing-h-10',
  children: [
    WifiToggle,
    BluetoothToggle,
    NightLightToggle,
    IdleInhibitorToggle,
    // ModuleInvertColors(),
    // HyprToggleIcon('mouse', 'Raw input', 'input:force_no_accel', {}),
    // HyprToggleIcon('front_hand', 'No touchpad while typing', 'input:touchpad:disable_while_typing', {}),
  ]
})

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
          children: [
            Header,
            ToggleButtons,
            QuickSettings, 
          ]
        }),
        // ModuleNotificationList({ vexpand: true, }),
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
