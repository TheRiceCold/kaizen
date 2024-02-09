import { setupCursorHover } from '../../../misc/CursorHover.js'
import { options, icons }from '../../../constants/main.js'

function Arrow(revealer, direction, items) {
  let deg = 0
  const icon = Widget.Icon({ icon: icons.arrow.right })

  const animate = () => {
    const t = options.transition.value / 20
    const step = revealer.reveal_child ? 10 : -10
    for (let i = 0; i < 18; ++i)
      Utils.timeout(t * i, () => {
        deg += step
        icon.setCss(`-gtk-icon-transform: rotate(${deg}deg);`)
      })
  }

  return Widget.Button({
    child: icon,
    setup: setupCursorHover,
    className: 'panel-button sub-menu',
    tooltipText: items.bind().transform(v => `${v} Items`),
    onClicked: () => {
      animate()
      revealer.reveal_child = !revealer.reveal_child
    },
  })
}

export default ({ 
  children, 
  direction = 'left', 
  items = Variable(0) 
}) => {
  const posStart = direction === 'up' || direction === 'left'
  const posEnd = direction === 'down' || direction === 'right'
  const revealer = Widget.Revealer({
    revealChild: true,
    transition: `slide_${direction}`,
    child: Widget.Box({ children }),
  })

  return Widget.Box({
    vertical: direction === 'up' || direction === 'down',
    children: [
      posStart && revealer,
      Arrow(revealer, direction, items),
      posEnd && revealer,
    ],
  })
}
