import { Widget } from '../imports.js'
const { Gtk } = imports.gi

export const MarginRevealer = ({
  transition = 'slide_down',
  child,
  revealChild,
  showClass = 'element-show', // These are for animation curve, they don't really hide
  hideClass = 'element-hide', // Don't put margins in these classes!
  extraProperties = [],
  ...props
}) => {
  const widget = Widget.Scrollable({
    ...props,
    css: 'min-height: 0;',
    properties: [
      ['revealChild', true], // It'll be set to false after init if it's supposed to hide
      ['transition', transition],
      ['show', self => {
        if (self._revealChild) return
        self.set_policy(Gtk.PolicyType.NEVER, Gtk.PolicyType.NEVER)
        child.toggleClassName(hideClass, false)
        child.toggleClassName(showClass, true)
        self._revealChild = true
        child.css = 'margin: 0;'
      }],
      ['hide', self => {
        if (!self._revealChild) return
        child.toggleClassName(hideClass, true)
        child.toggleClassName(showClass, false)
        self._revealChild = false

        const width = `${child.get_allocated_width()}px;`
        const height = `${child.get_allocated_height()}px;`
        switch(self._transition) {
          case 'slide_left':
            child.css = 'margin-right: -' + width
            break
          case 'slide_right':
            child.css = 'margin-left: -' + width
            break
          case 'slide_up':
            child.css = 'margin-bottom: -' + height
            break
          case 'slide_down':
            child.css = 'margin-top: -' + height
            break
        }
      }],
      ['toggle', self => {
        if (self._revealChild) 
          self._hide(self)
        else 
          self._show(self)
      }],
      ...extraProperties,
    ],
    setup: self => {
      if (!revealChild)
        self.set_policy(Gtk.PolicyType.ALWAYS, Gtk.PolicyType.ALWAYS)
      else
        self.set_policy(Gtk.PolicyType.NEVER, Gtk.PolicyType.NEVER)
      self.child = child
    },
  })
  child.toggleClassName(`${revealChild ? showClass : hideClass}`, true)
  return widget
}

export const DoubleRevealer = ({
  child,
  revealChild,
  duration1 = 150,
  duration2 = 150,
  transition1 = 'slide_right',
  transition2 = 'slide_left',
}) => Widget.Revealer({
  transition: transition1,
  transitionDuration: duration1,
  revealChild: revealChild,
  child: Widget.Revealer({
    child: child,
    revealChild: revealChild,
    transition: transition2,
    transitionDuration: duration2,
  })
})
