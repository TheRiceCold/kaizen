import { App, Widget } from '../imports.js'

const { closeWindow } = App

export default ({
  name,
  child,
  ...props
}) => Widget.Window({
  name,
  popup: true,
  visible: false,
  focusable: true,
  layer: 'overlay',
  ...props,

  child: Widget.Box({ 
    className: 'window-content',
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
