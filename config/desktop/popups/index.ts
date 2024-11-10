import popups from 'service/popups'

import { VBox } from 'widgets'
import { Indicator, Keyboard, Color } from './bottom'
import { Ask, Calendar, QuickSettings } from './side'
import { Draw, Magnify, Player, Capture, Notifications } from './top'

import options from 'options'

const PopupWindow = (position: 'top' | 'bottom', ...children) => Widget.Window({
  layer: 'overlay',
  anchor: [position],
  name: `${position}-popups`,
  className: `${position}-popups`,
  child: VBox({ children, css: 'padding: 2px;' }),
  margins: popups.bind('indicator-shown').as((shown: boolean) => shown && (position === 'top') ? [36] : [0]),
})

const SideWindow = (dir: 'left' | 'right', ...children) => Widget.Window({
  layer: 'overlay',
  name: `${dir}-popups`,
  className: `${dir}-popups`,
  keymode: dir === 'left' ? 'on-demand' : 'none',
  child: VBox({ children, css: 'padding: 2px;' }),
  anchor: options.statusbar.position.bind().as((p: 'top' | 'bottom') => [p, dir]),
})

export default [
  PopupWindow('top', Player, Capture, Draw, Magnify, Notifications()),
  PopupWindow('bottom', Indicator, Color, Keyboard),

  SideWindow('left', Ask),
  SideWindow('right', QuickSettings, Calendar),
]
