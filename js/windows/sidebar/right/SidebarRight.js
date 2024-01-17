import { Widget } from '../../../imports.js'
import ModuleCalendar from './Calendar.js'

export default Widget.Box({
  vexpand: true,
  hexpand: true,
  css: 'min-width: 2px;',
  children: [
    Widget.Box({
      vexpand: true,
      vertical: true,
      className: 'sidebar-right spacing-v-15',
      children: [
        ModuleCalendar(),
      ]
    }),
  ]
})
