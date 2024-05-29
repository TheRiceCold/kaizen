import icons from 'data/icons'
import { capitalize, getPlayer } from 'lib/utils'

export default (
  type:
    'brightness' |
    'microphone' |
    'volume' |
    'player',
  value: number | string
) => {
  const player = getPlayer()

  switch(type) {
    case 'player': return [
      Widget.CircularProgress({
        startAt: 0.75,
        className: 'progress',
        child: Widget.Icon().bind(
          'icon', player, 'play-back-status',
          status => icons.mpris[status.toLowerCase()]
        )
      }).poll(1000, self => self.value = player.position / player.length),
      Widget.Label(value)
    ]

    default: return [
      Widget.CircularProgress({
        startAt: 0.75,
        className: 'progress',
        value: (value < 1) ? value : 1,
        child: Widget.Icon(
          (type === 'volume') ? icons.audio.type.speaker :
            (type === 'brightness') ? icons.brightness.indicator :
              icons.audio.mic.high)
      }),
      Widget.Label(`${capitalize(type)}: ${Math.round(value * 100)}%`)
    ]
  }
}
