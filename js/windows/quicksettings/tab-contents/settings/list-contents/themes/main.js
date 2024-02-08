import Header from '../header.js'
import FontIcon from '../../../../../../misc/FontIcon.js'
import { themes } from '../../../../../../constants/main.js'
import { setTheme } from '../../../../../../settings/theme.js'

const List = Widget.Box({
  vertical: true,
  children: themes.map(({ name, icon }) => Widget.Button({
    className: '',
    onClicked: () => setTheme(name),
    child: Widget.Box({
      children: [
        FontIcon(icon),
        Widget.Label(name)
      ]
    })
  }))
})

export default {
  icon: '',
  name: 'themes',
  list: Widget.Box({
    vexpand: true,
    vertical: true,
    children: [ Header('Theme Selector'), List ],
    className: 'notification-list spacing-v-5',
  })
}
