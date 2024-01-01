import { PopupWindow } from '../../misc/main.js'
import { Widget } from '../../imports.js'

import Head from './Head.js'
import Body from './Body.js'

export default () => PopupWindow({
  name: 'cheatsheet',
  child: Widget.Box({
    vertical: true,
    children: [ Head(), Body() ],
    className: 'cheatsheet-bg spacing-v-15',
  })
})
