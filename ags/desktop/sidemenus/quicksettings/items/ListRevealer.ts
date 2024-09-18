import icons from 'data/icons'
import options from 'options'

export default (label: string, content, props = {}) => {
  const Button = Widget.Button({
    cursor: 'pointer',
    className: 'list-button',
    onClicked() { Revealer.revealChild = !Revealer.revealChild },
  }, Widget.Box([
    Widget.Label({ label, xalign: 0 }),
    Widget.Icon({ hexpand: true, hpack: 'end', icon: icons.ui.arrow.down }),
  ]))

  const Revealer = Widget.Revealer({
    transition: 'slide_down',
    transitionDuration: options.transition,
  }, content)

  return Widget.Box({
    className: 'list-revealer',
    vertical: true,
    ...props
  }, Button, Revealer)
}
