import PopupWindow, { Padding } from '../PopupWindow'
import { AppItem, QuickButton } from './AppItem'
import icons from 'lib/icons'
import options from 'options'
import type Gtk from 'gi://Gtk?version=3.0'
import { launchApp } from 'lib/utils'

const apps = await Service.import('applications')
const { query } = apps
const { width, margin, maxItem, favorites } = options.applauncher

const SeparatedAppItem = (app: Parameters<typeof AppItem>[0]) => Widget.Revealer(
  { attribute: { app } },
  Widget.Box<Gtk.Widget>(
    { vertical: true },
    Widget.Separator(),
    AppItem(app),
  ),
)

const Applauncher = () => {
  const applist = Variable(query(''))
  let first = applist.value[0]

  const list = Widget.Box({
    vertical: true,
    children: applist.bind().as(list => list.map(SeparatedAppItem)),
  })

  list.hook(apps, () => applist.value = query(''), 'notify::frequents')

  const entry = Widget.Entry({
    hexpand: true,
    primaryIconName: icons.ui.search,
    onAccept: () => {
      entry.text !== '' && launchApp(first)
      App.toggleWindow('applauncher')
    },
    onChange: ({ text }) => {
      first = query(text || '')[0]
      list.children.reduce((i, item) => {
        if (!text || i >= maxItem.value) {
          item.reveal_child = false
          return i
        }
        if (item.attribute.app.match(text)) {
          item.reveal_child = true
          return ++i
        }
        item.reveal_child = false
        return i
      }, 0)
    },
  })

  const quicklaunch = Widget.Revealer({
    setup: self => self.hook(entry, () => self.reveal_child = !entry.text, 'notify::text'),
    visible: favorites.bind().as(f => f.length > 0),
    child: Widget.Box({
      vertical: true,
      children: [
        Widget.Separator(),
        Widget.Box({
          className: 'quicklaunch horizontal',
          children: favorites.bind().as(f => f
            .map(f => query(f)?.[0])
            .filter(f => f)
            .map(QuickButton),
          ),
        }),
      ],
    }),
  })

  function focus() {
    entry.text = 'Search'
    entry.set_position(-1)
    entry.select_region(0, -1)
    entry.grab_focus()
    quicklaunch.reveal_child = true
  }

  const layout = Widget.Box({
    vpack: 'start',
    vertical: true,
    className: 'applauncher',
    css: width.bind().as(v => `min-width: ${v}pt;`),
    setup: self => self.hook(App, (_, win, visible) => {
      if (win !== 'applauncher') return

      entry.text = ''
      if (visible) focus()
    }),
    children: [ entry, quicklaunch, list ],
  })

  return Widget.Box<Gtk.Widget>(
    { vertical: true, css: 'padding: 1px;' },
    Padding('applauncher', {
      vexpand: false,
      css: margin.bind().as(v => `min-height: ${v}pt;`),
    }),
    layout,
  )
}

export default PopupWindow({
  layout: 'top',
  name: 'applauncher',
  child: Applauncher(),
})