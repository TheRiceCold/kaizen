import { type MprisPlayer } from 'types/service/mpris'
import { setupCursorHover } from 'misc/cursorhover'

import PlayerStatusIcon from 'misc/playerStatusIcon'
import Stack from './Stack'

import options from 'options'

const mpris = await Service.import('mpris')
const pref = options.popups.media.preferred.value

const getPlayer = () => mpris.getPlayer(pref) || mpris.players[0] || null

function getTooltip(player: MprisPlayer) {
  switch (player.play_back_status) {
    case 'Playing': return `Playing on ${player.name}`
    default: return `Click to play on ${player.name}`
  }
}

const label = Variable('')
const stack = Stack(label)

const Revealer = Widget.Revealer({
  child: Widget.Box(),
  transition: 'slide_down',
  transitionDuration: options.transition * 1.5,
})

const ProgressIcon = (player: MprisPlayer) => Widget.CircularProgress({
  startAt: 0.75,
  className: 'progress',
  child: PlayerStatusIcon(player),
  attribute: { 
    update: self => self.value = player.position / player.length 
  },
  setup(self) {
    const { update } = self.attribute
    self.hook(mpris, update).poll(1500, update)
  }
})

// FIX: doesn't hide the revealer when the player(like spotify) is open before ags
function update (self) {
  const player = getPlayer()

  const revealTimeout = () => Utils.timeout(1000, () => {
    Revealer.revealChild = !!player
    self.toggleClassName('show-border', !!player)
  })

  if (!player) { revealTimeout(); return }
  if (player.play_back_status === 'Paused') stack.shown = 'song'

  self.onPrimaryClick = player.playPause
  self.tooltipText = getTooltip(player)

  const artists = player.track_artists.join(', ')
  label.value = `${artists && artists+' - '} ${player.track_title}`

  Revealer.child.children = [ ProgressIcon(player), stack ]
  revealTimeout()
}

export default Widget.EventBox({
  vpack: 'start',
  child: Revealer,
  className: 'media',
  setup: setupCursorHover,
  onSecondaryClick() { },
  onScrollUp() { stack.shown = 'song' },
  onScrollDown() { stack.shown = 'visualizer' },
}).hook(mpris, update)
