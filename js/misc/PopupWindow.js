import { App, Widget } from '../imports.js'

const { closeWindow } = App

export default ({
  name,
  child,
  showClassName,
  hideClassName,
  ...props
}) => Widget.Window({
  name,
  popup: true,
  visible: false,
  focusable: true,
  layer: 'overlay',
  ...props,

  child: Widget.Box({ 
    className: `window-content ${showClassName} ${hideClassName}`,
    setup: self => self.hook(App, (self, currentName, visible) => {
      if (currentName === name)
        self.toggleClassName(hideClassName, !visible)
    }),
    children: [
      child,
      Widget.EventBox({
        onPrimaryClick: () => closeWindow(name),
        onSecondaryClick: () => closeWindow(name),
        onMiddleClick: () => closeWindow(name),
      })
    ],
  }),
})
