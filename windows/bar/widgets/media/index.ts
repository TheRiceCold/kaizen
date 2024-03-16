import BarButton from '../../BarButton'
import Player from './Player'
import PlayIcon from './PlayIcon'
import cava from 'misc/cava'
import options from 'options'

const mpris = await Service.import('mpris')
const { preferred, action } = options.media
const { bars, width, height } = options.bar.media.cava
const getPlayer = () => mpris.getPlayer(preferred.value) || mpris.players[0] || null

export default () => {
  let player = getPlayer()

  const StackContent = Widget.Stack({
    className: 'stack',
    transition: 'slide_up_down',
    children: {
      player: Widget.Box(),
      cava: Widget.Box({
        hpack: 'center',
        className: 'cava-container',
        child: cava({ bars: bars * width, width, height }),
      })
    },
  }).hook(mpris, self => {
    if (player.play_back_status === 'Paused')
      self.shown = 'player'
  })

  return BarButton({
    className: 'media',
    child: Widget.Box([
      PlayIcon(player),
      StackContent,
    ]),
    onClicked: player.playPause,
    onSecondaryClick: action.bind(),
    onScrollUp: () => StackContent.shown = 'player',
    onScrollDown: () => StackContent.shown = 'cava',
    setup: self => {
      player = getPlayer()
      self.visible = !!player
      function update() {
        if (!player) return
        StackContent.children.player.child = Player(player)
      }
      self.hook(preferred, update)
      self.hook(mpris, update, 'notify::players')
    }
  })
}
