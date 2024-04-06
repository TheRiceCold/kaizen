import { type BoxProps } from 'types/widgets/box'
import options from 'options'

export default (props: BoxProps) => Widget.Revealer({
  child: Widget.Box({
    ...props,
    classNames: ['popup-revealer', props.className],
  }),
  transition: 'slide_down',
  transitionDuration: options.transition,
})
