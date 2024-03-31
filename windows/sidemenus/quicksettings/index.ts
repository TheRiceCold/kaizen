import { type Props as RevealerProps } from 'types/widgets/label'

import Profile from './profile'
import StackList from './stacklist'

import options from 'options'
import { sidemenuShow } from 'lib/variables'

const QuickSettings = Widget.Box({
  vertical: true,
  className: 'quicksettings',
  children: [ Profile ].concat(StackList)
})

export default Widget.Revealer({
  child: QuickSettings,
  transition: 'slide_down',
  transitionDuration: options.transition.value,
}).hook(sidemenuShow.quicksettings, (self: RevealerProps) => self.revealChild = sidemenuShow.quicksettings.value)
