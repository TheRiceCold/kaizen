import { type MprisPlayer } from 'types/service/mpris'

import Player from './Player'
import PopupRevealer from '../PopupRevealer'

import { showWidget } from 'lib/variables'

const mpris = await Service.import('mpris')

const players = mpris.bind('players')
const state = showWidget.popup.media

const isRealPlayer = (player: MprisPlayer) => (
  !player.busName.startsWith('org.mpris.MediaPlayer2.firefox') && // Firefox mpris dbus is useless
  !player.busName.startsWith('org.mpris.MediaPlayer2.playerctld') && // Doesn't have cover art
  !player.busName.endsWith('.mpd') // Non-instance mpd bus
)

export default PopupRevealer({
  className: 'media',
  reveal: state.bind(),
  children: players.as((p: MprisPlayer[]) => p.map((player: MprisPlayer) => isRealPlayer(player) ? Player(player) : null)),
})
