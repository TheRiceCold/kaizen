import options from 'options'

export default ({
  transition = 'slide_down',
  className = '',
  reveal = false,
  ...props
}, ...children) => Widget.Revealer({
  revealChild: reveal,
  transition,
  transitionDuration: options.transition,
}, Widget.Box({
  ...props,
  classNames: ['popup-revealer', className],
}, ...children))
