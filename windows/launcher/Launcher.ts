import { AppItem, QuickButton } from './AppItem'
import options from 'options'
import icons from 'data/icons'

const apps = await Service.import('applications')
const { width, margin, maxItem, favorites } = options.applauncher

const AppItem = app => Widget.Button({
  onClicked: () => {
    App.closeWindow('launcher')
    app.launch()
  },
  attribute: { app },
  child: Widget.Box({
    children: [
      Widget.Icon({
        size: 32,
        icon: app.icon_name || '',
        className: 'launcher-appmenu-appicon',
      }),
      Widget.Label({
        xalign: 0,
        vpack: 'center',
        truncate: 'end',
        label: app.name,
        className: 'launcher-appmenu-apptitle',
      }),
    ],
  }),
})

const SeparatedAppItem = (
  app: Parameters<typeof AppItem>[0]
) => Widget.Revealer(
  { attribute: { app } },
  Widget.Box(
    { vertical: true },
    Widget.Separator(),
    AppItem(app),
  ),
)

export default () => {
  const { query } = apps
  const applist = Variable(query(''))
  let first = applist.value[0]
  let applications = apps.query('').map(AppItem)

  const list = Widget.Box({
    vertical: true,
    children: applist.bind().as(list => list.map(SeparatedAppItem)),
  })

  list.hook(apps, () => applist.value = query(''), 'notify::frequents')

  // repopulate the box, so the most frequent apps are on top of the list
  function repopulate() {
    applications = apps.query('').map(AppItem)
    list.children = applications
  }

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
      children: favorites.bind().as(f => f.flatMap(fs => [
        Widget.Separator(),
        Widget.Box({
          className: 'quicklaunch horizontal',
          children: fs.map(f => query(f)?.[0]).filter(f => f).map(QuickButton)
        }),
      ]))
    }),
  })

  function focus() {
    entry.text = 'Search'
    entry.set_position(-1)
    entry.select_region(0, -1)
    entry.grab_focus()
    quicklaunch.reveal_child = true
  }

  return Widget.Box({
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
}
