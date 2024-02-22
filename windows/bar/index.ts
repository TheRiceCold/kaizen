import widgets from './widgets'
import options from 'options'

export type BarWidget = keyof typeof widget

const { Box, CenterBox, Window } = Widget
const pos = options.bar.position.bind()
const { start, center, end } = options.bar.layout

const bindWidgets = layout => layout.bind().as(i => i.map(w => widgets[w]()))

const content = CenterBox({
  css: 'min-width: 2px; min-height: 2.5rem;',
  startWidget: Box({ hexpand: true, children: bindWidgets(start) }),
  centerWidget: Box({ hpack: 'center', children: bindWidgets(center) }),
  endWidget: Box({ hexpand: true, children: bindWidgets(end) }),
})

export default (monitor: number) => Window({
  child: content,
  className: 'bar',
  name: `bar${monitor}`,
  exclusivity: 'exclusive',
  anchor: pos.as(pos => [pos, 'right', 'left']),
})
