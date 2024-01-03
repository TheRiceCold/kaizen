import { Widget, Utils } from '../imports.js'
import { icons } from '../constants/main.js'

const { GLib, Pango } = imports.gi

const NotificationIcon = notification => {
  let icon
  if (notification.image) {
    return Widget.Box({
      vexpand: false,
      hexpand: false,
      vpack: 'center',
      className: 'notification-icon',
      css: `
        background-image: url('${notification.image}');
        background-size: auto 100%;
        background-repeat: no-repeat;
        background-position: center;`,
    })
  } 
  else if (Utils.lookUpIcon(notification.app_icon)) 
    icon = notification.app_icon
  else 
    icon = icons.notifications.chat

  return Widget.Icon({ className: 'notification-icon', icon: icon })
}

const Notification = notification => Widget.Box({
  vertical: true,
  className: 'notification',
  children: [
    Widget.EventBox({
      onPrimaryClick: box => {
        const label = box.child.children[1].children[1]
        if (label.lines < 0) {
          label.lines = 3
          label.truncate = 'end'
        } else {
          label.lines = -1
          label.truncate = 'none'
        }
      },
      child: Widget.Box({
        children: [
          NotificationIcon(notification),
          Widget.Box({
            vertical: true,
            children: [
              Widget.Box({
                children: [
                  Widget.Label({
                    className: 'notification-title',
                    label: notification.summary,
                    justification: 'left',
                    max_width_chars: 24,
                    truncate: 'end',
                    wrap: true,
                    xalign: 0,
                    hexpand: true,
                  }),
                  Widget.Label({
                    className: 'notification-time',
                    label: GLib.DateTime.new_from_unix_local(notification.time).format('%H:%M'),
                  }),
                  Widget.Button({
                    className: 'notification-close',
                    child: Widget.Icon(icons.notifications.close),
                    onClicked: () => notification.close(),
                  })
                ]
              }),
              Widget.Label({
                lines: 3,
                xalign: 0,
                wrap: true,
                truncate: 'end',
                max_width_chars: 24,
                justification: 'left',
                className: 'notification-body',
                wrap_mode: Pango.WrapMode.WORD_CHAR,
                // HACK: remove linebreaks, so lines property works properly
                label: notification.body.replace(/(\r\n|\n|\r)/gm, ' '),
              }),
              notification.hints.value ?
                Widget.ProgressBar({
                  className: 'notification-progress',
                  value: Number(notification.hints.value.unpack()) / 100
                }) : Widget.Box()
            ]
          })
        ]
      })
    }),
    Widget.Box({
      spacing: 5,
      children: notification.actions.map(action => Widget.Button({
        child: Widget.Label(action.label),
        className: 'notification-action-button',
        onClicked: () => notification.invoke(action.id),
        hexpand: true,
      }))
    })
  ]
})

export default (notification, visible = false) => {
  const secondRevealer = Widget.Revealer({
    child: Notification(notification),
    revealChild: visible,
    transition: 'slide_left',
    transitionDuration: 200,
    setup: revealer => {
      Utils.timeout(1, () => revealer.reveal_child = true)
    },
  })

  const firstRevealer = Widget.Revealer({
    revealChild: true,
    child: secondRevealer,
    transition: 'slide_down',
    transition_duration: 200,
  })

  let box
  const destroyWithAnims = () => {
    secondRevealer.reveal_child = false
    Utils.timeout(200, () => {
      firstRevealer.reveal_child = false
      Utils.timeout(200, () => box.destroy())
    })
  }

  box = Widget.Box({
    hpack: 'end',
    hexpand: true,
    attribute: {
      count: 0,
      destroyWithAnims: destroyWithAnims,
    },
    children: [firstRevealer]
  })
  return box
}
