import { playing, visualizer } from './Media'
import { showWidget } from 'lib/variables'

const { player: show } = showWidget

export default Widget.Stack({
  className: 'stack',
  transition: 'slide_up_down',
  children: {
    playing,
    visualizer,
  }
}).hook(show, self => self.shown = show ? 'visualizer' : 'playing')
