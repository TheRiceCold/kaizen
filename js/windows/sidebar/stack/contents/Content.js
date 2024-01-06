import { Widget } from '../../../../imports.js'
import { FontIcon } from '../../../../misc/main.js'

const Content = ({
  icon, 
  title, 
  content, 
  headerChild = Widget.Box()
}) => Widget.Box({
  children: [
    Widget.Box({
      vertical: true,
      className: 'qs-menu',
      children: [
        Widget.Box({
          className: 'qs-title',
          children: [
            FontIcon(icon),
            Widget.Label(title),
            Widget.Box({ hexpand: true }),
            headerChild
          ],
        }),
        Widget.Separator(),
        Widget.Box({
          className: 'qs-content',
          children: [content],
        }),
      ],
    })
  ],
})

export default content => Widget.Scrollable({
  vexpand: true,
  hscroll: 'never',
  className: 'qs-page',
  child: Content(content),
})

