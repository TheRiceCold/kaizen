import { Widget } from '../../imports.js'
import Workspaces from './modules/Workspaces.js'
import RoundedCorner from '../../misc/RoundedCorner.js'

export default Widget.Box({
  children: [
    RoundedCorner('topright', 'corner-bar-group'),
    Workspaces(9),
    RoundedCorner('topleft', 'corner-bar-group'),
  ] 
})
