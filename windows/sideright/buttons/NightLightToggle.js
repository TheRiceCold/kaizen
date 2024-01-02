import { Widget, Utils } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'
import { setupCursorHover } from '../../../misc/CursorHover.js'

export default Widget.Button({
  properties: [
    ['enabled', false],
    ['yellowlight', undefined],
  ],
  className: 'sidebar-iconbutton',
  tooltipText: 'Night Light',
  onClicked: (self) => {
    self._enabled = !self._enabled
    self.toggleClassName('sidebar-button-active', self._enabled)
    Utils.execAsync(self._enabled ? 'wlsunset' : 'pkill wlsunset')
  },
  child: FontIcon(''),
  setup: (self) => {
    setupCursorHover(self)
    self._enabled = !!Utils.exec('pidof wlsunset')
    self.toggleClassName('sidebar-button-active', self._enabled)
  },
})

