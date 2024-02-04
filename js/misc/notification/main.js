import { setupCursorHover } from '../CursorHover.js'
import { AnimatedCircularProgress, FontIcon } from '../main.js'

import NotificationIcon from './Icon.js'

const { timeout } = Utils
const { GLib, Gdk, Gtk } = imports.gi

export default ({ notification, isPopup = false, props = {} }) => {
  const popupTimeout = notification.timeout || (notification.urgency == 'critical' ? 8000 : 3000)
  const command = isPopup ? () => notification.dismiss() : () => notification.close()

  const destroyWithAnims = () => {
    widget.sensitive = false
    notificationBox.setCss(middleClickClose)
    timeout(200, () => {
      if (wholeThing)
        wholeThing.revealChild = false
    }, wholeThing)
    timeout(400, () => { 
      command()
      if (wholeThing) {
        wholeThing.destroy()
        wholeThing = null
      }
    }, wholeThing)
  }

  let notifTime = ''
  const messageTime = GLib.DateTime.new_from_unix_local(notification.time)
  if (messageTime.get_day_of_year() == GLib.DateTime.new_now_local().get_day_of_year())
    notifTime = messageTime.format('%H:%M')
  else if (messageTime.get_day_of_year() == GLib.DateTime.new_now_local().get_day_of_year() - 1)
    notifTime = 'Yesterday'
  else
    notifTime = messageTime.format('%d/%m')

  const notifTextSummary = Widget.Label({
    xalign: 0,
    hexpand: true,
    ellipsize: 3,
    truncate: 'end',
    maxWidthChars: 24,
    label: notification.summary,
    justify: Gtk.Justification.LEFT,
    className: 'txt-small txt-semibold titlefont',
    useMarkup: notification.summary.startsWith('<'),
  })

  const notifTextBody = Widget.Label({
    vpack: 'center',
    label: notifTime,
    justification: 'right',
    className: 'txt-smaller txt-semibold',
  })

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
          className: 'notif-actions spacing-h-5',
          children: [
            Widget.Button({
              child: FontIcon('󱎘'),
              onClicked: () => destroyWithAnims(),
              className: `notif-action notif-action-${notification.urgency}`,
            }),
            ...notification.actions.map(action => Widget.Button({
              child: Widget.Label({ label: action.label }),
              onClicked: () => notification.invoke(action.id),
              className: `notif-action notif-action-${notification.urgency}`,
            }))
          ],
        })
      ]
    }),
  })

  const notifText = Widget.Box({
    hexpand: true,
    vertical: true,
    valign: Gtk.Align.CENTER,
    children: [
      Widget.Box({
        children: [ notifTextSummary, notifTextBody ]
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
    child: Widget.Label({ label: '󰅀', vpack: 'center', className: 'txt-norm' }),
    setup: setupCursorHover,
  })

  const notifIcon = Widget.Box({
    vpack: 'start',
    homogeneous: true,
    children: [
      Widget.Overlay({
        child: NotificationIcon(notification),
        overlays: isPopup ? [AnimatedCircularProgress({
          vpack: 'center', 
          hpack: 'center',
          initTo: 0,
          initAnimTime: popupTimeout,
          initFrom: (isPopup ? 100 : 0),
          className: `notif-circprog-${notification.urgency}`,
        })] : [],
      }),
    ]
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

  const widget = Widget.EventBox({
    onHover: self => {
      self.window.set_cursor(Gdk.Cursor.new_from_name(display, 'grab'))

      if (!wholeThing.attribute.hovered) 
        wholeThing.attribute.hovered = true
    },
    onHoverLost: self => {
      self.window.set_cursor(null)

      if (wholeThing.attribute.hovered) 
        wholeThing.attribute.hovered = false

      if (isPopup) 
        command()
    },
    onMiddleClick: () => destroyWithAnims(),
    setup: self => {
      self.on('button-press-event', () => {
        wholeThing.attribute.held = true
        notificationContent.toggleClassName(`${isPopup ? 'popup-' : ''}notif-clicked-${notification.urgency}`, true)
        timeout(800, () => {
          if (wholeThing.attribute.held) {
            Utils.execAsync(['wl-copy', `${notification.body}`])
            notifTextSummary.label = notification.summary + ' (copied)'
            timeout(3000, () => notifTextSummary.label = notification.summary)
          }
        })
      }).on('button-release-event', () => {
        wholeThing.attribute.held = false
        notificationContent.toggleClassName(`${isPopup ? 'popup-' : ''}notif-clicked-${notification.urgency}`, false)
      })
    }
  })

  const wholeThing = Widget.Revealer({
    attribute: {
      held: false,
      hovered: false,
      dragging: false,
      close: undefined,
      destroyWithAnims, 
      id: notification.id,
    },
    revealChild: false,
    transition: 'slide_down',
    transitionDuration: 200,
    child: Widget.Box({ homogeneous: true })
  })

  const display = Gdk.Display.get_default()

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
      leftAnim1: leftAnim1,
      rightAnim1: rightAnim1,
      middleClickClose: middleClickClose,
      ready: false,
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
        if (initDirX < 0) self.setCss('margin-left: 0; margin-right: 0;')
        else
          self.setCss(`
            margin-left:   ${Number(offset_x + startMargin - MOVE_THRESHOLD)}px;
            margin-right: -${Number(offset_x + startMargin - MOVE_THRESHOLD)}px;
          `)
      }
      else if (initDirVertical == 0 && offset_x < -MOVE_THRESHOLD) {
        if (initDirX > 0)
          self.setCss('margin-left: 0; margin-right: 0;')
        else {
          offset_x = Math.abs(offset_x)
          self.setCss(`
            margin-right: ${Number(offset_x + startMargin - MOVE_THRESHOLD)}px;
            margin-left: -${Number(offset_x + startMargin - MOVE_THRESHOLD)}px;`)
        }
      }

      // Update dragging
      wholeThing.attribute.dragging = Math.abs(offset_x) > MOVE_THRESHOLD

      if (Math.abs(offset_x) > MOVE_THRESHOLD || Math.abs(offset_y) > MOVE_THRESHOLD)
        wholethis.attribute.held = false

      widget.window?.set_cursor(Gdk.Cursor.new_from_name(display, 'grabbing'))

      // Vertical drag
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
      if (!self.attribute.ready) {
        wholeThing.revealChild = true
        self.attribute.ready = true
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
        self.setCss(
          `transition: margin 200ms cubic-bezier(0.05, 0.7, 0.1, 1), opacity 200ms cubic-bezier(0.05, 0.7, 0.1, 1);
           margin-left:  ${startMargin}px;
           margin-right: ${startMargin}px;
           margin-bottom: unset; margin-top: unset;
           opacity: 1;`)
        if (widget.window)
          widget.window.set_cursor(Gdk.Cursor.new_from_name(display, 'grab'))

        wholeThing.attribute.dragging = false
      }
      initDirX = 0
      initDirVertical = -1
    }, 'drag-end')
  })
  widget.add(notificationBox)
  wholeThing.child.children = [widget]

  if (isPopup) Utils.timeout(popupTimeout, () => {
    if (wholeThing) {
      wholeThing.revealChild = false
      Utils.timeout(200, () => {
        if (wholeThing) {
          wholeThing.destroy()
          wholeThing = null
        }
        command()
      }, wholeThing)
    }
  })

  return wholeThing
}
