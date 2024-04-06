import options from 'options'
import { showWidget } from 'lib/variables'

export default (name: string, children) => Widget.Revealer({
  transition: 'slide_down',
  transitionDuration: options.transition.value,
  child: Widget.Box({ 
    children, 
    vertical: true, 
    classNames: ['menu-revealer', name] 
  }),
  setup(self) {
    const shown = showWidget.sideleft[name] ?? showWidget.sideright[name]
    self.hook(shown, () => self.revealChild = shown.value)
  }
})
