import { type ButtonProps } from 'types/widgets/button'
import { type Client } from 'types/service/hyprland'

import options from 'options'
import icons from 'data/icons'
import { createSurfaceFromWidget, icon } from 'lib/utils'

const { Gdk, Gtk } = imports.gi
const { scale } = options.workspaces

const hyprland = await Service.import('hyprland')
const apps = await Service.import('applications')

const dispatch = (args: string) => hyprland.messageAsync(`dispatch ${args}`)
const TARGET = [Gtk.TargetEntry.new('text/plain', Gtk.TargetFlags.SAME_APP, 0)]

export default ({ address, size: [w, h], class: c, title }: Client) => Widget.Button({
  className: 'client',
  tooltipText: `${title}`,
  onSecondaryClick() {
    dispatch('closewindow address:'+address) },
  onClicked() {
    dispatch('focuswindow address:'+address)
    App.closeWindow('overview')
  },
  setup: (self: ButtonProps) => self
    .on('drag-data-get', (_w, _c, data) => data.set_text(address, address.length))
    .on('drag-begin', (_, context) => {
      Gtk.drag_set_icon_surface(context, createSurfaceFromWidget(self))
      self.toggleClassName('hidden', true)
    })
    .on('drag-end', () => self.toggleClassName('hidden', false))
    .drag_source_set(Gdk.ModifierType.BUTTON1_MASK, TARGET, Gdk.DragAction.COPY)
}, Widget.Icon({
  css: scale.bind().as((s: number) => `
    font-size: ${s * 0.2}rem;
    min-width: ${s * 0.01 * w}px;
    min-height: ${s * 0.01 * h}px;
  `),
  icon: icon(apps.list.find(app => app.match(c)).icon_name, icons.fallback.executable),
}))
