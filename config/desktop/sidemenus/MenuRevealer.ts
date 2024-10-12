import { showWidget } from 'lib/variables'
import { VBox } from 'widgets'

type menuNames = 'ask' | 'calendar' | 'quicksettings'

export default (name: menuNames, ...children) => Widget.Revealer({
  transition: 'slide_down',
  setup(self: typeof Widget.Revealer) {
    const show = showWidget[name]
    self.hook(show, () => self.revealChild = show.value)
  }
}, VBox({ children, classNames: ['menu-revealer', name] }))
