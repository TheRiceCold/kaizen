import options from 'options'
import icons from 'data/icons'
import { launchApp, icon, capitalize } from 'lib/utils'

const applications = await Service.import('applications')

function AppButton(a) {
  const isObj = typeof a === 'object'
  const app = applications.query(isObj ? a.name : a)?.[0]
  const iconName = isObj && ('icon' in a) ? a.icon : app.icon_name

  return Widget.Button({
    cursor: 'pointer',
    onClicked() {
      App.closeWindow('dashboard')
      launchApp(app)
    },
  }, Widget.Box(
    { vertical: true },
    Widget.Icon(icon(iconName, icons.fallback.executable)),
    Widget.Label({
      wrap: true,
      maxWidthChars: 8,
      justification: 'center',
      label: capitalize(isObj ? a.label: a)
    })
  ))
}

const Column = apps => Widget.Scrollable({
  hscroll: 'never',
  className: 'column',
  vscroll: 'automatic',
}, Widget.Box({ vertical: true, children: apps.map(AppButton) }))

export default Widget.Box({
  className: 'apps',
  children: options.dashboard.apps.bind().as(apps => apps.map(Column)),
})
