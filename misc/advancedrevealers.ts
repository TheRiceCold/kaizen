import Widget from 'resource:///com/github/Aylur/ags/widget.js'

export const MarginRevealer = ({
  child,
  revealChild,
  transition = 'slide_down',
  showClass = 'element-show', // These are for animation curve, they don't really hide
  hideClass = 'element-hide', // Don't put margins in these classes!
  extraSetup = () => { },
  ...props
}) => {
  const widget = Widget.Scrollable({
    ...props,
    attribute: {
      revealChild: true, // It'll be set to false after init if it's supposed to hide
      transition: transition,
      show: () => {
        if (widget.attribute.revealChild) return
        widget.hscroll = 'never'
        widget.vscroll = 'never'
        child.toggleClassName(hideClass, false)
        child.toggleClassName(showClass, true)
        widget.attribute.revealChild = true
        child.css = 'margin: 0;'
      },
      hide: () => {
        if (!widget.attribute.revealChild) return
        child.toggleClassName(hideClass, true)
        child.toggleClassName(showClass, false)
        widget.attribute.revealChild = false
        if (widget.attribute.transition == 'slide_left')
          child.css = `margin-right: -${child.get_allocated_width()}px;`
        else if (widget.attribute.transition == 'slide_right')
          child.css = `margin-left: -${child.get_allocated_width()}px;`
        else if (widget.attribute.transition == 'slide_up')
          child.css = `margin-bottom: -${child.get_allocated_height()}px;`
        else if (widget.attribute.transition == 'slide_down')
          child.css = `margin-top: -${child.get_allocated_height()}px;`
      },
      toggle: () => {
        if (widget.attribute.revealChild)
          widget.attribute.hide()
        else
          widget.attribute.show()
      },
    },
    child: child,
    hscroll: `${revealChild ? 'never' : 'always'}`,
    vscroll: `${revealChild ? 'never' : 'always'}`,
    setup: self => extraSetup(self)
  })
  child.toggleClassName(`${revealChild ? showClass : hideClass}`, true)
  return widget
}
