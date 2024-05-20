// import Lyrics from './Lyrics'
import Player from './Player'
import PopupRevealer from '../PopupRevealer'

import options from 'options'
import { showWidget } from 'lib/variables'

const mpris = await Service.import('mpris')
const pref = options.popups.player.preferred.value

// INFO: https://github.com/raitonoberu/sptlrx/issues/46
// const stack = Widget.Stack({
//   children: {
//     lyrics: Lyrics(),
//     player: Player,
//   }
// })

export default PopupRevealer({
  child: Player,
  className: 'media-player',
  reveal: showWidget.player.bind().as(
    (state: boolean) => state && mpris.getPlayer(pref)
  ),
})
