const timeVar = Variable('', {
  poll: [1000, ['date', '+%H:%M:%S']]
})

const dateVar = Variable('', {
  poll: [5000, ['date', '+%a %Y-%m-%d']]
})

export default Widget.EventBox({
  child: Widget.Box(
    { vertical: true, className: 'clock-container' },
    Widget.Label({
      hpack: 'end',
      label: dateVar.bind(),
      className: 'clock-date',
    }),
    Widget.Label({
      hpack: 'end',
      label: timeVar.bind(),
      className: 'clock-time',
    })
  )
})
