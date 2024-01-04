const { GLib, Gdk, Gtk } = imports.gi
import { Utils, Widget } from '../imports.js'
import { setupCursorHover } from './CursorHover.js'
import { AnimatedCircularProgress } from './main.js'

function guessMessageType(summary) {
  if (summary.includes('recording')) return 'screen_record'
  if (summary.includes('battery') || summary.includes('power')) return 'power'
  if (summary.includes('screenshot')) return 'screenshot_monitor'
  if (summary.includes('welcome')) return 'waving_hand'
  if (summary.includes('time')) return 'scheduleb'
  if (summary.includes('installed')) return 'download'
  if (summary.includes('update')) return 'update'
  if (summary.startsWith('file')) return 'folder_copy'
  return 'chat'
}

const NotificationIcon = (notifObject) => {
  if (notifObject.image) {
    return Widget.Box({
      valign: Gtk.Align.CENTER,
      hexpand: false,
      className: 'notif-icon',
      css: `
        background-image: url("${notifObject.image}");
        background-size: auto 100%;
        background-repeat: no-repeat;
        background-position: center;
      `
    })
  }

  let icon = 'NO_ICON'
  if (Utils.lookUpIcon(notifObject.appIcon))
    icon = notifObject.appIcon
  if (Utils.lookUpIcon(notifObject.appEntry))
    icon = notifObject.appEntry

  return Widget.Box({
    vpack: 'center',
    hexpand: false,
    className: `notif-icon notif-icon-material-${notifObject.urgency}`,
    homogeneous: true,
    children: [
      (icon != 'NO_ICON' ?
        Widget.Icon({
          vpack: 'center',
          icon: icon,
          setup: (self) => Utils.timeout(1, () => {
            const styleContext = self.get_parent().get_style_context()
            const width = styleContext.get_property('min-width', Gtk.StateFlags.NORMAL)
            const height = styleContext.get_property('min-height', Gtk.StateFlags.NORMAL)
            self.size = Math.max(width * 0.7, height * 0.7, 1) // im too lazy to add another box lol
          }),
        }) :
        Widget.Label({
          hexpand: true,
          className: 'icon-material txt-hugerass',
          label: `${notifObject.urgency == 'critical' ? 'release_alert' : guessMessageType(notifObject.summary.toLowerCase())}`,
        })
      )
    ]
  })
}

