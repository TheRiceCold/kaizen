import { type Props as RevealerProps } from 'types/widgets/label'

import options from 'options'
import { sidemenuShow } from 'lib/variables'

export default (name: string, children) => Widget.Revealer({
  transition: 'slide_down',
  transitionDuration: options.transition.value,
  child: Widget.Box({ children, vertical: true, classNames: ['menu-revealer', name] }),
}).hook(
  sidemenuShow[name], 
  (self: RevealerProps) => self.revealChild = sidemenuShow[name].value
)
