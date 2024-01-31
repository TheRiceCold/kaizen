import { Widget, App } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'

import { utils } from '../../../constants/main.js'
import { setupCursorHover } from '../../../misc/CursorHover.js'

const buttons = [
  {
    icon: '󰑐',
    tooltipText: 'Reload Hyprland',
    onClicked: () => utils.execBash('hyprctl reload &')
  },
  {
    icon: '',
    tooltipText: 'Open Settings',
    onClicked: () => utils.execBash('XDG_CURRENT_DESKTOP="gnome" gnome-control-center &'),
  },
  {
    icon: '',
    tooltipText: 'Power Menu',
    // onClicked: () => App.toggleWindow('powermenu'), // IDK why this doesn't work
    onClicked: () => utils.execBash('ags -t powermenu') 
  },
]

export default buttons.map(({ 
  icon, 
  onClicked,
  tooltipText, 
}) => Widget.Button({
  tooltipText,
  hpack: 'end',
  setup: setupCursorHover,
  className: 'qs-icon-button txt-small',
  child: FontIcon({ icon: icon, className: 'txt-norm' }),
  onClicked: () => { onClicked(); App.closeWindow('quicksettings') },
}))
