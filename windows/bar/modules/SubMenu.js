import { Widget, Utils, Variable } from '../../../imports.js'
import icons from '../../../icons.js'
import options from '../../../options.js'

const Arrow = (revealer, direction, items) => {
  let deg = 0

  const icon = Widget.Icon({ icon: icons.ui.arrow[direction] })

  const animate = () => {
    const t = options.transition.value / 20
    const step = revealer.reveal_child ? 10 : -10
    for (let i = 0; i < 18; ++i) {
      Utils.timeout(t * i, () => {
        deg += step
        icon.setCss(`-gtk-icon-transform: rotate(${deg}deg);`)
      })
    }
  }

  return Widget.Button({
    className: 'panel-button sub-menu',
    connections: [[items, btn => {
      btn.tooltip_text = `${items.value} Items`
    }]],
    onClicked: () => {
      animate()
      revealer.reveal_child = !revealer.reveal_child
    },
    child: icon,
  })
}

export default ({ children, direction = 'left', items = Variable(0) }) => {
  const posStart = direction === 'up' || direction === 'left'
  const posEnd = direction === 'down' || direction === 'right'
  const revealer = Widget.Revealer({
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
