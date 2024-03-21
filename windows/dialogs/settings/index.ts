import layout from './layout'
import icons from 'data/icons'
import options from 'options'
import DialogWindow from '../DialogWindow'

const current = Variable(layout[0].attribute.name)

const Header = Widget.CenterBox({
  className: 'header',
  startWidget: Widget.Button({
    hpack: 'start',
    vpack: 'start',
    className: "reset",
    tooltipText: 'Reset',
    onClicked: options.reset,
    child: Widget.Icon(icons.ui.refresh),
  }),
  centerWidget: Widget.Box({
    class_name: "pager horizontal",
    children: layout.map(({ attribute: { name, icon } }) => Widget.Button({
      xalign: 0,
      className: current.bind().as(v => `${v === name ? "active" : ""}`),
      onClicked: () => current.value = name,
      child: Widget.Box([
        Widget.Icon(icon),
        Widget.Label(name),
      ]),
    })),
  }),
  endWidget: Widget.Button({
    hpack: 'end',
    vpack: 'start',
    className: 'close',
    child: Widget.Icon(icons.ui.close),
    onClicked: () => App.closeWindow('settings-dialog'),
  }),
})

const Stack = Widget.Stack({
  transition: 'slide_left_right',
  children: layout.reduce((obj, page) => ({ ...obj, [page.attribute.name]: page }), { }),
  shown: current.bind() as never,
})

export default () => DialogWindow({
  title: 'Settings',
  name: 'settings-dialog',
  className: 'settings-dialog',
  setup(win) {
    win.on('delete-event', () => { win.hide(); return true })
    win.set_default_size(500, 600)
  },
  child: Widget.Box({ vertical: true, children: [ Header, Stack ] }),
})
