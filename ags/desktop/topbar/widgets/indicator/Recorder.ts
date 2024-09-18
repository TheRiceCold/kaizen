import screenTools from 'service/screen'

import { ButtonLabel } from 'widgets'

import options from 'options'

const IconStack = Widget.Stack({
  transition: 'slide_up_down',
  transitionDuration: options.transition,
  children: {
    recording: Widget.Label(''),
    stop: ButtonLabel('', () => screenTools.recorder('stop'), { tooltipText: 'Click to stop' }),
  }
})

const Timer = Widget.Label().bind(
  'label', screenTools, 'timer', (time: number) => {
    const sec = time % 60
    const min = Math.floor(time / 60)
    return `${min}:${sec < 10 ? '0' + sec : sec}`
  })

export default Widget.EventBox({
  hpack: 'center',
  className: 'recorder',
  onHover() { IconStack.shown = 'stop' },
  onHoverLost() { IconStack.shown = 'recording' },
}, Widget.Box([IconStack, Timer]))
