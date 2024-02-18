import { services } from '../../constants/main.js'
import AppItem from './AppItem.js'

export default windowName => {
  const apps = [
    ...services.Applications.query('').flatMap(app => Widget.Revealer({
      setup: w => w.attribute = { app, revealer: w },
      child: Widget.Box({ vertical: true, children: [AppItem(app, windowName)] }),
    })),
  ]

  const List = Widget.Box({
    vertical: true,
    children: apps,
    className: 'app-list',
  })

  const Entry = Widget.Entry({
    text: '',
    hexpand: true,
    onAccept: ({ text }) => {
      const app = services.Applications.query(text || '')[0]
      if (app) {
        Utils.execAsync(['hyprctl', 'dispatch', 'exec', `sh -c ${app.executable}`])
        app.frequency += 1
      }
    },
    onChange: ({ text }) => apps.map(item => {
      if (item.attribute) {
        const { app, revealer } = item.attribute
        revealer.reveal_child = app.match(text)
      }
    }),
  })

  return Widget.Box({
    vertical: true,
    children: [
      Entry,
      Widget.Scrollable({ hscroll: 'never', child: List }),
    ],
    setup: self => self.hook(App, (_, win, visible) => {
      if (win !== windowName) return

      Entry.text = '-'
      Entry.text = ''
      if (visible) Entry.grab_focus()
      else List.children = apps
    }),
  })
}
