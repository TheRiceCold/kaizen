import { Utils, Widget } from '../../imports.js'
import { setupCursorHover } from '../CursorHover.js'
import { AnimatedCircularProgress } from '../main.js'

import NotificationIcon from './Icon.js'

const { timeout } = Utils
const { GLib, Gdk, Gtk } = imports.gi

export default ({ notification, isPopup = false, popupTimeout = 3000, props = {} }) => {
  const command = isPopup ? () => notification.dismiss() : () => notification.close()

  const destroyWithAnims = () => {
    widget.sensitive = false
    notificationBox.setCss(middleClickClose)
    timeout(200, () => wholeThing.revealChild = false)
    timeout(400, () => { command(); wholeThing.destroy() })
  }

  const widget = Widget.EventBox({
    onHover: self => {
      self.window.set_cursor(Gdk.Cursor.new_from_name(display, 'grab'))
      if (!wholeThing._hovered) wholeThing._hovered = true
    },
    onHoverLost: self => {
      self.window.set_cursor(null)
      if (wholeThing._hovered) wholeThing._hovered = false
      if (isPopup) command()
    },
    onMiddleClick: () => destroyWithAnims()
  })

  const wholeThing = Widget.Revealer({
    properties: [
      ['id', notification.id],
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
      xalign: 0,
      truncate: 'end',
      useMarkup: true,
      maxWidthChars: 24,
      justify: Gtk.Justification.LEFT,
      label: notification.body.split('\n')[0],
      className: `txt-smallie notif-body-${notification.urgency}`,
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
          xalign: 0,
          wrap: true,
          useMarkup: true,
          maxWidthChars: 24,
          label: notification.body,
          justify: Gtk.Justification.LEFT,
          className: `txt-smallie notif-body-${notification.urgency}`,
        }),
        Widget.Box({
          homogeneous: true,
          className: 'notif-actions',
          children: [
            Widget.Button({
              label: '󱎘',
              onClicked: () => destroyWithAnims(),
              className: `notif-action notif-action-${notification.urgency}`,
            }),
            ...notification.actions.map(action => Widget.Button({
              label: action.label,
              onClicked: () => notification.invoke(action.id),
              className: `notif-action notif-action-${notification.urgency}`,
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
        child: NotificationIcon(notification),
        overlays: isPopup ? [AnimatedCircularProgress({
          className: `notif-circprog-${notification.urgency}`,
          vpack: 'center', hpack: 'center',
          initFrom: (isPopup ? 100 : 0),
          initTo: 0,
          initAnimTime: popupTimeout,
        })] : [],
      }),
    ]
  })

  let notifTime = ''
  const messageTime = GLib.DateTime.new_from_unix_local(notification.time)
  if (messageTime.get_day_of_year() == GLib.DateTime.new_now_local().get_day_of_year())
    notifTime = messageTime.format('%H:%M')
  else if (messageTime.get_day_of_year() == GLib.DateTime.new_now_local().get_day_of_year() - 1)
    notifTime = 'Yesterday'
  else
    notifTime = messageTime.format('%d/%m')
  const notifText = Widget.Box({
    hexpand: true,
    vertical: true,
    valign: Gtk.Align.CENTER,
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
            useMarkup: notification.summary.startsWith('<'),
            label: notification.summary,
          }),
          Widget.Label({
            vpack: 'center',
            justification: 'right',
            className: 'txt-smaller txt-semibold',
            label: notifTime,
          })
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
      if (notifTextPreview.revealChild) {
        notifTextPreview.revealChild = false
        notifTextExpanded.revealChild = true
        self.child.label = '󰅃'
        expanded = true
      }
      else {
        notifTextPreview.revealChild = true
        notifTextExpanded.revealChild = false
        self.child.label = '󰅀'
        expanded = false
      }
    },
    child: Widget.Label({ 
      label: '󰅀', 
      vpack: 'center',
      className: 'txt-norm', 
    }),
    setup: setupCursorHover,
  })

  const notificationContent = Widget.Box({
    ...props,
    className: `${isPopup ? 'popup-' : ''}notif-${notification.urgency} spacing-h-10`,
    children: [
      notifIcon,
      Widget.Box({
        className: 'spacing-h-5',
        children: [ notifText, notifExpandButton ]
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
    setup: self => self.hook(gesture, self => {
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
        if (initDirX < 0) self.setCss('margin-left: 0px; margin-right: 0px;')
        else
          self.setCss(`
              margin-left:   ${Number(offset_x + startMargin - MOVE_THRESHOLD)}px;
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
        notifExpandButton.child.label = '󰅃'
      }
      else if (initDirVertical == 1 && offset_y < -MOVE_THRESHOLD && expanded) {
        notifTextPreview.revealChild = true
        notifTextExpanded.revealChild = false
        expanded = false
        notifExpandButton.child.label = '󰅀'
      }

    }, 'drag-update').hook(gesture, self => {
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
        timeout(200, () => wholeThing.revealChild = false)
        timeout(400, () => {
          command()
          wholeThing.destroy()
        })
      }
      else {
        self.setCss(`transition: margin 200ms cubic-bezier(0.05, 0.7, 0.1, 1), opacity 200ms cubic-bezier(0.05, 0.7, 0.1, 1);
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
  })
  widget.add(notificationBox)
  wholeThing.child.children = [widget]

  return wholeThing
}
