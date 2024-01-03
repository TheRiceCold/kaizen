import { Widget, Utils, App, Applications } from '../../imports.js'
import { PopupWindow } from '../../misc/main.js'
import AppItem from './AppItem.js'

const WINDOW_NAME = 'launcher'

function launchApp(app) {
  Utils.execAsync(['hyprctl', 'dispatch', 'exec', `sh -c ${app.executable}`])
  app.frequency += 1
}

function Launcher() {
  const mkItems = () => [
    Widget.Separator({ hexpand: true }),
    ...Applications.query('').flatMap(app => Widget.Revealer({
      setup: w => w.attribute = { app, revealer: w },
      child: Widget.Box({
        vertical: true,
        children: [ AppItem(app) ],
      }),
    })),
    Widget.Separator({ hexpand: true }),
  ]

  let items = mkItems()
  const list = Widget.Box({ vertical: true, children: items })

  const entry = Widget.Entry({
    hexpand: true,
    // placeholder_text: 'Search Apps',
    // primary_icon_name: 'folder-saved-search-symbolic',
    // set some text so on-change works the first time
    text: '-',
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
      else {
        items = mkItems()
        list.children = items
      }
    }),
  })
}

export default PopupWindow({ name: WINDOW_NAME, child: Launcher() })
