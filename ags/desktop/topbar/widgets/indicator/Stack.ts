import screenTools from 'service/screen'

import { ButtonLabel } from 'widgets'
import * as Media from './Media'
import recorder from './Recorder'

import options from 'options'
import { showWidget } from 'lib/variables'

const { player: show } = showWidget

export default Widget.Stack({
  className: 'stack',
  transition: 'slide_up_down',
  transitionDuration: options.transition,
  children: {
    //pomodoro: Widget.Box(),
    zoom: ButtonLabel('Click to exit zoom', () => screenTools.zoom()),
    brightness: Widget.Box(),
    microphone: Widget.Box(),
    volume: Widget.Box(),
    recorder,
    ...Media,
  },
}).hook(show, (self: typeof Widget.Stack) => self.shown = show ? 'visualizer' : 'playing')
