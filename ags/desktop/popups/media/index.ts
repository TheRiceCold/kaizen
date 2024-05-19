import Lyrics from './Lyrics'
import Player from './Player'
import PopupRevealer from '../PopupRevealer'

import options from 'options'
import { showWidget } from 'lib/variables'

const mpris = await Service.import('mpris')
const pref = options.popups.player.preferred.value

export default PopupRevealer({
  className: 'media',
  child: Widget.Stack({
    children: {
      player: Player,
      lyrics: Lyrics(),
    }
  }),
  reveal: showWidget.player.bind().as(
    (state: boolean) => state && mpris.getPlayer(pref)
  ),
})
