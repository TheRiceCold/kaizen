import options from 'options'
import { setupCursorHover } from 'misc/cursorhover'

export default ({ icon, name, child, revealChild = true }) => {
  const header = Widget.Button({
    setup: setupCursorHover,
    onClicked: () => content.revealChild = !content.revealChild,
    child: Widget.Box([ icon, Widget.Label({ label: `${name}` }) ]),
  })

  const content = Widget.Revealer({
    child,
    revealChild: revealChild,
    transition: 'slide_down',
    transitionDuration: options.transition,
  })

  return Widget.Box({
    vertical: true,
    children: [ header, content ]
  })
}
