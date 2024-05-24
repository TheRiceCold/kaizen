import {
  Launcher, Workspaces,
  LeftCommands,
  Indicator,
  RightCommands,
  Tray, Control, Date, Power
} from './widgets'

const Content = Widget.CenterBox({
  css: 'min-width: 2px; min-height: 2.5rem;',
  startWidget: Widget.Box(
    { hpack: 'start', className: 'side-items' },
    Launcher, Workspaces, LeftCommands
  ),
  centerWidget: Indicator,
  endWidget: Widget.Box(
    { hpack: 'end', className: 'side-items' },
    RightCommands, Tray, Control, Date, Power
  )
})

export default Widget.Window({
  child: Content,
  name: 'topbar',
  className: 'topbar',
  exclusivity: 'exclusive',
  anchor: [ 'top', 'right', 'left' ],
})
