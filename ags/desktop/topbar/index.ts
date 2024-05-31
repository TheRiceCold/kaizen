import {
  LauncherButton,
  Workspaces,
  AiButton,
  DashboardButton,
  RunButton,
  WindowButton,
  Indicator,
  Tray,
  ControlButton,
  DateButton,
  PowerButton,
} from './widgets'
import { CommandsMenu } from 'desktop/menus'

const startWidget = Widget.Box(
  { hpack: 'start', className: 'side-items' },
  LauncherButton,
  Workspaces,
  Widget.Separator({ vertical: true }),
  AiButton,
  DashboardButton,
  WindowButton,
  RunButton,
)

const Content = Widget.CenterBox({
  css: 'min-width: 2px; min-height: 2.5rem;',
  startWidget,
  centerWidget: Indicator,
  endWidget: Widget.Box(
    { hpack: 'end', className: 'side-items' },
    Tray, ControlButton, DateButton, PowerButton,
  )
})

export default Widget.Window({
  name: 'topbar',
  className: 'topbar',
  exclusivity: 'exclusive',
  anchor: [ 'top', 'right', 'left' ],
  child: Widget.EventBox({
    child: Content,
    onSecondaryClick(_, event) { CommandsMenu(event) },
  }),
})
