import { 
  Launcher, Workspaces, LeftCommands,
  Middle,
  RightCommands, Tray, Control, Date, Power
} from './widgets'

const Content = Widget.CenterBox({
  css: 'min-width: 2px; min-height: 2.5rem;',
  startWidget: Widget.Box({ hpack: 'start', className: 'side-items' }, Launcher, Workspaces, LeftCommands),
  centerWidget: Middle, 
  endWidget: Widget.Box({ hpack: 'end', className: 'side-items' }, RightCommands, Tray, Control, Date, Power)
})

/* NOTE: Maybe add an auto-hide(revealer) option? */
export default (monitor: number) => Widget.Window({
  child: Content,
  className: 'bar',
  name: `bar${monitor}`,
  exclusivity: 'exclusive',
  anchor: [ 'top', 'right', 'left' ],
})
