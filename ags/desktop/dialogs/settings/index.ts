import { DialogWindow } from '..'

import options from 'options'
import pages from './pages'
import icons from 'data/icons'
import { sh } from 'lib/utils'

const current = Variable(pages[0].attribute.name)

const Header = Widget.CenterBox({
  className: 'header',
  startWidget: Widget.Box([
    Widget.Button({
      cursor: 'pointer',
      className: 'reset',
      tooltipText: 'Reset',
      onClicked: options.reset,
    }, Widget.Label('Reset')),
    Widget.Button({
      cursor: 'pointer',
      child: Widget.Label('Inspect'),
      onClicked() { sh('kaizen -i') },
    }),
  ]),
  centerWidget: Widget.Box({
    className: 'pager horizontal',
    children: pages.map(({ attribute: { name, icon } }) => Widget.Button({
      xalign: 0,
      onClicked() { current.value = name },
      child: Widget.Box([ Widget.Icon(icon), Widget.Label(name) ]),
      className: current.bind().as(v => `${v === name ? 'active' : ''}`),
    })),
  }),
  endWidget: Widget.Button({
    hpack: 'end',
    cursor: 'pointer',
    className: 'close',
    onClicked() { App.closeWindow('settings-dialog') },
  }, Widget.Icon(icons.ui.close)),
})

export default () => DialogWindow({
  title: 'Settings',
  name: 'settings-dialog',
  className: 'settings-dialog',
  setup(win) {
    win.on('delete-event', () => {
      win.hide()
      return true
    })
    win.set_default_size(500, 600)
  },
  child: Widget.Box({ vertical: true },
    Header, Widget.Stack({
      transition: 'slide_left_right',
      shown: current.bind() as never,
      children: pages.reduce((obj, page) => ({ ...obj, [page.attribute.name]: page }), {}),
    })
  ),
}).keybind('Escape', () => App.closeWindow('settings-dialog'))
