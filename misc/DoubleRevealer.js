import { Widget } from '../imports.js'

export default ({
  transition1 = 'slide_right',
  transition2 = 'slide_left',
  duration1 = 150,
  duration2 = 150,
  child,
  revealChild,
}) => Widget.Revealer({
  transition: transition1,
  transitionDuration: duration1,
  revealChild: revealChild,
  child: Widget.Revealer({
    transition: transition2,
    transitionDuration: duration2,
    revealChild: revealChild,
    child: child,
  })
})
