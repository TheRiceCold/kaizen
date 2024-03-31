import options from 'options'

export default items => { 
  function Content(obj) {
    const Stack = Widget.Stack({
      className: 'label-stack',
      transition: 'slide_right',
      transitionDuration: options.transition,
      children: {
        value: Widget.Label({ label: obj.type.bind().as((l: number) => `${Math.round(l*100)}%`) }),
        label: Widget.Label(obj.label),
      }
    })

    const Progress = Widget.CircularProgress({
      value: obj.type.bind(),
      className: 'progress',
      child: Widget.Label(obj.icon),
    })

    return Widget.EventBox({
      child: Widget.Box([ Progress, Stack ]),
      onHover: () => Stack.shown = 'label',
      onHoverLost: () => Stack.shown = 'value',
    })
  } 

  return Widget.Box({
    vertical: true,
    hpack: 'center',
    vpack: 'center',
    children: items.map(Content),
    spacing: options.theme.spacing,
  })
}
