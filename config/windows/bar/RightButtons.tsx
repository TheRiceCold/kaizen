import { Gtk } from 'astal/gtk3'
import { Variable, timeout } from 'astal'

import { Tray, Battery, Wifi } from './buttons'

import icons from 'data/icons'

const time = Variable<string>('').poll(1000, "date '+%a %d %b %I:%M %p'")

const reveal = Variable<boolean>(false)
const arrowRotation = Variable<number>(0)

function animate() {
  const step = reveal.get() ? 10 : -10
  for (let i = 0; i < 18; ++i)
    timeout(10 * i, () => arrowRotation.set(arrowRotation.get() + step))
}

export default () => {
  const HiddenButtons = () => (
    <revealer
      revealChild={reveal()}
      transitionDuration={250}
      transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
    >
      <box className='button-revealer'>
        <button label='Capture' />,
        <button label='Draw' />,
        <button label='Magnify' />,
        <button label='Color' />,
        <button label='Keyboard' />,
      </box>
    </revealer>
  )

  const ExpandButton = () => (
    <button
      className='arrow-button'
      onClicked={() => { animate(); reveal.set(!reveal.get()) }}
      child={
        <icon
          icon={icons.ui.arrow.right}
          css={arrowRotation((val: number) => `-gtk-icon-transform: rotate(${val}deg);`)}
        />
      }
    />
  )

  return (
    <box className='side-items' halign={Gtk.Align.END}>
      <ExpandButton />
      <HiddenButtons />
      <Tray />
      <Battery />
      <Wifi />
      <button label={time()} onDestroy={() => time.drop()} />
      <button>
        <icon icon={icons.powermenu.shutdown} />
      </button>
    </box>
  )
}
