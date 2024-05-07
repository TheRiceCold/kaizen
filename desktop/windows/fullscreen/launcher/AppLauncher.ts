import { type Application } from 'types/service/applications'
import { launchApp, icon } from 'lib/utils'

import options from 'options'
import icons from 'data/icons'
import { setupCursorHover } from 'misc/cursorhover'

const apps = await Service.import('applications')
const { query } = apps
const { iconSize, favorites, max: appsMax } = options.launcher.apps

const QuickAppButton = (app: Application) => Widget.Button({
  hexpand: true,
  tooltipText: app.name,
  onClicked() {
    App.closeWindow('launcher')
    launchApp(app)
  },
  child: Widget.Icon({
    size: iconSize.bind(),
    icon: icon(app.icon_name, icons.fallback.executable),
  }),
})

function AppItem(app: Application) {
  const title = Widget.Label({
    xalign: 0,
    hexpand: true,
    vpack: 'center',
    truncate: 'end',
    label: app.name,
    className: 'title',
  })

  const description = Widget.Label({
    xalign: 0,
    wrap: true,
    hexpand: true,
    vpack: 'center',
    maxWidthChars: 30,
    justification: 'left',
    className: 'description',
    label: app.description || '',
  })

  const appicon = Widget.Icon({
    size: iconSize.bind(),
    icon: icon(app.icon_name, icons.fallback.executable),
  })

  const textBox = Widget.Box({
    vertical: true,
    vpack: 'center',
    children: app.description ? [title, description] : [title],
  })

  return Widget.Button({
    attribute: { app },
    className: 'app-item',
    setup: setupCursorHover,
    child: Widget.Box([appicon, textBox]),
    onClicked() {
      App.closeWindow('launcher')
      launchApp(app)
    },
  })
}

export const Favorites = () => Widget.Revealer({
  visible: favorites.bind().as(f => f.length > 0),
  child: Widget.Box({
    vertical: true,
    children: favorites.bind().as(favs => favs.flatMap(fs => [
      Widget.Separator(),
      Widget.Box({
        className: 'quicklaunch horizontal',
        children: fs.map(f => query(f)?.[0]).map(QuickAppButton),
      }) 
    ])),
  }),
})

export function Launcher() {
  const applist = Variable(query(''))
  let first = applist.value[0]

  const SeparatedAppItem = (app: Application) => Widget.Revealer(
    { attribute: { app } },
    Widget.Box({ vertical: true }, Widget.Separator(), AppItem(app)),
  )

  const list = Widget.Box({
    vertical: true,
    children: applist.bind().as(list => list.map(SeparatedAppItem))
  }).hook(apps, () => applist.value = query(''), 'notify::frequents')

  return Object.assign(list, {
    filter(text: string | null) {
      first = query(text || '')[0]
      list.children.reduce((i, item) => {
        if (!text || i >= appsMax.value) {
          item.revealChild = false
          return i
        }
        if (item.attribute.app.match(text)) {
          item.revealChild = true
          return ++i
        }
        item.revealChild = false
        return i
      }, 0)
    },
    launchFirst() { launchApp(first) },
  })
}
