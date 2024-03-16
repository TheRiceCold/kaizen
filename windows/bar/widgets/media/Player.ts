import { type MprisPlayer } from 'types/service/mpris'
import options from 'options'

const { length } = options.bar.media
export default (player: MprisPlayer) => Widget.Label({
  truncate: 'end',
  className: 'text',
  maxWidthChars: length.bind(),
  visible: length.bind().as(l => l > 0),
  label: player.bind('track_title').as(() => `${player.track_artists.join(', ')} - ${player.track_title}`),
})
