import * as Media from './Media'
import { showWidget } from 'lib/variables'

const { player: show } = showWidget

export default Widget.Stack({
  className: 'stack',
  transition: 'slide_up_down',
  children: {
    brightness: Widget.Box({ hpack: 'center' }),
    microphone: Widget.Box({ hpack: 'center' }),
    volume: Widget.Box({ hpack: 'center' }),
    ...Media,
  },
}).hook(show, self => self.shown = show ? 'visualizer' : 'playing')
