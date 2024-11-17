import { Gtk } from 'astal/gtk3'
import { Variable, timeout } from 'astal'

import { Workspaces } from './buttons'

import icons from 'data/icons'

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
      transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
    >
      <box className='button-revealer'>
        <button label='Ask' />,
        <button label='Run' />,
        <button label='Tools' />,
        <button label='Settings' />,
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
    <box halign={Gtk.Align.START} className='side-items'>
      <button label='󰚀' />
      <Workspaces />
      <HiddenButtons />
      <ExpandButton />
    </box>
  )
}
