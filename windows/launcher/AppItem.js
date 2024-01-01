import { Widget, App, Utils } from '../../imports.js'

export default app => {
  const title = Widget.Label({
    className: 'title',
    label: app.name,
    xalign: 0,
    vpack: 'center',
    truncate: 'end',
  })

  const description = Widget.Label({
    className: 'description',
    label: app.description || '',
    wrap: true,
    xalign: 0,
    justification: 'left',
    vpack: 'center',
  })

  const icon = Widget.Icon({
    size: 52,
    icon: Utils.lookUpIcon(app.icon_name || '') ? app.icon_name || '' : '',
  })

  const textBox = Widget.Box({
    vertical: true,
    vpack: 'center',
    children: app.description ? [title, description] : [title],
  })

  return Widget.Button({
    className: 'app-item',
    attribute: app,
    child: Widget.Box({ children: [icon, textBox] }),
    onClicked: () => {
      App.closeWindow('launcher')
      app.launch()
    },
  })
}
