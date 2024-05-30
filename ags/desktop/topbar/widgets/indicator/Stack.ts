import * as Media from './Media'
import recorder from './Recorder'

import options from 'options'
import { showWidget } from 'lib/variables'

const { player: show } = showWidget

export default Widget.Stack({
  className: 'stack',
  transition: 'slide_up_down',
  transitionDuration: options.transition,
  children: {
    brightness: Widget.Box(),
    microphone: Widget.Box(),
    volume: Widget.Box(),
    recorder,
    ...Media,
  },
}).hook(show, self => self.shown = show ? 'visualizer' : 'playing')
