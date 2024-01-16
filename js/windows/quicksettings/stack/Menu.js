import { Widget } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'

export default ({title, icon, content, headerChild = Widget.Box()}) => Widget.Box({
  children: [
    Widget.Box({
      className: 'qs-menu',
      vertical: true,
      children: [
        Widget.Box({
          class_name: 'qs-title',
          spacing: 5,
          children: [
            // FontIcon(icon),
            Widget.Label(title),
            Widget.Box({hexpand: true}),
            headerChild
          ],
        }),
        Widget.Separator(),
        Widget.Box({ className: 'qs-content', children: [content] }),
      ],
    })
  ],
})
