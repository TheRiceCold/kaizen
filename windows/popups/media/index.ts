import Player from './Player'
import options from 'options'
import { showMedia } from 'lib/variables'

const { bar } = options

export default Widget.Revealer({
  child: Player,
  setup: self => self.hook(showMedia, self => self.revealChild = showMedia.value),
  transition: bar.position.bind().as(pos => pos === 'top' ? 'slide_down' : 'slide_up'),
})
