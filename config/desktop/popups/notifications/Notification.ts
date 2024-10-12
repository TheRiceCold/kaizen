import { type Notification } from 'types/service/notifications'
import { ButtonLabel, ButtonIcon, VBox } from 'widgets'
import icons from 'data/icons'

const time = (time: number, format = '%H:%M') => imports.gi.GLib.DateTime.new_from_unix_local(time).format(format)

const NotificationIcon = ({ app_entry, app_icon, image }: Notification) => {
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
        min-height: 78px;`,
    })
  }

  let icon = icons.fallback.notification
  if (Utils.lookUpIcon(app_icon))
    icon = app_icon

  if (Utils.lookUpIcon(app_entry || ''))
    icon = app_entry || ''

  return Widget.Box({
    vpack: 'start',
    hexpand: false,
    className: 'icon',
    css: 'min-width: 78px; min-height: 78px;',
  }, Widget.Icon({
    icon, size: 58,
    hpack: 'center', hexpand: true,
    vpack: 'center', vexpand: true,
  }))
}

export default (notification: Notification) => {
  const content = Widget.Box({
    className: 'content',
    children: [
      NotificationIcon(notification),
      VBox({ hexpand: true },
        Widget.Box([
          Widget.Label({
            xalign: 0,
            wrap: true,
            hexpand: true,
            truncate: 'end',
            use_markup: true,
            maxWidthChars: 24,
            className: 'title',
            justification: 'left',
            label: notification.summary.trim(),
          }),
          Widget.Label({
            vpack: 'start',
            className: 'time',
            label: time(notification.time),
          }),
          ButtonIcon(
            'window-close-symbolic',
            notification.close,
            { vpack: 'start', className: 'close-button' }),
        ]),
        Widget.Label({
          xalign: 0,
          wrap: true,
          hexpand: true,
          use_markup: true,
          maxWidthChars: 24,
          justification: 'left',
          className: 'description',
          label: notification.body.trim(),
        }),
      ),
    ],
  })

  const actionsbox = notification.actions.length > 0 ? Widget.Revealer(
    { transition: 'slide_down' },
    Widget.EventBox({
      child: Widget.Box({
        className: 'actions horizontal',
        children: notification.actions.map(action => ButtonLabel(
          action.label,
          () => notification.invoke(action.id),
          { hexpand: true, className: 'action-button' })),
      }),
    })) : null

  return Widget.Box(
    { className: `notification ${notification.urgency}` },
    Widget.EventBox({
      vexpand: false,
      onPrimaryClick: notification.dismiss,
      onHover() {
        if (actionsbox)
          actionsbox.revealChild = true
      },
      onHoverLost() {
        if (actionsbox)
          actionsbox.revealChild = true
        notification.dismiss()
      },
    }, VBox(actionsbox ? [content, actionsbox] : [content]))
  )
}
