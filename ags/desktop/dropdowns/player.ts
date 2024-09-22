import { type MprisPlayer } from 'types/service/mpris'

import { Menu, MenuItemLabel as Item } from 'widgets'
import { showWidget } from 'lib/variables'

export default (widget, player: MprisPlayer) => Menu(widget, [
  Item('󰐎 Play/Pause', player.playPause),
  Item('󰒭 Next', player.next),
  Item('󰒮 Previous', player.previous),
  Item(' Show popup', () => showWidget.player.value = true),
], { type: 'event' })
