import * as Media from './Media'
import { showWidget } from 'lib/variables'

const { player: show } = showWidget

export default Widget.Stack({
  className: 'stack',
  transition: 'slide_up_down',
  children: {
    brightness: Widget.Box(),
    microphone: Widget.Box(),
    volume: Widget.Box(),
    ...Media,
  },
}).hook(show, self => self.shown = show ? 'visualizer' : 'playing')
