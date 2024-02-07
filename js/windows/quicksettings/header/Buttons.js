import { FontIcon } from '../../../misc/main.js'

import { utils } from '../../../constants/main.js'
import { openSettings } from '../../../settings/theme.js'
import { setupCursorHover } from '../../../misc/CursorHover.js'

const buttons = [
  {
    icon: '󰑐',
    tooltipText: 'Reload Hyprland',
    onClicked: () => utils.execBash('hyprctl reload &')
  },
  {
    icon: '',
    onClicked: openSettings,
    tooltipText: 'Open Settings',
  },
  {
    icon: '',
    tooltipText: 'Power Menu',
    // onClicked: () => App.toggleWindow('powermenu'), // IDK why this doesn't work
    onClicked: () => utils.execBash('ags -t powermenu') 
  },
]

export default Widget.Box({
  children: buttons.map(({ 
    icon, 
    onClicked,
    tooltipText, 
  }) => Widget.Button({
    tooltipText,
    hpack: 'end',
    setup: setupCursorHover,
    className: 'icon-button',
    child: FontIcon({ icon: icon, className: 'txt-norm' }),
    onClicked: () => { onClicked(); App.closeWindow('quicksettings') },
  }))
})
