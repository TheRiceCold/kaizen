import { Widget, Utils, App } from '../../imports.js'

export default (app, windowName) => {
  const title = Widget.Label({
    xalign: 0,
    label: app.name,
    vpack: 'center',
    truncate: 'end',
    className: 'title',
  })

  const description = Widget.Label({
    xalign: 0,
    wrap: true,
    vpack: 'center',
    justification: 'left',
    className: 'description',
    label: app.description || '',
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
    attribute: app,
    className: 'app-item',
    child: Widget.Box({ children: [icon, textBox] }),
    onClicked: () => {
      app.launch()
      App.closeWindow(windowName)
    }
  })
}
