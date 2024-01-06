import { Widget, App, Utils } from '../../imports.js'
const { Label, Icon, Box, Button } = Widget

export default app => {
  const title = Label({
    xalign: 0,
    label: app.name,
    vpack: 'center',
    truncate: 'end',
    className: 'title',
  })

  const description = Label({
    xalign: 0,
    wrap: true,
    vpack: 'center',
    justification: 'left',
    className: 'description',
    label: app.description || '',
  })

  const icon = Icon({
    size: 52,
    icon: Utils.lookUpIcon(app.icon_name || '') ? app.icon_name || '' : '',
  })

  const textBox = Box({
    vertical: true,
    vpack: 'center',
    children: app.description ? [title, description] : [title],
  })

  return Button({
    className: 'app-item',
    attribute: app,
    child: Box({ children: [icon, textBox] }),
    onClicked: () => {
      App.closeWindow('launcher')
      app.launch()
    },
  })
}
