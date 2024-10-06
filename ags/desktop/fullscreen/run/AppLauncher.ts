import { type RevealerProps } from 'types/widgets/revealer'
import { type Application } from 'types/service/applications'

import { VBox } from 'widgets'

import options from 'options'
import icons from 'data/icons'
import { launchApp, icon } from 'lib/utils'

const apps = await Service.import('applications')
const { Box, Button, Icon, Label, Revealer } = Widget

const { query } = apps
const { iconSize, max: appsMax } = options.run.apps

function AppItem(app: Application) {
  const title = Label({
    xalign: 0,
    hexpand: true,
    vpack: 'center',
    truncate: 'end',
    label: app.name,
    className: 'title',
  })

  const description = Label({
    xalign: 0,
    wrap: true,
    hexpand: true,
    vpack: 'center',
    maxWidthChars: 30,
    justification: 'left',
    className: 'description',
    label: app.description || '',
  })

  const appicon = Icon(icon(app.icon_name, icons.fallback.executable)).bind('size', iconSize)

  const textBox = VBox({
    vpack: 'center',
    children: app.description ? [title, description] : [title],
  })

  return Button({
    cursor: 'pointer',
    attribute: { app },
    className: 'app-item',
    onClicked() { App.closeWindow('run'); launchApp(app) },
  }, Box([appicon, textBox]))
}

export default () => {
  const applist = Variable(query(''))
  let first = applist.value[0]

  const SeparatedAppItem = (app: Application) => Revealer(
    { attribute: { app } },
    VBox([Widget.Separator(), AppItem(app)]),
  )

  const list = VBox({
    children: applist.bind().as((list: Application[]) => list.map(SeparatedAppItem))
  }).hook(apps, () => applist.value = query(''), 'notify::frequents')

  return Object.assign(list, {
    filter(text: string | null) {
      first = query(text || '')[0]
      list.children.reduce((i: number, item: RevealerProps) => {
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
