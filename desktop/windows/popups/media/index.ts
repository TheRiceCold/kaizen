import { type MprisPlayer } from 'types/service/mpris'

import Lyrics from './Lyrics'
import Player from './Player'
import PopupRevealer from '../PopupRevealer'

import options from 'options'
import { showWidget } from 'lib/variables'

const mpris = await Service.import('mpris')

const players = mpris.bind('players')

const { media } = options.popups
const pref = media.preferred.value
const getPlayer = () => mpris.getPlayer(pref) || mpris.players[0] || null

const isRealPlayer = (player: MprisPlayer) => (
  !player.busName.startsWith('org.mpris.MediaPlayer2.firefox') && // Firefox mpris dbus is useless
  !player.busName.startsWith('org.mpris.MediaPlayer2.playerctld') && // Doesn't have cover art
  !player.busName.endsWith('.mpd') // Non-instance mpd bus
)

const Stack = Widget.Stack({
  children: {
    player: Player(getPlayer()),
    lyrics: Lyrics,
  }
})

export default PopupRevealer({
  child: Stack,
  className: 'media',
  reveal: Utils.merge(
    [ showWidget.media.bind(), players ], 
    (state: boolean, players: MprisPlayer[]) => state && players.find(player => isRealPlayer(player))
  ),
})
