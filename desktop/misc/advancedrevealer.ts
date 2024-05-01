import { type BoxProps } from 'types/widgets/box'

type TProps = {
  child: BoxProps,
  showClass: string
  hideClass: string
  revealChild: boolean
  extraSetup: () => void
  transition: 'slide_down' | 'slide_up'
}

export const MarginRevealer = ({
  transition = 'slide_down',
  child,
  revealChild,
  showClass = 'element-show', // These are for animation curve, they don't really hide
  hideClass = 'element-hide', // Don't put margins in these classes!
  extraSetup = () => { },
  ...props
}: TProps) => {
  const widget = Widget.Scrollable({
    ...props,
    attribute: {
      revealChild: true, // It'll be set to false after init if it's supposed to hide
      transition: transition,
      show() {
        if (widget.attribute.revealChild) return
        widget.hscroll = 'never'
        widget.vscroll = 'never'
        child.toggleClassName(hideClass, false)
        child.toggleClassName(showClass, true)
        widget.attribute.revealChild = true
        child.css = 'margin: 0;'
      },
      hide() {
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
      toggle() {
        if (widget.attribute.revealChild) widget.attribute.hide()
        else widget.attribute.show()
      },
    },
    child: child,
    setup: extraSetup,
    hscroll: `${revealChild ? 'never' : 'always'}`,
    vscroll: `${revealChild ? 'never' : 'always'}`,
  })

  child.toggleClassName(`${revealChild ? showClass : hideClass}`, true)
  return widget
}

export const DoubleRevealer = ({
  transition1 = 'slide_right',
  transition2 = 'slide_left',
  duration1 = 150,
  duration2 = 150,
  child,
  revealChild,
  ...props
}) => {
  const r2 = Widget.Revealer({
    child,
    revealChild: revealChild,
    transition: transition2,
    transitionDuration: duration2,
  })

  const r1 = Widget.Revealer({
    transition: transition1,
    transitionDuration: duration1,
    revealChild: revealChild,
    child: r2,
    ...props,
  })

  r1.toggleRevealChild = (value) => {
    r1.revealChild = value
    r2.revealChild = value
  }
  return r1
}
