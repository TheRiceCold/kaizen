import screenTools from 'service/screen'
import options from 'options'

const IconStack = Widget.Stack({
  transition: 'slide_up_down',
  transitionDuration: options.transition,
  children: {
    recording: Widget.Label({ label: '' }),
    stop: Widget.Button({
      label: '',
      cursor: 'pointer',
      tooltipText: 'Click to stop',
      onClicked() { screenTools.recorder('stop') },
    }),
  }
})

const Timer = Widget.Label().bind(
  'label', screenTools, 'timer', time => {
    const sec = time % 60
    const min = Math.floor(time / 60)
    return `${min}:${sec < 10 ? '0' + sec : sec}`
  })

export default Widget.EventBox({
  hpack: 'center',
  className: 'recorder',
  child: Widget.Box([IconStack, Timer]),
  onHover() { IconStack.shown = 'stop' },
  onHoverLost() { IconStack.shown = 'recording' },
})
