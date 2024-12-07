import { App, Gtk } from 'astal/gtk3'
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
        <button cursor='pointer' label='Ask' />
        <button
          label='Run'
          cursor='pointer'
          onClickRelease={() => App.toggle_window('run')} />
        <button cursor='pointer' label='Tools' />
        <button cursor='pointer' label='Settings' onClickRelease={() => App.toggle_window('settings') } />
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
    <box halign={Gtk.Align.START} className='side-items'>
      <button cursor='pointer' label='󰚀' />
      <Workspaces />
      <HiddenButtons />
      <RevealButton />
    </box>
  )
}
