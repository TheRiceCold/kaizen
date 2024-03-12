import PanelButton from '../PanelButton'
import Player from './Player'
import cava from 'misc/cava'
import options from 'options'

const mpris = await Service.import('mpris')
const { preferred, cava: { bars, width, height }, action } = options.bar.media

const getPlayer = (name = preferred.value) => mpris.getPlayer(name) || mpris.players[0] || null

const update = self => {
  let player = getPlayer()
  if (!player) return
  self.children.player.child = Player(player)
}

const StackContent = Widget.Stack({
  transition: 'slide_up_down',
  children: {
    player: Widget.Box({ }),
    cava: Widget.Box({
      hpack: 'center',
      className: 'cava-container',
      child: cava({ bars: bars * width, width, height }),
    })
  },
}).hook(preferred, update).hook(mpris, update, 'notify::players')

export default () => PanelButton({
  child: StackContent,
  onClicked: action.bind(),
  onScrollUp: () => StackContent.shown = 'player',
  onScrollDown: () => StackContent.shown = 'cava',
})
