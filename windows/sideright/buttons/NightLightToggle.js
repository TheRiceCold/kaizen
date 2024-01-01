import { Widget, Utils } from '../../../imports.js'

export default (props = {}) => Widget.Button({ // TODO: Make this wok
  properties: [
    ['enabled', false],
    ['yellowlight', undefined],
  ],
  className: 'txt-small sidebar-iconbutton',
  tooltipText: 'Night Light',
  onClicked: (self) => {
    self._enabled = !self._enabled
    self.toggleClassName('sidebar-button-active', self._enabled)
    // if (self._enabled) Utils.execAsync(['bash', '-c', 'wlsunset & disown'])
    if (self._enabled) 
      Utils.execAsync('wlsunset')
    else 
      Utils.execAsync('pkill wlsunset')
  },
  child: FontIcon(''),
  setup: (self) => {
    setupCursorHover(self)
    self._enabled = !!Utils.exec('pidof wlsunset')
    self.toggleClassName('sidebar-button-active', self._enabled)
  },
  ...props,
})

