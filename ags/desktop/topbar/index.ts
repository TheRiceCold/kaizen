import {
  LauncherButton,
  WorkspaceButton,
  AiButton,
  RunButton,
  WindowButton,
  HelpButton,
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
  WorkspaceButton,
  Widget.Separator({ vertical: true }),
  AiButton,
  RunButton,
  WindowButton,
  HelpButton
)

const Content = Widget.EventBox({
  onSecondaryClick: (_, event) => CommandsMenu(event),
  child: Widget.CenterBox({
    css: 'min-width: 2px; min-height: 2.5rem;',
    startWidget,
    centerWidget: Indicator,
    endWidget: Widget.Box(
      { hpack: 'end', className: 'side-items' },
      Tray,
      ControlButton,
      DateButton,
      PowerButton,
    )
  })
})

export default Widget.Window({
  name: 'topbar',
  child: Content,
  className: 'topbar',
  exclusivity: 'exclusive',
  anchor: [ 'top', 'right', 'left' ],
})
