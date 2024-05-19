import options from 'options'
import { showWidget } from 'lib/variables'

type menuNames = 'ai-tools' | 'datemenu' | 'quicksettings'

export default (name: menuNames, children) => Widget.Revealer({
  transition: 'slide_down',
  transitionDuration: options.transition.value,
  child: Widget.Box({
    children,
    vertical: true,
    classNames: ['menu-revealer', name]
  }),
  setup(self) {
    const show = showWidget[name]
    self.hook(show, () => self.revealChild = show.value)
  }
})
