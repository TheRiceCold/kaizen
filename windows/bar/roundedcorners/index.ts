import options from 'options'

const { corners } = options.bar

export default (monitor: number) => Widget.Window({
  monitor,
  clickThrough: true,
  name: `corner${monitor}`,
  className: 'screen-corner',
  anchor: ['top', 'bottom', 'right', 'left'],
  child: Widget.Box({
    className: 'shadow',
    child: Widget.Box({
      expand: true,
      className: 'border',
      child: Widget.Box({ className: 'corner', expand: true }),
    }),
  }),
  setup: self => self.hook(corners, () => self.toggleClassName('corners', corners.value)),
})
