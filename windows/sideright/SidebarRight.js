import { Utils, Widget } from '../../imports.js'
import {
  ToggleIconBluetooth,
  ToggleIconWifi,
  HyprToggleIcon,
  ModuleNightLight,
  ModuleInvertColors,
  ModuleIdleInhibitor,
  ModuleReloadIcon,
  ModuleSettingsIcon,
  ModulePowerIcon
} from './QuickToggles.js'
import { ModuleCalendar } from './Calendar.js'
import ModuleNotificationList from './NotificationList.js'

import { uptime } from '../../variables.js'

const timeRow = Widget.Box({
  className: 'spacing-h-5 sidebar-group-invisible-morehorizpad',
  children: [
    // Widget.Label({
    //     className: 'txt-title txt',
    //     connections: [[5000, label => {
    //         label.label = GLib.DateTime.new_now_local().format("%H:%M");
    //     }]],
    // }),
    Widget.Label({
      hpack: 'center',
      binds: [['label', uptime, 'value', v => `System uptime: ${v}`]],
    }),
    Widget.Box({ hexpand: true }),
    // ModuleEditIcon({ hpack: 'end' }), // TODO: Make this work
    ModuleReloadIcon({ hpack: 'end' }),
    ModuleSettingsIcon({ hpack: 'end' }),
    ModulePowerIcon({ hpack: 'end' }),
  ]
})

const togglesBox = Widget.Box({
  hpack: 'center',
  className: 'sidebar-togglesbox spacing-h-10',
  children: [
    ToggleIconWifi(),
    ToggleIconBluetooth(),
    // HyprToggleIcon('mouse', 'Raw input', 'input:force_no_accel', {}),
    // HyprToggleIcon('front_hand', 'No touchpad while typing', 'input:touchpad:disable_while_typing', {}),
    ModuleNightLight(),
    ModuleInvertColors(),
    ModuleIdleInhibitor(),
  ]
})

export default () => Widget.Box({
  vexpand: true,
  hexpand: true,
  css: 'min-width: 2px;',
  children: [
    Widget.Box({
      vertical: true,
      vexpand: true,
      className: 'sidebar-right spacing-v-15',
      children: [
        Widget.Box({
          vertical: true,
          className: 'spacing-v-5',
          children: [
            timeRow,
            // togglesFlowBox,
            togglesBox,
          ]
        }),
        // ModuleNotificationList({ vexpand: true, }),
        // ModuleCalendar(),
      ]
    }),
  ]
})
