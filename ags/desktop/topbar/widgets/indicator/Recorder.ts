import screenTools from 'service/screen'
import options from 'options'

const IconStack = Widget.Stack({
  transition: 'slide_up_down',
  transitionDuration: options.transition,
  children: {
    hoverLost: Widget.Label({ xalign: 0, label: '' }),
    hover: Widget.Button({
      xalign: 0,
      label: '',
      cursor: 'pointer',
      tooltipText: 'Click to stop',
      onClicked() { screenTools.recorder('stop') },
    }),
  }
})

export default Widget.EventBox({
  className: 'recorder',
  onHover() { IconStack.shown = 'hover' },
  onHoverLost() { IconStack.shown = 'hoverLost' },
  child: Widget.Box([
    IconStack,
    Widget.Label({
      hpack: 'end', hexpand: true,
      label: screenTools.bind('timer').as(time => {
        const sec = time % 60
        const min = Math.floor(time / 60)
        return `${min}:${sec < 10 ? '0' + sec : sec}`
      })
    })
  ]),
})
