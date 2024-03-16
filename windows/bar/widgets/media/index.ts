import BarButton from '../../BarButton'
import Player from './Player'
import cava from 'misc/cava'
import options from 'options'

const mpris = await Service.import('mpris')
const { preferred, cava: { bars, width, height }, action } = options.bar.media

const StackContent = Widget.Stack({
  transition: 'slide_up_down',
  children: {
    player: Widget.Box(),
    cava: Widget.Box({
      hpack: 'center',
      className: 'cava-container',
      child: cava({ bars: bars * width, width, height }),
    }),
  },
})

export default () => BarButton({
  className: 'media',
  child: StackContent,
  onClicked: action.bind(),
  onScrollUp: () => StackContent.shown = 'player',
  onScrollDown: () => StackContent.shown = 'cava',
  setup: self => {
    const player = mpris.getPlayer(preferred.value) || mpris.players[0] || null
    function update() {
      if (!player) return
      StackContent.children.player.child = Player(player)
    }
    self.hook(preferred, update)
    self.hook(mpris, update, 'notify::players')
  }
})
