// import Lyrics from './Lyrics'
import Player from './Player'
import PopupRevealer from '../PopupRevealer'

import { getPlayer } from 'lib/utils'
import { showWidget } from 'lib/variables'

const mpris = await Service.import('mpris')
// INFO: https://github.com/raitonoberu/sptlrx/issues/46
// const stack = Widget.Stack({
//   children: {
//     lyrics: Lyrics(),
//     player: Player,
//   }
// })

export default PopupRevealer({
  className: 'media-player',
  reveal: showWidget.player.bind().as((show: boolean) => getPlayer() && show)
}, Player).hook(mpris, () => {
  if (!getPlayer())
    showWidget.player.value = false
})
