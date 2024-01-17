import { Widget } from '../../imports.js'
import Header from './header/main.js'
import Calendar from './Calendar.js'
import Stack from './stack/main.js'

export default state => Widget.Box({
  vexpand: true,
  hexpand: true,
  css: 'min-width: 2px;',
  children: [
    Widget.Box({
      vexpand: true,
      vertical: true,
      className: 'sidebar-right spacing-v-15',
      children: [ Header, Stack(state), Calendar ]
    }),
  ]
})
