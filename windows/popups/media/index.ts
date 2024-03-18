import Player from './Player'
import options from 'options'

const { bar: { position }, transition } = options
const showMedia = Variable(false)
const mpris = await Service.import('mpris')

const toggleMedia = () => showMedia.value = (!mpris.getPlayer()) ? false : !showMedia.value

// INFO: toggle media by running `ags -r 'toggleMedia()'`
globalThis['toggleMedia'] = toggleMedia
options.media.action.value = toggleMedia

export default Widget.Revealer({
  child: Player,
  transitionDuration: transition.value,
  setup: self => self.hook(showMedia, self => self.revealChild = showMedia.value),
  transition: position.bind().as(pos => pos === 'top' ? 'slide_down' : 'slide_up'),
})
