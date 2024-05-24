import options from 'options'

export default ({
  transition = 'slide_down',
  className = '',
  reveal = false,
  ...props
}) => Widget.Revealer({
  revealChild: reveal,
  transition,
  transitionDuration: options.transition,
  child: Widget.Box({
    ...props,
    classNames: ['popup-revealer', className],
  }),
})
