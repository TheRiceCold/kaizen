import { Widget, Utils } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'

export default (
  icon, 
  name, 
  hyprConfig, 
  props = {}
) => Widget.Button({
  className: 'txt-small sidebar-iconbutton',
  tooltipText: `${name}`,
  onClicked: btn => {
    Utils.execAsync(`hyprctl -j getoption ${hyprlandConfigValue}`).then((result) => {
      const currentOption = JSON.parse(result).int
      Utils.execAsync([
        'bash', '-c', 
        `hyprctl keyword ${hyprlandConfigValue} ${1 - currentOption} &`
      ]).catch(print)
      btn.toggleClassName('sidebar-button-active', currentOption == 0)
    }).catch(print)
  },
  child: FontIcon(icon),
  setup: btn => {
    btn.toggleClassName(
      'sidebar-button-active', 
      JSON.parse(Utils.exec(`hyprctl -j getoption ${hyprConfig}`)).int == 1
    )
    setupCursorHover(btn)
  }, ...props
})

