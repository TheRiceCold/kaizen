import { VBox } from 'widgets'

import options from 'options'
import icons from 'data/icons'
import { launchApp, setIcon, capitalize } from 'lib/utils'

const applications = await Service.import('applications')

const { apps } = options.dashboard
const { Box, Button, Icon, Label, Scrollable } = Widget

function AppButton(app: string) {
  const appName = app.includes(':') ? app.split(':') : app

  const iconName = Array.isArray(appName) ? appName[1] : appName
  const appQuery = applications.query(
    Array.isArray(appName) ? appName[0] : appName,
  )?.[0]

  return Button({
    cursor: 'pointer',
    onClicked() {
      App.closeWindow('dashboard')
      launchApp(appQuery)
    },
    child: VBox([
      Icon(setIcon(iconName, icons.fallback.executable)),
      Label({
        wrap: true,
        maxWidthChars: 8,
        justification: 'center',
        label: capitalize(Array.isArray(appName) ? appName[0] : appName),
      }),
    ]),
  })
}

export default Box({
  className: 'apps',
  visible: apps.bind().as((a: string[][]) => a.length < 0),
  children: apps.bind().as((a: string[][]) =>
    a.map((column: string[]) =>
      Scrollable({
        hscroll: 'never',
        className: 'column',
        vscroll: 'automatic',
        child: VBox(column.map(AppButton)),
      }),
    ),
  ),
})
