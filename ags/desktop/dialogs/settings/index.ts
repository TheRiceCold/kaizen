import { DialogWindow } from '..'

import options from 'options'
import pages from './pages'
import icons from 'data/icons'
import { sh } from 'lib/utils'
import { ButtonLabel, ButtonIcon, ButtonIconLabel, VBox } from 'widgets'

const { Box, CenterBox, Stack } = Widget
const current = Variable(pages[0].attribute.name)

const Header = CenterBox({
  className: 'header',
  startWidget: Box(
    { hpack: 'start' },
    ButtonLabel('󰓾', () => sh('kaizen -i')),
    ButtonIcon(icons.ui.refresh, options.reset, {
      className: 'reset',
      tooltipText: 'Reset',
    })),

  centerWidget: Box(
    { className: 'pager horizontal' },
    ...pages.map(({ attribute: { name, icon } }) => ButtonIconLabel(
      icon, name, () => { current.value = name }, {
        xalign: 0,
        className: current.bind()
          .as((v: string) => `${v === name ? 'active' : ''}`),
      })
    )),

  endWidget: ButtonIcon(
    icons.ui.close,
    () => { App.closeWindow('settings-dialog') },
    { hpack: 'end', className: 'close' }),
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
  child: VBox([
    Header, Stack({
      transition: 'slide_left_right',
      shown: current.bind() as never,
      children: pages.reduce((obj, page) => ({ ...obj, [page.attribute.name]: page }), {}),
    })
  ]),
}).keybind('Escape', () => App.closeWindow('settings-dialog'))
