import { type Props as RevealerProps } from 'types/widgets/label'

import Avatar from './Avatar'
import ClockBox from './ClockBox'
import StackChildren from './StackChildren'

import options from 'options'
import icons from 'data/icons'
import { sidemenuShow } from 'lib/variables'

const SysButtons = [
  Widget.Button({
    vpack: 'center',
    child: Widget.Icon(icons.ui.settings),
    onClicked: () => App.openWindow('settings-dialog')
  }),
  Widget.Button({
    vpack: 'center',
    child: Widget.Icon(icons.powermenu.shutdown),
    onClicked: () => App.openWindow('powermenu'),
  })
]

const QuickSettings = Widget.Box({
  vertical: true,
  className: 'quicksettings',
  children: [
    Widget.Box({ 
      className: 'profile', 
      children: [ Avatar, ClockBox ].concat(SysButtons)
    }), 
  ].concat(StackChildren)
})

export default Widget.Revealer({
  child: QuickSettings,
  transition: 'slide_down',
  transitionDuration: options.transition.value,
}).hook(sidemenuShow.quicksettings, (self: RevealerProps) => self.revealChild = sidemenuShow.quicksettings.value)
