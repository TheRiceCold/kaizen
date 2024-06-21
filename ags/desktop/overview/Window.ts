import { type Client } from 'types/service/hyprland'

import options from 'options'
import icons from 'data/icons'
import { createSurfaceFromWidget, icon } from 'lib/utils'

const { Gdk, Gtk } = imports.gi

const { monochromeIcon, scale } = options.workspaces
const TARGET = [Gtk.TargetEntry.new('text/plain', Gtk.TargetFlags.SAME_APP, 0)]
const hyprland = await Service.import('hyprland')
const apps = await Service.import('applications')
const dispatch = (args: string) => hyprland.messageAsync(`dispatch ${args}`)

export default ({ address, size: [w, h], class: c, title }: Client) => Widget.Button({
  className: 'client',
  attribute: { address },
  tooltip_text: `${title}`,
  child: Widget.Icon({
    css: scale.bind().as(v => `
      min-width: ${(v / 100) * w}px;
      min-height: ${(v / 100) * h}px;
    `),
    icon: monochromeIcon.bind().as(m => {
      const app = apps.list.find(app => app.match(c))
      if (!app)
        return icons.fallback.executable + (m ? '-symbolic' : '')

      return icon(
        app.icon_name + (m ? '-symbolic' : ''),
        icons.fallback.executable + (m ? '-symbolic' : ''),
      )
    }),
  }),
  onSecondaryClick() { dispatch(`closewindow address:${address}`) },
  onClicked() {
    dispatch(`focuswindow address:${address}`)
    App.closeWindow('overview')
  },
  setup: btn => btn
    .on('drag-data-get', (_w, _c, data) => data.set_text(address, address.length))
    .on('drag-begin', (_, context) => {
      Gtk.drag_set_icon_surface(context, createSurfaceFromWidget(btn))
      btn.toggleClassName('hidden', true)
    })
    .on('drag-end', () => btn.toggleClassName('hidden', false))
    .drag_source_set(Gdk.ModifierType.BUTTON1_MASK, TARGET, Gdk.DragAction.COPY),
})
