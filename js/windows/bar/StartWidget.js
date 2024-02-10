import { RoundedCorner, FontIcon } from '../../misc/main.js'
import { Separator, Workspaces, PanelButton } from './modules/exports.js'
import { options, icons } from '../../constants/main.js'

const toggle = window => App.toggleWindow(window)

const getDistro = icons.distro[imports.gi.GLib.get_os_info('ID')]
const DistroIcon = Widget.Label({
  label: options.bar.icon.bind('value').transform(v => v === 'distro-icon' ? getDistro: v),
})
const SidebarButton = PanelButton({
  content: DistroIcon,
  tooltipText: 'Open Sidebar Tools',
  onClicked: () => toggle('sidebar'),
})

export default Widget.Box({ 

  children: [
    RoundedCorner('topleft', 'corner-black'),
    SidebarButton,
    PanelButton({
      content: FontIcon('󱂬'),
      tooltipText: 'Workspace Overview',
      onClicked: () => toggle('overview'),
    }),
    PanelButton({
      content: FontIcon(''),
      tooltipText: 'App Launcher',
      onClicked: () => toggle('launcher'),
    }),
    Separator(),
  ]
})
