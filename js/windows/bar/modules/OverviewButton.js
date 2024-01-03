import { App } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'
import PanelButton from './PanelButton.js'
import { options } from '../../../constants/main.js'

export const distro = imports.gi.GLib.get_os_info('ID')

export const distroIcon = (() => {
  switch (distro) {
    case 'fedora': return ''
    case 'arch': return ''
    case 'nixos': return ''
    case 'debian': return ''
    case 'opensuse-tumbleweed': return ''
    case 'ubuntu': return ''
    case 'endeavouros': return ''
    default: return ''
  }
})()

export default PanelButton({
  window: 'overview',
  className: 'overview',
  onClicked: () => App.toggleWindow('overview'),
  content: FontIcon({
    binds: [['icon', options.bar.icon, 'value', v => v === 'distro-icon' ? distroIcon : v ]],
  }),
})
