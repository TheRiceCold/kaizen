import { Widget, App, Utils } from '../../imports.js'
const { Label, Icon, Box, Button } = Widget

export default app => {
  const title = Label({
    className: 'title',
    label: app.name,
    xalign: 0,
    vpack: 'center',
    truncate: 'end',
  })

  const description = Label({
    className: 'description',
    label: app.description || '',
    wrap: true,
    xalign: 0,
    justification: 'left',
    vpack: 'center',
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
