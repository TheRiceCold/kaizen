import screenTools from 'service/screen'

import { ButtonLabel } from 'widgets'

const { Box, EventBox, Label, Stack } = Widget

const currentIconLabel = Variable('recording')

export default EventBox({
  hpack: 'center',
  className: 'recorder',
  onHover() { currentIconLabel.value = 'stop' },
  onHoverLost() { currentIconLabel.value = 'recording' },
}, Box([
  Stack({
    transition: 'slide_up_down',
    children: {
      recording: Label(''),
      stop: ButtonLabel('',
        () => screenTools.recorder('stop'),
        { tooltipText: 'Click to stop' }
      ),
    }
  }).bind('shown', currentIconLabel),

  // Timer
  Label().bind('label', screenTools, 'timer', (time: number) => {
    const sec = time % 60
    const min = Math.floor(time / 60)
    return `${min}:${sec < 10 ? '0' + sec : sec}`
  })
]))
