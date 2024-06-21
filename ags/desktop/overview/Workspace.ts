import Window from './Window'

import options from 'options'

const { Gdk, Gtk } = imports.gi
const { workspaces } = options.overview

const hyprland = await Service.import('hyprland')
const scale = (size: number) => (workspaces.scale.value / 100) * size
const dispatch = (args: string) => hyprland.messageAsync('dispatch '+args)
const TARGET = [Gtk.TargetEntry.new('text/plain', Gtk.TargetFlags.SAME_APP, 0)]

export default (id: number) => {
  const fixed = Widget.Fixed()

  function size (id: number) {
    const def = { h: 1080, w: 1920 }
    const ws = hyprland.getWorkspace(id)
    if (!ws) return def

    const mon = hyprland.getMonitor(ws.monitorID)
    return mon ? { h: mon.height, w: mon.width } : def
  }

  async function update() {
    const json = await hyprland.messageAsync('j/clients').catch(() => null)
    if (!json) return

    fixed.get_children().forEach(ch => ch.destroy())
    const clients = JSON.parse(json) as typeof hyprland.clients
    clients
      .filter(({ workspace }) => workspace.id === id)
      .forEach(c => {
        const x = c.at[0] - (hyprland.getMonitor(c.monitor)?.x || 0)
        const y = c.at[1] - (hyprland.getMonitor(c.monitor)?.y || 0)
        c.mapped && fixed.put(Window(c), scale(x), scale(y))
      })
    fixed.show_all()
  }

  return Widget.Box({
    vpack: 'center',
    className: 'workspace',
    css: workspaces.scale.bind().as(v => `
      min-width: ${(v / 100) * size(id).w}px;
      min-height: ${(v / 100) * size(id).h}px;
    `),
    setup(self) {
      self.hook(options.workspaces.scale, update)
      self.hook(hyprland, update, 'notify::clients')
      self.hook(hyprland.active.client, update)
      self.hook(hyprland.active.workspace, () => self.toggleClassName('active', hyprland.active.workspace.id === id))
    },
    child: Widget.EventBox({
      expand: true,
      onPrimaryClick() {
        App.closeWindow('overview')
        dispatch('workspace '+id)
      },
      setup(self) {
        self.drag_dest_set(Gtk.DestDefaults.ALL, TARGET, Gdk.DragAction.COPY)
        self.connect('drag-data-received', (_w, _c, _x, _y, data) => {
          const address = new TextDecoder().decode(data.get_data())
          dispatch(`movetoworkspacesilent ${id},address:${address}`)
        })
      },
      child: fixed,
    }),
  })
}
