import { PopupWindow } from '../../misc/main.js'
import { Widget } from '../../imports.js'

import Header from './Header.js'
import Body from './Body.js'

export default PopupWindow({
  name: 'cheatsheet',
  child: Widget.Box({
    vertical: true,
    children: [Header, Body],
    className: 'cheatsheet spacing-v-15',
  })
})
