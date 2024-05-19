import options from 'options'

export default ({ reveal, className = '', ...props }) => Widget.Revealer({
  revealChild: reveal,
  child: Widget.Box({
    ...props,
    classNames: ['popup-revealer', className],
  }),
  transition: 'slide_down',
  transitionDuration: options.transition,
})
