// import Lyrics from './Lyrics'
import Player from './Player'
import PopupRevealer from '../PopupRevealer'

import { showWidget } from 'lib/variables'
const mpris = await Service.import('mpris')
const getPlayer = () => mpris.getPlayer('spotify') || null

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
}, Player)
