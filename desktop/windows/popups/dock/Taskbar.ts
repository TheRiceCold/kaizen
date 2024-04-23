import AppButton from './AppButton'
import options from 'options'
import { getAllFiles, searchIcons } from 'lib/utils'

const cachePath = new Map()
const { dock } = options.popups
const hyprland = await Service.import('hyprland')
const icon_files = dock.icons.searchPaths.map(e => getAllFiles(e)).flat(1)
const focus = ({ address }) => Utils.execAsync(`hyprctl dispatch focuswindow address:${address}`).catch(print)

function substitute(str: string) {
  const subs = [
    { from: 'code-url-handler', to: 'visual-studio-code' },
    { from: 'Code', to: 'visual-studio-code' },
    { from: 'GitHub Desktop', to: 'github-desktop' },
    { from: 'wps', to: 'wps-office2019-kprometheus' },
    { from: 'gnome-tweaks', to: 'org.gnome.tweaks' },
    { from: 'Minecraft* 1.20.1', to: 'minecraft' },
    { from: '', to: 'image-missing' },
  ]

  for (const { from, to } of subs)
    if (from === str) 
      return to

  return str
}

function ExclusiveWindow(client) {
  const fn = [
    client => !(client !== null && client !== undefined),
    client => client.title.includes('win'),
    client => client.title === '' && client.class === ''
  ]

  for (const item of fn)
    if (item(client)) 
      return true

  return false
}

export default Widget.Box({
  className: 'dock-apps',
  attribute: {
    map: new Map(),
    clientSortFunc: (a, b) => a.attribute.workspace > b.attribute.workspace,
    update(self) {
      for (let i = 0; i < hyprland.clients.length; i++) {
        const client = hyprland.clients[i]
        if (client['pid'] == -1) return
        const appClass = substitute(client.class)
        const appClassLower = appClass.toLowerCase()
        let path = ''
        if (cachePath[appClassLower]) 
          path = cachePath[appClassLower]
        else {
          path = searchIcons(appClass.toLowerCase(), icon_files)
          cachePath[appClassLower] = path
        }
        if (path === '') path = substitute(appClass)
        const newButton = AppButton({
          icon: path,
          onClicked: () => focus(client),
          tooltipText: `${client.title} (${appClass})`,
        })
        newButton.attribute.workspace = client.workspace.id
        newButton.revealChild = true
        self.attribute.map.set(client.address, newButton)
      }
      self.children = Array.from(self.attribute.map.values())
    },
    add(box, address) {
      if (!address) { // First active emit is undefined
        box.attribute.update(box)
        return
      }
      const newClient = hyprland.clients.find(client => client.address == address)

      if (ExclusiveWindow(newClient)) return
      const appClass = newClient.class
      const appClassLower = appClass.toLowerCase()
      let path = ''
      if (cachePath[appClassLower]) 
        path = cachePath[appClassLower]
      else {
        path = searchIcons(appClassLower, icon_files)
        cachePath[appClassLower] = path
      }
      if (path === '') 
        path = substitute(appClass)
      const newButton = AppButton({
        icon: path,
        tooltipText: `${newClient.title} (${appClass})`,
        onClicked: () => focus(newClient),
      })
      newButton.attribute.workspace = newClient.workspace.id
      box.attribute.map.set(address, newButton)
      box.children = Array.from(box.attribute.map.values())
      newButton.revealChild = true
    },
    remove(box, address) {
      if (!address) return

      const removedButton = box.attribute.map.get(address)
      if (!removedButton) return
      removedButton.revealChild = false

      Utils.timeout(options.transition, () => {
        removedButton.destroy()
        box.attribute.map.delete(address)
        box.children = Array.from(box.attribute.map.values())
      })
    },
  },
  setup(self) {
    self
      .hook(hyprland, (_, address) => self.attribute.add(self, address), 'client-added')
      .hook(hyprland, (_, address) => self.attribute.remove(self, address), 'client-removed')

    Utils.timeout(100, () => self.attribute.update(self))
  },
})
