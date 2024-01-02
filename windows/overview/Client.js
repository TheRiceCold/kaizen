import { Widget, App, Hyprland } from '../../imports.js'
import { createSurfaceFromWidget, substitute } from '../../utils.js'
import options from '../../options.js'

const SCALE = 0.08
const { Gdk, Gtk } = imports.gi
const TARGET = [Gtk.TargetEntry.new('text/plain', Gtk.TargetFlags.SAME_APP, 0)]

/** @param {string} args */
const dispatch = args => Hyprland.sendMessage(`dispatch ${args}`)

/** @param {string} str */
const icon = str => substitute(options.substitutions.icons, str)

export default ({ address, size: [w, h], class: c, title }) => Widget.Button({
  className: 'client',
  tooltip_text: `${title}`,
  child: Widget.Icon({
    css: `
      min-width: ${w * SCALE}px;
      min-height: ${h * SCALE}px;
    `,
    icon: icon(c),
  }),
  onSecondaryClick: () => dispatch(`closewindow address:${address}`),
  onClicked: () => dispatch(`focuswindow address:${address}`).then(() => App.closeWindow('overview')),

  setup: btn => {
    btn.drag_source_set(Gdk.ModifierType.BUTTON1_MASK, TARGET, Gdk.DragAction.COPY)
    btn.connect('drag-data-get', (_w, _c, data) => data.set_text(address, address.length))
    btn.connect('drag-begin', (_, context) => {
      Gtk.drag_set_icon_surface(context, createSurfaceFromWidget(btn))
      btn.toggleClassName('hidden', true)
    })
    btn.connect('drag-end', () => btn.toggleClassName('hidden', false))
  },
})
