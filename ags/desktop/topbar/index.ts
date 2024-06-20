import {
  LauncherButton,
  Workspaces,
  AiButton,
  DashboardButton,
  RunButton,
  KeysButton,
  WindowButton,
  Indicator,
  Tray,
  ControlButton,
  DateButton,
} from './widgets'
import { CommandsMenu } from 'desktop/menus'

const startWidget = Widget.Box(
  { hpack: 'start', className: 'side-items' },
  LauncherButton,
  Workspaces,
  Widget.Separator({ vertical: true }),
  AiButton,
  RunButton,
  DashboardButton,
  KeysButton,
  WindowButton,
)

const Content = Widget.CenterBox({
  css: 'min-width: 2px; min-height: 2.5rem;',
  startWidget,
  centerWidget: Widget.Box([
    Widget.Separator({ vertical: true }),
    Indicator,
    Widget.Separator({ vertical: true }),
  ]),
  endWidget: Widget.Box(
    { hpack: 'end', className: 'side-items' },
    Tray,
    Widget.Separator({ vertical: true }),
    ControlButton,
    Widget.Separator({ vertical: true }),
    DateButton,
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
