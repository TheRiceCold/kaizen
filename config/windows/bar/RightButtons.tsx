import { Gdk, Gtk } from 'astal/gtk3'
import { ButtonProps } from 'astal/gtk3/widget'
import { Variable, timeout } from 'astal'

import { Tray, Battery, Wifi } from './buttons'

import options from 'options'
import icons from 'data/icons'
import { sessionMenu } from 'widgets/dropdowns'

const { format, interval } = options.bar.date
const time = Variable<string>('').poll(interval.get(), `date '+${format.get()}'`)

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
        {[ 'Capture', 'Draw', 'Magnify', 'Color', 'Keyboard'].map(i => (
          <button
            label={i}
            cursor='pointer'
            onClick={() => { /* toggle */}}
          />
        ))}
      </box>
    </revealer>
  )

  const RevealButton = () => (
    <button
      cursor='pointer'
      className='reveal-button'
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
      <RevealButton />
      <HiddenButtons />
      <Tray />
      <Battery />
      <Wifi />
      <button
        label={time()}
        cursor='pointer'
        onDestroy={() => time.drop()}
      />
      <button
        cursor='pointer'
        child={<icon icon={icons.powermenu.shutdown} />}
        onClickRelease={(self: ButtonProps) => {
          sessionMenu.show_all()
          sessionMenu.popup_at_widget(self, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null)
        }}
      />
    </box>
  )
}
