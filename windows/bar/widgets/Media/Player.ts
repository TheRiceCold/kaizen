import { type MprisPlayer } from 'types/service/mpris'
import { icon } from 'lib/utils'
import options from 'options'
import icons from 'data/icons'

const { length, direction, monochrome } = options.bar.media

export default (player: MprisPlayer) => {
  const text = Widget.Box({
    clickThrough: true,
    visible: length.bind().as(l => l > 0),
    child: Widget.Label({
      truncate: 'end',
      maxWidthChars: length.bind(),
      label: player.bind('track_title').as(() => ` ${player.track_artists.join(', ')} - ${player.track_title}`),
    }),
  })

  const playericon = Widget.Icon({
    icon: Utils.merge(
      [ player.bind('entry'), monochrome.bind() ],
      entry => icon(`${entry}${monochrome.value ? '-symbolic' : ''}`, icons.fallback.audio)
    ),
  })

  return Widget.Box({
    children: direction.bind().as(d => d === 'right' ? [playericon, text] : [text, playericon]),
  })
}
