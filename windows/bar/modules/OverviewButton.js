import { App } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'
import PanelButton from './PanelButton.js'

import options from '../../../options.js'
import { distroIcon } from '../../../variables.js'

export default PanelButton({
  class_name: 'overview',
  window: 'overview',
  onClicked: () => App.toggleWindow('overview'),
  content: FontIcon({
    binds: [['icon', options.bar.icon, 'value', v => v === 'distro-icon' ? distroIcon : v ]],
  }),
});
