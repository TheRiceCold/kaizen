import screenTools from 'service/screen'

import { ButtonLabel } from 'widgets'

import options from 'options'

const { Box, EventBox, Label, Stack } = Widget

export default EventBox({
  hpack: 'center',
  className: 'recorder',
  onHover() { IconStack.shown = 'stop' },
  onHoverLost() { IconStack.shown = 'recording' },
}, Box([
  Stack({
    transition: 'slide_up_down',
    transitionDuration: options.transition,
    children: {
      recording: Label(''),
      stop: ButtonLabel(
        '', () => screenTools.recorder('stop'),
        { tooltipText: 'Click to stop' }
      ),
    }
  }),

  // Timer
  Label().bind('label', screenTools, 'timer', (time: number) => {
    const sec = time % 60
    const min = Math.floor(time / 60)
    return `${min}:${sec < 10 ? '0' + sec : sec}`
  })
]))
