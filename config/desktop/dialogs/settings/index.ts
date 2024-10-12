import {
  RegularWindow, VBox,
  ButtonLabel, ButtonIcon, ButtonIconLabel
} from 'widgets'

import options from 'options'
import pages from './pages'
import icons from 'data/icons'
import { sh } from 'lib/utils'

const { Box, CenterBox, Stack } = Widget
const current = Variable(pages[0].attribute.name)

const WINDOW_NAME = 'settings-dialog'
const closeWindow = () => App.closeWindow(WINDOW_NAME)

const Header = CenterBox(
  { className: 'header' },
  Box(
    { hpack: 'start' },
    ButtonLabel('󰓾', () => sh('kaizen -i')),
    ButtonIcon(icons.ui.refresh, options.reset, {
      className: 'reset',
      tooltipText: 'Reset',
    })),

  Box(
    { className: 'pager horizontal' },
    ...pages.map(({ attribute: { name, icon } }) => ButtonIconLabel(
      icon, name, () => { current.value = name }, {
        xalign: 0,
        className: current.bind()
          .as((v: string) => `${v === name ? 'active' : ''}`),
      })
    )),

  ButtonIcon(
    icons.ui.close,
    () => { App.closeWindow('settings-dialog') },
    { hpack: 'end', className: 'close' }),
)

export default () => RegularWindow({
  name: WINDOW_NAME,
  title: 'Settings',
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
}).keybind('q', closeWindow).keybind('Escape', closeWindow)
