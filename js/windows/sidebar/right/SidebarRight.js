import { Utils, Widget } from '../../../imports.js'
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
import ModuleCalendar from './Calendar.js'
import ModuleNotificationList from './NotificationList.js'

const timeRow = Widget.Box({
  className: 'spacing-h-5 sidebar-group-invisible-morehorizpad',
  children: [
    Widget.Label({
      hpack: 'center',
      className: 'txt-small txt',
      connections: [[5000, label => {
        Utils.execAsync(['bash', '-c', `uptime -p | sed -e 's/up //;s/ hours,/h/;s/ minutes/m/'`]).then(upTimeString => {
          label.label = `System uptime: ${upTimeString}`
        }).catch(print)
      }]],
    }),
    Widget.Box({ hexpand: true }),
    ModuleReloadIcon({ hpack: 'end' }),
    ModuleSettingsIcon({ hpack: 'end' }),
    ModulePowerIcon({ hpack: 'end' }),
  ]
});

const togglesBox = Widget.Box({
  hpack: 'center',
  className: 'sidebar-togglesbox spacing-h-10',
  children: [
    ToggleIconWifi(),
    ToggleIconBluetooth(),
    HyprToggleIcon('󰍽', 'Raw input', 'input:force_no_accel', {}),
    HyprToggleIcon('󰹆', 'No touchpad while typing', 'input:touchpad:disable_while_typing', {}),
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
    Widget.EventBox({
      onPrimaryClick: () => App.closeWindow('sideright'),
      onSecondaryClick: () => App.closeWindow('sideright'),
      onMiddleClick: () => App.closeWindow('sideright'),
    }),
    Widget.Box({
      vertical: true,
      vexpand: true,
      className: 'sidebar-right spacing-v-15',
      children: [
        Widget.Box({
          vertical: true,
          className: 'spacing-v-5',
          children: [timeRow, togglesBox]
        }),
        ModuleNotificationList({ vexpand: true, }),
        ModuleCalendar(),
      ]
    }),
  ]
})
