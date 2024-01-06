import { Utils, Widget } from '../../imports.js'

const { Gtk } = imports.gi
const { Box, Icon, Label } = Widget
const { timeout, lookUpIcon } = Utils

const messageTypes = [
  { label: 'recording', icon: '󰕧' },
  { label: 'power', icon: 'power' },
  { label: 'battery', icon: 'battery', },
  { label: 'screenshot', icon:  '󰹑' },
  { label: 'welcome', icon: '󱠡' },
  { label: 'time', icon: 'scheduleb' },
  { label: 'installed', icon: '' },
  { label: 'update', icon: '󰚰' },
  { label: 'file', icon: '' }
]

function getIconType(notification) {
  const message = notification.summary.toLowerCase()
  if (notification.urgency === 'critical') return '󰀦'
  else for (let i = 0; i < messageTypes.length; i++)
    return message.includes(messageTypes[i].label) 
      ? messageTypes[i].icon : message.startsWith('file') ? '' : '󰂚'
}

const Content = (notification, icon) => Box({
  hexpand: false,
  vpack: 'center',
  homogeneous: true,
  className: `notif-icon notif-icon-material-${notification.urgency}`,
  children: [(icon !== 'NO_ICON' ?
    Icon({
      icon: icon,
      vpack: 'center',
      setup: self => timeout(1, () => {
        const { NORMAL } = Gtk.StateFlags
        const { get_property } = self.get_parent().get_style_context()

        const width = get_property('min-width', NORMAL)
        const height = get_property('min-height', NORMAL)
        self.size = Math.max(width * 0.7, height * 0.7, 1)
      }),
    }) : Label({
      hexpand: true,
      className: 'txt-hugerass',
      label: getIconType(notification), 
    })
  )]
})

export default notification => {
  const { image, appIcon, appEntry } = notification

  if (notification.image) {
    return Box({
      hexpand: false,
      className: 'notif-icon',
      valign: Gtk.Align.CENTER,
      css: `
        background-image: url("${image}");
        background-size: auto 100%;
        background-repeat: no-repeat;
        background-position: center;
      `,
    })
  }

  const icon = lookUpIcon(appIcon) ? appIcon : lookUpIcon(appEntry) ? appEntry : 'NO_ICON'

  return Content(notification, icon)
}
