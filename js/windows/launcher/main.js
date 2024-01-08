import { Widget, Utils, App, Applications } from '../../imports.js'
import { PopupWindow } from '../../misc/main.js'
import AppItem from './AppItem.js'

const WINDOW_NAME = 'launcher'

function launchApp(app) {
  Utils.execAsync(['hyprctl', 'dispatch', 'exec', `sh -c ${app.executable}`])
  app.frequency += 1
}

function Launcher() {
  const items = [
    ...Applications.query('').flatMap(app => Widget.Revealer({
      setup: w => w.attribute = { app, revealer: w },
      child: Widget.Box({ vertical: true, children: [AppItem(app)] }),
    })),
  ]

  const list = Widget.Box({ vertical: true, children: items })

  const entry = Widget.Entry({
    text: '-',
    hexpand: true,
    onAccept: ({ text }) => {
      const list = Applications.query(text || '')
      if (list[0]) {
        App.toggleWindow(WINDOW_NAME)
        launchApp(list[0])
      }
    },
    onChange: ({ text }) => items.map(item => {
      if (item.attribute) {
        const { app, revealer } = item.attribute
        revealer.reveal_child = app.match(text)
      }
    }),
  })

  return Widget.Box({
    vertical: true,
    children: [
      entry,
      Widget.Scrollable({ hscroll: 'never', child: list }),
    ],
    setup: self => self.hook(App, (_, win, visible) => {
      if (win !== WINDOW_NAME) return

      entry.text = '-'
      entry.text = ''
      if (visible) entry.grab_focus()
      else list.children = items
    }),
  })
}

export default PopupWindow({ name: WINDOW_NAME, child: Launcher() })
