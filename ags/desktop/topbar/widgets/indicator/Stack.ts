import screenTools from 'service/screen'

import { ButtonLabel } from 'widgets'
import * as Media from './Media'
import recorder from './Recorder'

import options from 'options'
import { showWidget } from 'lib/variables'

const { Box, Stack } = Widget
const { player: show } = showWidget

export default Stack({
  className: 'stack',
  transition: 'slide_up_down',
  transitionDuration: options.transition,
  children: {
    //pomodoro: Widget.Box(),
    zoom: ButtonLabel('Click to exit zoom', () => screenTools.zoom()),
    brightness: Box(),
    microphone: Box(),
    volume: Box(),
    recorder,
    ...Media,
  },
}).hook(show, (self: typeof Widget.Stack) => self.shown = show ? 'visualizer' : 'playing')
