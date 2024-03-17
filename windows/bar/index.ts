import widgets from './widgets'
import options from 'options'

export type BarWidget = keyof typeof widget

const pos = options.bar.position.bind()
const { start, end } = options.bar.layout

const bindWidgets = layout => layout.bind().as(i => i.map(w => widgets[w]()))

const Content = Widget.CenterBox({
  css: 'min-width: 2px; min-height: 2.5rem;',
  startWidget: Widget.Box({ hpack: 'start', className: 'side-content', children: bindWidgets(start) }),
  centerWidget: widgets.media(),
  endWidget: Widget.Box({ hpack: 'end', className: 'side-content', children: bindWidgets(end) }),
})

export default (monitor: number) => Widget.Window({
  child: Content,
  className: 'bar',
  name: `bar${monitor}`,
  exclusivity: 'exclusive',
  anchor: pos.as(pos => [pos, 'right', 'left']),
})
