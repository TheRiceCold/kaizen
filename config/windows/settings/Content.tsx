import { Variable } from 'astal'
import { App, Gtk } from 'astal/gtk3'

import {
  General, Widgets,
  Keybinds, Hyprland,
  Tools, Colors, About,
} from './pages'

import options from 'options'
import icons from 'data/icons'

const visibleItem = Variable('general')

function Content() {
  const SidebarButton = ({stackChild}: {stackChild: string}) => (
    <button
      cursor='pointer'
      label={stackChild}
      halign={Gtk.Align.START}
      onClickRelease={() => visibleItem.set(stackChild.toLowerCase())}
      className={visibleItem(v => v === stackChild.toLowerCase() ? 'active' : '')}
    />
  )

  return (
    <box vertical>
      <box className='header'>
        <button cursor='pointer' label='Reset' onClick={options.reset} />
        <box hexpand />
        <button
          cursor='pointer'
          child={<icon icon={icons.ui.close} />}
          onClickRelease={() => App.toggle_window('settings')}
        />
      </box>
      <box>
        <box vertical className='sidebar'>
          {['General', 'Widgets', 'Keybinds', 'Hyprland', 'Tools', 'Colors', 'About']
            .map(i => <SidebarButton stackChild={i} />)}
        </box>
        <stack
          visibleChildName={visibleItem()}
          transitionDuration={options.transition.get()}
          transitionType={Gtk.StackTransitionType.SLIDE_UP_DOWN}
        >
          <General />
          <Widgets />
          <Keybinds />
          <Hyprland />
          <Tools />
          <Colors />
          <About />
        </stack>
      </box>
    </box>
  )
}

export default Content
