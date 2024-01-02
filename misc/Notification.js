import { Widget, Utils } from '../imports.js'
import FontIcon from './FontIcon.js'

const NotificationIcon = ({ app_entry, app_icon, image }) => {
  if (image) {
    return Widget.Box({
      vpack: 'start',
      hexpand: false,
      className: 'icon img',
      css: `
        background-image: url("${image}");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        min-width: 78px;
        min-height: 78px;
      `,
    })
  }

  let icon = 'dialog-information-symbolic'
  if (Utils.lookUpIcon(app_icon)) icon = app_icon
  if (Utils.lookUpIcon(app_entry || '')) icon = app_entry || ''

  return Widget.Box({
    vpack: 'start',
    hexpand: false,
    className: 'icon',
    css: `
      min-width: 78px;
      min-height: 78px;
    `,
    child: Widget.Icon({
      icon,
      size: 58,
      hexpand: true,
      vexpand: true,
      hpack: 'center', 
      vpack: 'center', 
    }),
  })
}

export default notification => {
  const content = Widget.Box({
    className: 'content',
    children: [
      NotificationIcon(notification),
      Widget.Box({
        hexpand: true,
        vertical: true,
        children: [
          Widget.Box({
            children: [
              Widget.Label({
                className: 'title',
                xalign: 0,
                justification: 'left',
                hexpand: true,
                max_width_chars: 24,
                truncate: 'end',
                wrap: true,
                label: notification.summary,
                use_markup: true,
              }),
              Widget.Label({
                className: 'time',
                vpack: 'start',
                label: imports.gi.GLib.DateTime.new_from_unix_local(notification.time).format('%H:%M'),
              }),
              Widget.Button({
                className: 'close-button',
                vpack: 'start',
                child: FontIcon('window-close-symbolic'),
                onClicked: () => notification.close(),
              }),
            ],
          }),
          Widget.Label({
            className: 'description',
            hexpand: true,
            use_markup: true,
            xalign: 0,
            justification: 'left',
            label: notification.body,
            wrap: true,
          }),
        ],
      }),
    ],
  })

  const actionsbox = Widget.Revealer({
    transition: 'slide_down',
    child: Widget.EventBox({
      child: Widget.Box({
        className: 'actions horizontal',
        children: notification.actions.map(action => Widget.Button({
          hexpand: true,
          className: 'action-button',
          child: Widget.Label(action.label),
          onClicked: () => notification.invoke(action.id),
        })),
      }),
    }),
  })

  return Widget.EventBox({
    className: `notification ${notification.urgency}`,
    vexpand: false,
    onPrimaryClick: () => notification.dismiss(),
    onHover() { actionsbox.reveal_child = true },
    onHoverLost() {
      actionsbox.reveal_child = true
      notification.dismiss()
    },
    child: Widget.Box({
      vertical: true,
      children: [
        content,
        notification.actions.length > 0 && actionsbox,
      ],
    }),
  })
}
