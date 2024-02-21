import { type Client } from 'types/service/hyprland'
import { createSurfaceFromWidget, icon } from 'lib/utils'
import Gdk from 'gi://Gdk'
import Gtk from 'gi://Gtk?version=3.0'
import options from 'options'
import icons from 'lib/icons'

const monochrome = options.overview.monochromeIcon
const TARGET = [Gtk.TargetEntry.new('text/plain', Gtk.TargetFlags.SAME_APP, 0)]
const scale = (size: number) => (options.overview.scale.value / 100) * size
const hyprland = await Service.import('hyprland')
const apps = await Service.import('applications')
const dispatch = (args: string) => hyprland.messageAsync(`dispatch ${args}`)

export default ({ address, size: [w, h], class: c, title }: Client) => Widget.Button({
  className: 'client',
  attribute: { address },
  tooltipText: `${title}`,
  child: Widget.Icon({
    css: ` min-width: ${scale(w)}px; min-height: ${scale(h)}px;`,
    icon: monochrome.bind().as(m => {
      const app = apps.list.find(app => app.match(c))
      if (!app) return icons.fallback.executable

      return icon(
        app.icon_name + (m ? '-symbolic' : ''),
        icons.fallback.executable,
      )
    }),
  }),
  onSecondaryClick: () => dispatch(`closewindow address:${address}`),
  onClicked: () => {
    dispatch(`focuswindow address:${address}`)
    App.closeWindow('overview')
  },
  setup: btn => btn.on(
      'drag-data-get',
      (_w, _c, data) => data.set_text(address, address.length)
    ).on('drag-begin', (_, context) => {
      Gtk.drag_set_icon_surface(context, createSurfaceFromWidget(btn))
      btn.toggleClassName('hidden', true)
    }).on('drag-end', () => btn.toggleClassName('hidden', false))
    .drag_source_set(Gdk.ModifierType.BUTTON1_MASK, TARGET, Gdk.DragAction.COPY),
})
