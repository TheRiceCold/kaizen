import { type Application } from 'types/service/applications'
import options from 'options'
import { launchApp, icon } from 'lib/utils'
import { setupCursorHover } from 'lib/cursorhover'
import icons from 'lib/icons'

const { iconSize } = options.applauncher

export const QuickButton = (app: Application) => Widget.Button({
  hexpand: true,
  tooltipText: app.name,
  setup: setupCursorHover,
  onClicked: () => {
    App.closeWindow('applauncher')
    launchApp(app)
  },
  child: Widget.Icon({
    size: iconSize.bind(),
    icon: icon(app.icon_name, icons.fallback.executable),
  }),
})

export const AppItem = (app: Application) => {
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
    setup: setupCursorHover,
    child: Widget.Box({ children: [ appicon, textBox ] }),
    onClicked: () => { App.closeWindow('applauncher'); launchApp(app); },
  })
}
