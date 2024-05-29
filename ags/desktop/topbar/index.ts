import {
  Launcher, Workspaces,
  LeftCommands,
  Indicator,
  Tray, Control, Date, Power
} from './widgets'
import { CommandsMenu } from 'desktop/menus'

const Content = Widget.EventBox({
  onSecondaryClick: (_, event) => CommandsMenu(event),
  child: Widget.CenterBox({
    css: 'min-width: 2px; min-height: 2.5rem;',
    startWidget: Widget.Box(
      { hpack: 'start', className: 'side-items' },
      Launcher, Workspaces, LeftCommands
    ),
    centerWidget: Indicator,
    endWidget: Widget.Box(
      { hpack: 'end', className: 'side-items' },
      Tray, Control, Date, Power
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
