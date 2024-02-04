import { FontIcon } from '../../../../misc/main.js'
import { themes } from '../../../../constants/main.js'
import { setTheme } from '../../../../settings/theme.js'
import { setupCursorHover } from '../../../../misc/CursorHover.js'

const Title = Widget.Box({
  vpack: 'start',
  className: 'txt spacing-h-5',
  children: [
    Widget.Label({
      xalign: 0,
      hexpand: true,
      label: 'Themes',
      className: 'txt-title-small margin-left-10',
    })
  ]
})

const Content = Widget.Box({ 
  hexpand: true, 
  vertical: true ,
  children: themes.map(theme => Widget.Button({
    hexpand: false,
    setup: setupCursorHover,
    onClicked: () => setTheme(theme.name),
    child: Widget.Box({
      className: 'spacing-h-5',
      children: [
        FontIcon(theme.icon),
        Widget.Label({ label: theme.name })
      ],
    }),
  }))
})

export default Widget.Box({
  vexpand: true,
  vertical: true,
  className: 'spacing-v-5',
  children: [ Title, Content ],
})
