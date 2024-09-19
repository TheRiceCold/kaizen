import { VBox } from 'widgets'

import options from 'options'
import icons from 'data/icons'
import { launchApp, icon, capitalize } from 'lib/utils'

const { Box, Button, Icon, Label, Scrollable } = Widget
const applications = await Service.import('applications')

function AppButton(a) {
  const isObj = typeof a === 'object'
  const app = applications.query(isObj ? a.name : a)?.[0]
  const iconName = isObj && ('icon' in a) ? a.icon : app.icon_name

  return Button({
    cursor: 'pointer',
    onClicked() {
      App.closeWindow('dashboard')
      launchApp(app)
    },
  }, VBox([
    Icon(icon(iconName, icons.fallback.executable)),
    Label({
      wrap: true,
      maxWidthChars: 8,
      justification: 'center',
      label: capitalize(isObj ? a.label : a)
    })
  ]))
}

const Column = apps => Scrollable({
  hscroll: 'never',
  className: 'column',
  vscroll: 'automatic',
}, VBox(apps.map(AppButton)))

export default Box({
  className: 'apps',
  children: options.dashboard.apps.bind().as(apps => apps.map(Column)),
})
