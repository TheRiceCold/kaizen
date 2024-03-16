import Player from './Player'
import options from 'options'

const { bar } = options
const showMedia = Variable(false)
const mpris = await Service.import('mpris')

export default Widget.Revealer({
  child: Player,
  setup: self => self.hook(showMedia, self => self.revealChild = showMedia.value),
  transition: bar.position.bind().as(pos => pos === 'top' ? 'slide_down' : 'slide_up'),
})

const toggleMedia = () => showMedia.value = (!mpris.getPlayer()) ? false : !showMedia.value

// INFO: toggle media by running `ags -r 'toggleMedia()'`
globalThis['toggleMedia'] = toggleMedia
options.media.action.value = toggleMedia
