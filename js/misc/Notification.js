import { Widget, Utils } from '../imports.js'
import { icons } from '../constants/main.js'

const { GLib, Gtk, Pango } = imports.gi

function guessMessageType({ includes, startsWith }) {
  switch(true) {
    case includes('recording'): 
      return 'screen_record'
    case includes('battery') || includes('power'): 
      return 'power'
    case (includes('screenshot')):
      return 'screenshot_monitor'
    case includes('welcome'): 
      return 'waving_hand'
    case includes('time'): 
      return 'scheduleb'
    case includes('installed'): 
      return 'download'
    case includes('update'): 
      return 'update'
    case startsWith('file'): 
      return 'folder_copy'
    default: return 'chat'
  }
}

const NotificationIcon = notification => {
  if (notification.image) {
    return Widget.Box({
      hexpand: false,
      className: 'notif-icon',
      valign: Gtk.Align.CENTER,
      css: `
        background-image: url('${notification.image}');
        background-size: auto 100%;
        background-repeat: no-repeat;
        background-position: center;`,
    })
  } 
  const icon = Utils.lookUpIcon(notification.appIcon) ? notification.appIcon : 
    Utils.lookUpIcon(notification.appEntry) ? notification.appEntry : 'NO_ICON'

  return icon !== 'NO_ICON' ? Widget.Icon({ 
    icon, vpack: 'center',
    setup: self => Utils.timeout(1, () => {
      const styleContext = self.get_parent().get_style_context();
      const width = styleContext.get_property('min-width', Gtk.StateFlags.NORMAL);
      const height = styleContext.get_property('min-height', Gtk.StateFlags.NORMAL);
      self.size = Math.max(width * 0.7, height * 0.7, 1); // im too lazy to add another box lol
    })
  }) : Widget.Label({ 
      hexpand: true,
      className: 'icon-material txt-hugerass',
      label: `${notification.urgency === 'critical'}` ? 'release_alert' 
        : guessMessageType(notification.summary.toLowerCase())
    })
}

const Notification = notification => Widget.Box({
  vertical: true,
  children: [
    Widget.EventBox({
      on_primary_click: (box) => {
        // @ts-ignore
        const label = box.child.children[1].children[1];
        if (label.lines < 0) {
          label.lines = 3;
          label.truncate = "end";
        } else {
          label.lines = -1;
          label.truncate = "none";
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
                    class_name: "notification-title",
                    label: notification.summary,
                    justification: "left",
                    max_width_chars: 24,
                    truncate: "end",
                    wrap: true,
                    xalign: 0,
                    hexpand: true,
                  }),
                  Widget.Label({
                    class_name: "notification-time",
                    label: GLib.DateTime.new_from_unix_local(notification.time).format("%H:%M"),
                  }),
                  Widget.Button({
                    class_name: "notification-close",
                    child: Widget.Icon(icons.notifications.close),
                    onClicked: () => {
                      notification.close();
                    },
                  })
                ]
              }),
              Widget.Label({
                class_name: "notification-body",
                justification: "left",
                max_width_chars: 24,
                lines: 3,
                truncate: "end",
                wrap_mode: Pango.WrapMode.WORD_CHAR,
                xalign: 0,
                wrap: true,
                // HACK: remove linebreaks, so lines property works properly
                label: notification.body.replace(/(\r\n|\n|\r)/gm, " "),
              }),
              notification.hints.value ?
                Widget.ProgressBar({
                  class_name: "notification-progress",
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
        onClicked: () => notification.invoke(action.id),
        class_name: "notification-action-button",
        hexpand: true,
      }))
    })
  ]
});

export default (notification) => {
  const firstRevealer = Widget.Revealer({
    child: Notification(notification),
    reveal_child: true,
    transition: 'slide_down',
    transition_duration: 200,
  })

  let box

  const destroyWithAnims = () => {
    Utils.timeout(200, () => {
      firstRevealer.reveal_child = false;
      Utils.timeout(200, () => box.destroy())
    })
  }

  box = Widget.Box({
    hexpand: true,
    hpack: 'end',
    attribute: {
      count: 0,
      destroyWithAnims: destroyWithAnims,
    },
    children: [firstRevealer],
  })
  return box
}
