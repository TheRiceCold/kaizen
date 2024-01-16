import { Widget } from '../../imports.js'
import Header from './header/main.js'
import SettingsStack from './stack/main.js'
import Calendar from '../sidebar/right/Calendar.js'

export default state => Widget.Box({
  vexpand: true,
  hexpand: true,
  css: 'min-width: 2px;',
  children: [
    Widget.Box({
      vexpand: true,
      vertical: true,
      className: 'sidebar-right spacing-v-15',
      children: [ 
        Widget.Box({
          vertical: true,
          className: 'spacing-v-5',
          children: [ Header, SettingsStack(state) ]
        }),
        // Calendar(),
      ]
    })
  ]
})
