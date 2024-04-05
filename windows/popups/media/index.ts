import { type Props as RevealerProps } from 'types/widgets/label'

import Player from './Player'
import options from 'options'
import { showWidget } from 'lib/variables'

const { transition } = options
const mpris = await Service.import('mpris')

const { media: shown } = showWidget.popup

const toggleMedia = () => shown.value = (!mpris.getPlayer()) ? false : !shown.value

// INFO: toggle media by running `ags -r 'toggleMedia()'`
globalThis['toggleMedia'] = toggleMedia
options.media.action.value = toggleMedia

export default Widget.Revealer({
  child: Player,
  transition: 'slide_down',
  transitionDuration: transition.value,
}).hook(shown, (self: RevealerProps) => self.revealChild = shown.value)
