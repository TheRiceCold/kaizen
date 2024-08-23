import options from 'options'
import icons from 'data/icons'
import { launchApp, icon, capitalize } from 'lib/utils'

const applications = await Service.import('applications')

function AppButton(app) {

  const iconName = isObj && ('icon' in a) ? a.icon : app.icon_name

  return Widget.Button({
    cursor: 'pointer',
    onClicked() {
      App.closeWindow('dashboard')
      launchApp(app)
    },
    child: Widget.Box(
      { vertical: true },
      Widget.Icon(icon(iconName, icons.fallback.executable)),
      Widget.Label({
        wrap: true,
        maxWidthChars: 8,
        justification: 'center',
        label: capitalize(isObj ? a.label : a)
      })
    ),
  })
}

const Column = apps => Widget.Scrollable({
  hscroll: 'never',
  className: 'column',
  vscroll: 'automatic',
  child: Widget.Box({
    vertical: true,
    children: apps.map(app => applications.query(app)?.[0])
      .filter(app => app)
      .map(AppButton)
  })
})

export default Widget.Box({
  className: 'apps',
  children: options.dashboard.apps.bind().as(apps => apps.map(Column)),
})
