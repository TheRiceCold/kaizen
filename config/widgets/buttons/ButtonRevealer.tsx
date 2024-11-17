import { Variable } from 'astal'
import { timeout } from 'astal/time'
import { Gtk, Widget } from 'astal/gtk3'

import icons from 'data/icons'

export default ({ direction, className, buttons }: {
  className: string,
  buttons: Widget.Button[],
  direction: 'left' | 'right',
}) => {
  const reveal = Variable<boolean>(false)
  const arrowRotation = Variable<number>(0)

  const Icon = () => (
    <icon
      icon={icons.ui.arrow[direction]}
      css={arrowRotation((val: number) => `-gtk-icon-transform: rotate(${val}deg);`)}
    />
  )

  const Revealer = () => (
    <revealer
      revealChild={reveal()}
      transitionDuration={250}
      child={<box
        children={buttons}
        className={className}
        halign={Gtk.Align[direction === 'left' ? 'END' : 'START']}
      />}
      transition={Gtk.RevealerTransitionType[`SLIDE_${direction.toUpperCase()}`]}
    />
  )

  const ArrowIcon = () => (
    <button
      child={<Icon />}
      className='arrow-button'
      onClicked={() => { animate(); reveal.set(!reveal.get()) }}
    />
  )

  function animate() {
    const step = reveal.get() ? 10 : -10
    for (let i = 0; i < 18; ++i)
      timeout(10 * i, () => arrowRotation.set(arrowRotation.get() + step))
  }

  return (
    <box>
      {direction === 'left' && <ArrowIcon />}
      <Revealer />
      {direction === 'right' && <ArrowIcon />}
    </box>
  )
}
