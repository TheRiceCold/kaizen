// import Lyrics from './Lyrics'
import Player from './Player'
import PopupRevealer from '../../PopupRevealer'

import popups from 'service/popups'
const mpris = await Service.import('mpris')
const getPlayer = () => mpris.getPlayer('spotify') || null

// TODO:
// const stack = Widget.Stack({
//   children: {
//     lyrics: Lyrics(),
//     player: Player,
//   }
// })

export default PopupRevealer({
  className: 'media-player',
  reveal: popups.bind('player-shown').as((show: boolean) => getPlayer() && show)
}, Player)
