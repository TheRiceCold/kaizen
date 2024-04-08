import options from 'options'

export default ({ reveal, ...props }) => Widget.Revealer({
  revealChild: reveal,
  child: Widget.Box({
    ...props,
    classNames: ['popup-revealer', props.className],
  }),
  transition: 'slide_down',
  transitionDuration: options.transition,
})
