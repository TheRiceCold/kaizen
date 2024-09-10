import {
  LogoButton,
  Workspaces,
  AiButton,
  RunButton,
  WindowButton,
  SessionButton,
  SettingsButton,
  Indicator,
  Tray, TraySeparator,
  QuickSettingsButton,
  DateButton,
} from './widgets'
import DropdownMenu from 'desktop/dropdowns/background'

const startWidget = Widget.Box(
  { hpack: 'start', className: 'side-items' },
  LogoButton,
  Widget.Separator({ vertical: true }),
  Workspaces,
  Widget.Separator({ vertical: true }),
  AiButton,
  RunButton,
  WindowButton,
  SettingsButton,
)

const endWidget = Widget.Box(
  { hpack: 'end', className: 'side-items' },
  Tray, TraySeparator,
  QuickSettingsButton,
  Widget.Separator({ vertical: true }),
  DateButton,
  Widget.Separator({ vertical: true }),
  SessionButton
)

const Content = Widget.CenterBox({
  css: 'min-width: 2px; min-height: 2.5rem;',
  startWidget, centerWidget: Indicator, endWidget
})

export default Widget.Window({
  name: 'topbar',
  keymode: 'none',
  className: 'topbar',
  exclusivity: 'exclusive',
  anchor: [ 'top', 'right', 'left' ],
  child: Widget.EventBox({
    child: Content,
    onSecondaryClick(_, event) { DropdownMenu(event) },
  }),
})
