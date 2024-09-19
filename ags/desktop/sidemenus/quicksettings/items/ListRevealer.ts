import { VBox } from 'widgets'

import icons from 'data/icons'
import options from 'options'

const show = Variable(false)

export default (label: string, content: Widget, props = {}) => VBox(
  { className: 'list-revealer', ...props },
  Widget.Button({
    cursor: 'pointer',
    className: 'list-button',
    onClicked() { show.value = !show.value },
    child: Widget.Box([
      Widget.Label({ label, xalign: 0 }),
      Widget.Icon({ hexpand: true, hpack: 'end', icon: icons.ui.arrow.down }),
    ])
  }),

  // List Content
  Widget.Revealer({
    revealChild: show.bind(),
    transition: 'slide_down',
    transitionDuration: options.transition,
  }, content)
)
