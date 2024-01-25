import { Widget, App } from '../../imports.js'
import { RoundedCorner, FontIcon } from '../../misc/main.js'
import { 
  Separator,
  Workspaces,
  PanelButton,
  LauncherButton, 
} from './modules/exports.js'

const Modules = [
  RoundedCorner('topleft', 'corner-black'),
  LauncherButton,
  PanelButton({
    content: FontIcon('󱂬'),
    onClicked: () => App.toggleWindow('overview'),
  }),
  PanelButton({
    content: FontIcon(''),
    onClicked: () => App.toggleWindow('launcher'),
  }),
  Separator(),
  Workspaces,
]

export default Widget.Box({ children: Modules })
