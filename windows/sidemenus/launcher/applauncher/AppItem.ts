import { type Application } from 'types/service/applications'
import { launchApp, icon } from 'lib/utils'
import options from 'options'
import icons from 'data/icons'

const { iconSize } = options.launcher

export default (app: Application) => {
  const title = Widget.Label({
    xalign: 0,
    hexpand: true,
    label: app.name,
    vpack: 'center',
    truncate: 'end',
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
    vpack: 'center',
    vertical: true,
    children: app.description ? [title, description] : [title],
  })

  return Widget.Button({
    attribute: { app },
    className: 'app-item',
    child: Widget.Box({ children: [ appicon, textBox ] }),
    onClicked: () => { App.closeWindow('launcher'); launchApp(app) },
  })
}
