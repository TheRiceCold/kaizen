import { Widget, App, Utils } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'

import { setupCursorHover } from '../../../misc/CursorHover.js'

const buttons = [
  {
    icon: '󰑐',
    tooltipText: 'Reload Hyprland',
    onClicked: () => Utils.execAsync(['bash', '-c', 'hyprctl reload &']),
  },
  {
    icon: '',
    tooltipText: 'Open Settings',
    onClicked: () => Utils.execAsync(['bash', '-c', 'XDG_CURRENT_DESKTOP="gnome" gnome-control-center', '&']),
  },
  {
    icon: '',
    tooltipText: 'Power Menu',
    onClicked: () => App.toggleWindow('powermenu'),
  },
]

export default buttons.map(({ icon, tooltipText, onClicked })=> Widget.Button({
  tooltipText,
  hpack: 'end',
  setup: setupCursorHover,
  className: 'qs-icon-button txt-small',
  child: FontIcon({ icon: icon, className: 'txt-norm' }),
  onClicked: () => { onClicked(); App.closeWindow('quicksettings') },
}))
