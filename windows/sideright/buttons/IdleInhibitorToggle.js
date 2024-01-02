import { Widget, Utils } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'
import { setupCursorHover } from '../../../misc/CursorHover.js'

export default Widget.Button({
  properties: [
    ['enabled', false],
    ['inhibitor', undefined],
  ],
  className: 'txt-small sidebar-iconbutton',
  tooltipText: 'Keep system awake',
  onClicked: (self) => {
    self._enabled = !self._enabled
    self.toggleClassName('sidebar-button-active', self._enabled)
    if (self._enabled) {
      self._inhibitor = Utils.subprocess(
        ['wayland-idle-inhibitor.py'],
        output => print(output),
        err => logError(err),
        self,
      )
    }
    else self._inhibitor.force_exit()
  },
  child: FontIcon(''),
  setup: setupCursorHover,
})
