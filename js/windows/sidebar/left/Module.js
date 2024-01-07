import { Widget } from '../../../imports.js'

export const SidebarModule = ({ name }) => Widget.Box({
  className: 'sidebar-module',
  vertical: true,
  children: [
    Widget.Button({
      child: Widget.Box({
        children: [
          Widget.Label({ className: 'txt-small txt', label: `${name}` }),
          Widget.Box({ hexpand: true }),
          Widget.Label({ className: 'sidebar-module-btn-arrow' })
        ]
      })
    })
  ]
});
