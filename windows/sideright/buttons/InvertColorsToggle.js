import { Widget, Utils } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'
import { setupCursorHover } from '../../../misc/CursorHover.js'

export default (props = {}) => Widget.Button({
  tooltipText: 'Color inversion',
  className: 'txt-small sidebar-iconbutton',
  onClicked: button => {
    const shaderPath = JSON.parse(Utils.exec('hyprctl -j getoption decoration:screen_shader')).str
    if (shaderPath != "[[EMPTY]]" && shaderPath != "") {
      Utils.execAsync(['bash', '-c', `hyprctl keyword decoration:screen_shader ''`]).catch(print)
      button.toggleClassName('sidebar-button-active', false)
    }
    else {
      Utils.execAsync(['bash', '-c', `hyprctl keyword decoration:screen_shader ~/.config/hypr/shaders/invert.frag`]).catch(print)
      button.toggleClassName('sidebar-button-active', true)
    }
  },
  child: FontIcon('󰌁'),
  setup: setupCursorHover,
  ...props,
})
