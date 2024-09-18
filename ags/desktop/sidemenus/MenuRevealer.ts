import { showWidget } from 'lib/variables'

type menuNames = 'ask' | 'calendar' | 'quicksettings'

export default (name: menuNames, ...children) => Widget.Revealer({
  transition: 'slide_down',
  setup(self: typeof Widget.Revealer) {
    const show = showWidget[name]
    self.hook(show, () => self.revealChild = show.value)
  }
}, Widget.Box({ children, vertical: true, classNames: ['menu-revealer', name] }))