export default ({
  notifObject,
  isPopup = false,
  popupTimeout = 3000,
  props = {},
} = {}) => {
  const command = (isPopup ? () => notifObject.dismiss() : () => notifObject.close())
  const destroyWithAnims = () => {
    widget.sensitive = false
    notificationBox.setCss(middleClickClose)
    Utils.timeout(200, () => {
      wholeThing.revealChild = false
    })
    Utils.timeout(400, () => {
      command()
      wholeThing.destroy()
    })
  }
  const widget = Widget.EventBox({
    onHover: (self) => {
      self.window.set_cursor(Gdk.Cursor.new_from_name(display, 'grab'))
      if (!wholeThing._hovered)
        wholeThing._hovered = true
    },
    onHoverLost: (self) => {
      self.window.set_cursor(null)
      if (wholeThing._hovered)
        wholeThing._hovered = false
      if (isPopup) command()
    },
    onMiddleClick: () => destroyWithAnims()
  })
  const wholeThing = Widget.Revealer({
    properties: [
      ['id', notifObject.id],
      ['close', undefined],
      ['hovered', false],
      ['dragging', false],
      ['destroyWithAnims', () => destroyWithAnims]
    ],
    revealChild: false,
    transition: 'slide_down',
    transitionDuration: 200,
    child: Widget.Box({ homogeneous: true })
  })

  const display = Gdk.Display.get_default()
  const notifTextPreview = Widget.Revealer({
    transition: 'slide_down',
    transitionDuration: 120,
    revealChild: true,
    child: Widget.Label({
      className: `txt-smallie notif-body-${notifObject.urgency}`,
      useMarkup: true,
      xalign: 0,
      justify: Gtk.Justification.LEFT,
      maxWidthChars: 24,
      truncate: 'end',
      label: notifObject.body.split('\n')[0],
    }),
  })
  const notifTextExpanded = Widget.Revealer({
    transition: 'slide_up',
    transitionDuration: 120,
    revealChild: false,
    child: Widget.Box({
      vertical: true,
      className: 'spacing-v-10',
      children: [
        Widget.Label({
          className: `txt-smallie notif-body-${notifObject.urgency}`,
          useMarkup: true,
          xalign: 0,
          justify: Gtk.Justification.LEFT,
          maxWidthChars: 24,
          wrap: true,
          label: notifObject.body,
        }),
        Widget.Box({
          homogeneous: true,
          className: 'notif-actions',
          children: [
            Widget.Button({
              className: `notif-action notif-action-${notifObject.urgency}`,
              label: 'Close',
              onClicked: () => destroyWithAnims(),
            }),
            ...notifObject.actions.map(action => Widget.Button({
              className: `notif-action notif-action-${notifObject.urgency}`,
              onClicked: () => notifObject.invoke(action.id),
              label: action.label,
            }))
          ],
        })
      ]
    }),
  })
  const notifIcon = Widget.Box({
    vpack: 'start',
    homogeneous: true,
    children: [
      Widget.Overlay({
        child: NotificationIcon(notifObject),
        overlays: isPopup ? [AnimatedCircularProgress({
          className: `notif-circprog-${notifObject.urgency}`,
          vpack: 'center', hpack: 'center',
          initFrom: (isPopup ? 100 : 0),
          initTo: 0,
          initAnimTime: popupTimeout,
        })] : [],
      }),
    ]
  })
  let notifTime = ''
  const messageTime = GLib.DateTime.new_from_unix_local(notifObject.time)
  if (messageTime.get_day_of_year() == GLib.DateTime.new_now_local().get_day_of_year())
    notifTime = messageTime.format('%H:%M')
  else if (messageTime.get_day_of_year() == GLib.DateTime.new_now_local().get_day_of_year() - 1)
    notifTime = 'Yesterday'
  else
    notifTime = messageTime.format('%d/%m')
  const notifText = Widget.Box({
    valign: Gtk.Align.CENTER,
    vertical: true,
    hexpand: true,
    children: [
      Widget.Box({
        children: [
          Widget.Label({
            xalign: 0,
            className: 'txt-small txt-semibold titlefont',
            justify: Gtk.Justification.LEFT,
            hexpand: true,
            maxWidthChars: 24,
            truncate: 'end',
            ellipsize: 3,
            useMarkup: notifObject.summary.startsWith('<'),
            label: notifObject.summary,
          }),
          Widget.Label({
            vpack: 'center',
            label: notifTime,
            justification: 'right',
            className: 'txt-smaller txt-semibold',
          }),
        ]
      }),
      notifTextPreview,
      notifTextExpanded,
    ]
  })
  const notifExpandButton = Widget.Button({
    vpack: 'start',
    className: 'notif-expand-btn',
    onClicked: self => {
      if (notifTextPreview.revealChild) { // Expanding...
        notifTextPreview.revealChild = false
        notifTextExpanded.revealChild = true
        self.child.label = 'expand_less'
        expanded = true
      }
      else {
        notifTextPreview.revealChild = true
        notifTextExpanded.revealChild = false
        self.child.label = 'expand_more'
        expanded = false
      }
    },
    child: Widget.Label({
      vpack: 'center',
      label: 'expand_more',
      className: 'icon-material txt-norm',
    }),
    setup: setupCursorHover,
  })
  const notificationContent = Widget.Box({
    ...props,
    className: `${isPopup ? 'popup-' : ''}notif-${notifObject.urgency} spacing-h-10`,
    children: [
      notifIcon,
      Widget.Box({
        className: 'spacing-h-5',
        children: [notifText, notifExpandButton]
      })
    ]
  })

  // Gesture stuff
  const gesture = Gtk.GestureDrag.new(widget)
  var initDirX = 0
  var initDirVertical = -1 // -1: unset, 0: horizontal, 1: vertical
  var expanded = false
  // in px
  const startMargin = 0
  const MOVE_THRESHOLD = 10
  const DRAG_CONFIRM_THRESHOLD = 100
  // in rem
  const maxOffset = 10.227
  const endMargin = 20.455
  const disappearHeight = 6.818
  const leftAnim1 = `transition: 200ms cubic-bezier(0.05, 0.7, 0.1, 1);
                     margin-left: -${Number(maxOffset + endMargin)}rem;
                     margin-right: ${Number(maxOffset + endMargin)}rem;
                     opacity: 0;`

  const rightAnim1 = `transition: 200ms cubic-bezier(0.05, 0.7, 0.1, 1);
                      margin-left:   ${Number(maxOffset + endMargin)}rem;
                      margin-right: -${Number(maxOffset + endMargin)}rem;
                      opacity: 0;`

  const middleClickClose = `transition: 200ms cubic-bezier(0.85, 0, 0.15, 1);
                            margin-left:   ${Number(maxOffset + endMargin)}rem;
                            margin-right: -${Number(maxOffset + endMargin)}rem;
                            opacity: 0;`

  const notificationBox = Widget.Box({
    attribute: {
      'leftAnim1': leftAnim1,
      'rightAnim1': rightAnim1,
      'middleClickClose': middleClickClose,
      'ready': false,
    },
    homogeneous: true,
    children: [notificationContent],
    setup: self => self
      .hook(gesture, self => {
        var offset_x = gesture.get_offset()[1]
        var offset_y = gesture.get_offset()[2]
        if (initDirVertical == -1) {
          if (Math.abs(offset_y) > MOVE_THRESHOLD)
            initDirVertical = 1
          if (initDirX == 0 && Math.abs(offset_x) > MOVE_THRESHOLD) {
            initDirVertical = 0
            initDirX = (offset_x > 0 ? 1 : -1)
          }
        }

        if (initDirVertical == 0 && offset_x > MOVE_THRESHOLD) {
          if (initDirX < 0)
            self.setCss('margin-left: 0px; margin-right: 0px;')
          else
            self.setCss(`
              margin-left: ${Number(offset_x + startMargin - MOVE_THRESHOLD)}px;
              margin-right: -${Number(offset_x + startMargin - MOVE_THRESHOLD)}px;
            `)
        }
        else if (initDirVertical == 0 && offset_x < -MOVE_THRESHOLD) {
          if (initDirX > 0)
            self.setCss('margin-left: 0px; margin-right: 0px;')
          else {
            offset_x = Math.abs(offset_x)
            self.setCss(`
              margin-right: ${Number(offset_x + startMargin - MOVE_THRESHOLD)}px;
              margin-left: -${Number(offset_x + startMargin - MOVE_THRESHOLD)}px;
            `)
          }
        }

        wholeThing._dragging = Math.abs(offset_x) > 10

        if (widget.window)
          widget.window.set_cursor(Gdk.Cursor.new_from_name(display, 'grabbing'))

        if (initDirVertical == 1 && offset_y > MOVE_THRESHOLD && !expanded) {
          notifTextPreview.revealChild = false
          notifTextExpanded.revealChild = true
          expanded = true
          notifExpandButton.child.label = 'expand_less'
        }
        else if (initDirVertical == 1 && offset_y < -MOVE_THRESHOLD && expanded) {
          notifTextPreview.revealChild = true
          notifTextExpanded.revealChild = false
          expanded = false
          notifExpandButton.child.label = 'expand_more'
        }

      }, 'drag-update')
      .hook(gesture, self => {
        if (!self._ready) {
          wholeThing.revealChild = true
          self._ready = true
          return
        }
        const offset_h = gesture.get_offset()[1]

        if (Math.abs(offset_h) > DRAG_CONFIRM_THRESHOLD && offset_h * initDirX > 0) {
          if (offset_h > 0) {
            self.setCss(rightAnim1)
            widget.sensitive = false
          }
          else {
            self.setCss(leftAnim1)
            widget.sensitive = false
          }
          Utils.timeout(200, () => wholeThing.revealChild = false)
          Utils.timeout(400, () => {
            command()
            wholeThing.destroy()
          })
        }
        else {
          self.setCss(`
            transition: margin 200ms cubic-bezier(0.05, 0.7, 0.1, 1), opacity 200ms cubic-bezier(0.05, 0.7, 0.1, 1);
            margin-left:  ${startMargin}px;
            margin-right: ${startMargin}px;
            margin-bottom: unset; margin-top: unset;
            opacity: 1;`)
          if (widget.window)
            widget.window.set_cursor(Gdk.Cursor.new_from_name(display, 'grab'))

          wholeThing._dragging = false
        }
        initDirX = 0
        initDirVertical = -1
      }, 'drag-end')
    ,
  })
  widget.add(notificationBox)
  wholeThing.child.children = [widget]

  return wholeThing
}
