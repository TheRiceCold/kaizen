import { Utils, Widget } from '../../imports.js'
import { PopupWindow } from '../../misc/main.js'
import { uptime } from '../../variables.js'
import { 
  ReloadButton,
  SettingsButton,
  PowerButton,
} from './buttons/main.js'

const Header = Widget.Box({
  className: 'spacing-h-5 sidebar-group-invisible-morehorizpad',
  children: [
    Widget.Label({
      hpack: 'center',
      binds: [['label', uptime, 'value', v => `System uptime: ${v}`]],
    }),
    Widget.Box({ hexpand: true }),
    ReloadButton(),
    SettingsButton(),
    PowerButton(),
  ]
})

const Sidebar = () => Widget.Box({
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
            Header,
            // togglesFlowBox,
            // togglesBox,
          ]
        }),
        // ModuleNotificationList({ vexpand: true, }),
        // ModuleCalendar(),
      ]
    }),
  ]
})

export default () => PopupWindow({
  focusable: true,
  child: Sidebar(),
  name: 'sideright',
  anchor: ['right', 'top', 'bottom'],
})
