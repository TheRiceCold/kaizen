import { Widget } from '../../imports.js'
import { PopupWindow } from '../../misc/main.js'

import Footer from './footer/main.js'
import Header from './header/main.js'
import StackContent from './stack/main.js'
const { Box } = Widget

const Sidebar = Box({
  children: [
    Box({
      vexpand: true,
      vertical: true,
      className: 'sidebar-right',
      children: [
        Box({
          vertical: true,
          children: [Header, StackContent]
        }), Footer,
      ]
    }),
  ]
})

export default PopupWindow({
  child: Sidebar,
  name: 'sidebar',
  focusable: true,
  anchor: ['right', 'top', 'bottom'],
})
