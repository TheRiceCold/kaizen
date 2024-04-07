import { type MprisPlayer } from 'types/service/mpris'
import PlayIcon from './PlayIcon'
import Stack from './Stack'
import options from 'options'

const mpris = await Service.import('mpris')
const pref = options.media.preferred.value

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

function update (self) {
  const player = getPlayer()
  const artists = player.track_artists.join(', ')
  // FIX: doesn't hide the revealer when the player(like spotify) is open before ags
  const revealTimeout = () => Utils.timeout(1000, () => {
    Revealer.revealChild = !!player.entry
    self.toggleClassName('show-border', !!player.entry)
  })

  if (!player.entry) { revealTimeout(); return }
  if (player.play_back_status === 'Paused') stack.shown = 'song'

  self.onPrimaryClick = player.playPause
  self.tooltipText = getTooltip(player)
  label.value = `${artists && artists+' - '} ${player.track_title}`

  Revealer.child.children = [ PlayIcon(player), stack ]
  revealTimeout()
}

export default () => Widget.EventBox({
  vpack: 'start',
  child: Revealer,
  className: 'media',
  onSecondaryClick: () => { },
  onScrollUp: () => stack.shown = 'song',
  onScrollDown: () => stack.shown = 'visualizer',
}).hook(mpris, update)
