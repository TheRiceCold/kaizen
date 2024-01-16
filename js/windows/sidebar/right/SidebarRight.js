import { Widget } from '../../../imports.js'
import {
  ToggleIconBluetooth,
  ToggleIconWifi,
  HyprToggleIcon,
  ModuleNightLight,
  ModuleIdleInhibitor,
} from './QuickToggles.js'
import ModuleCalendar from './Calendar.js'

const togglesBox = Widget.Box({
  hpack: 'center',
  className: 'sidebar-togglesbox spacing-h-10',
  children: [
    ToggleIconWifi(),
    ToggleIconBluetooth(),
    HyprToggleIcon('󰍽', 'Raw input', 'input:force_no_accel', {}),
    HyprToggleIcon('󰹆', 'No touchpad while typing', 'input:touchpad:disable_while_typing', {}),
    ModuleNightLight(),
    ModuleIdleInhibitor(),
  ]
})

export default Widget.Box({
  vexpand: true,
  hexpand: true,
  css: 'min-width: 2px;',
  children: [
    Widget.Box({
      vexpand: true,
      vertical: true,
      className: 'sidebar-right spacing-v-15',
      children: [
        togglesBox,
        ModuleCalendar(),
      ]
    }),
  ]
})
