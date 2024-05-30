import screenTools from 'service/screen'

import * as Media from './Media'
import { showWidget } from 'lib/variables'

const { player: show } = showWidget

export default Widget.Stack({
  className: 'stack',
  transition: 'slide_up_down',
  children: {
    brightness: Widget.Box(),
    microphone: Widget.Box(),
    volume: Widget.Box(),
    recorder: Widget.Button({
      hpack: 'center',
      cursor: 'pointer',
      className: 'record-time',
      tooltipText: 'Click to stop',
      onClicked() { screenTools.recorder('stop') },
      label: screenTools.bind('timer').as(time => {
        const sec = time % 60
        const min = Math.floor(time / 60)
        return `  ${min}:${sec < 10 ? '0' + sec : sec}`
      }),
    }),
    ...Media,
  },
}).hook(show, self => self.shown = show ? 'visualizer' : 'playing')
