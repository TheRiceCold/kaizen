import { type MprisPlayer } from 'types/service/mpris'
import popups from 'service/popups'

import { Menu, MenuItemLabel as Item } from 'widgets'

export default (widget, player: MprisPlayer) => Menu(widget, [
  Item('󰐎 Play/Pause', player.playPause),
  Item('󰒭 Next', player.next),
  Item('󰒮 Previous', player.previous),
  Item(' Toggle popup', () => popups.toggle('player')),
], { type: 'event' })
