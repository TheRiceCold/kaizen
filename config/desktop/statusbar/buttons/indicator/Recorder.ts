import capture from 'service/capture'

import { ButtonIcon, ButtonLabel } from 'widgets'

const { Box, EventBox, Label, Stack } = Widget

const currentIconLabel = Variable('recording')

export default (icon: string) => EventBox({
  hpack: 'center',
  className: 'recorder',
  onHover() { currentIconLabel.value = 'stop' },
  onHoverLost() { currentIconLabel.value = 'recording' },
}, Box([
  Stack({
    transition: 'slide_up_down',
    children: {
      recording: ButtonIcon(icon),
      stop: ButtonLabel('', () => capture.recordStop(), { tooltipText: 'Click to stop' }),
    }
  }).bind('shown', currentIconLabel),

  // Timer
  Label().bind('label', capture, 'timer', (timer: number) => {
    const sec = timer % 60
    const min = Math.floor(timer / 60)
    return `${min}:${sec < 10 ? '0' + sec : sec}`
  })
]))
