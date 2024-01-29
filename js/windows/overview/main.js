import { Widget, App, Hyprland } from '../../imports.js'
import { PopupWindow } from '../../misc/main.js'

import Workspace from './Workspace.js'
import { options, utils } from '../../constants/main.js'

const ws = options.workspaces

const update = box => {
  if (App.windows.has('overview') && !App.getWindow('overview')?.visible)
    return

  Hyprland.sendMessage('j/clients')
    .then(clients => {
      box.children.forEach(ws => {
        ws.attribute(JSON.parse(clients))
      })
    }).catch(console.error)
}

const children = box => {
  if (ws.value === 0) {
    box.children = Hyprland.workspaces
      .sort((ws1, ws2) => ws1.id - ws2.id)
      .map(({ id }) => Workspace(id))
  }
}

export default PopupWindow({
  name: 'overview',
  child: Widget.Box({
    setup: self => {
      self.hook(ws, () => {
        self.children = utils.range(ws.value).map(Workspace)
        update(self)
        children(self)
      })
      self.hook(Hyprland, update)
      self.hook(Hyprland, children, 'notify::workspaces')
      update(self)
    },
  }),
})
