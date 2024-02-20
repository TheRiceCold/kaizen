import { BatteryBar, Workspaces } from './widgets/exports'
import options from 'options'

export type BarWidget = keyof typeof widget
const widget = {
  battery: BatteryBar,
  // date: Date,
  // launcher: Launcher,
  // media: Media,
  // systray: SysTray,
  // system: SystemIndicators,
  // taskbar: Taskbar,
  workspaces: Workspaces,
  // messages: Messages,
  expander: () => Widget.Box({ expand: true }),
}

const pos = options.bar.position.bind()
const { start, center, end } = options.bar.layout

const startWidget = Widget.Box({ hexpand: true, children: start.bind().as(s => s.map(w => widget[w]())) })
const centerWidget = Widget.Box({ hpack: 'center', children: center.bind().as(c => c.map(w => widget[w]())) })
const endWidget = Widget.Box({ hexpand: true, children: end.bind().as(e => e.map(w => widget[w]())) })

export default Widget.Window({
  name: 'bar',
  className: 'bar',
  exclusivity: 'exclusive',
  anchor: pos.as(pos => [pos, 'right', 'left']),
  child: Widget.CenterBox({
    startWidget, centerWidget, endWidget,
    css: 'min-width: 2px; min-height: 2px;',
  })
})
