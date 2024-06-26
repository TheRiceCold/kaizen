import icons from 'data/icons'
import options from 'options'

export default (label: string, content) => {
  const Revealer = Widget.Revealer({
    child: content,
    transition: 'slide_down',
    transitionDuration: options.transition,
  })

  return Widget.Box(
    { vertical: true, className: 'list-revealer' },
    Widget.Button({
      cursor: 'pointer',
      className: 'list-button',
      child: Widget.Box([
        Widget.Label({ label, xalign: 0 }),
        Widget.Icon({ hexpand: true, hpack: 'end', icon: icons.ui.arrow.down }),
      ]),
      onClicked() { Revealer.revealChild = !Revealer.revealChild },
    }),
    Revealer,
  )
}
