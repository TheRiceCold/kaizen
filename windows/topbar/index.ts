import widgets from './widgets'
import options from 'options'

export type BarWidget = keyof typeof widget

const { start, end } = options.bar.layout

const startWidget = Widget.Box({
  hpack: 'start',
  className: 'side-items',
  children: start.bind().as(items => [
    ...items.map(item => widgets[item]()),
    widgets.leftCommands()
  ])
})

const endWidget = Widget.Box({
  hpack: 'end',
  className: 'side-items',
  children: end.bind().as(items => [
    widgets.rightCommands(),
    ...items.map(item => widgets[item]()),
  ])
})

const Content = Widget.CenterBox({
  startWidget, 
  centerWidget: widgets.middle(), 
  endWidget,
  css: 'min-width: 2px; min-height: 2.5rem;',
})

export default (monitor: number) => Widget.Window({
  child: Content,
  className: 'bar',
  name: `bar${monitor}`,
  exclusivity: 'exclusive',
  anchor: [ 'top', 'right', 'left' ],
})

/* NOTE: Maybe add an auto-hide(revealer) option? */
