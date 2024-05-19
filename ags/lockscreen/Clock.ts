const date = Variable('', {
  poll: [900000, ['date', '+%A, %b %d']]
})

const time = Variable('', {
  poll: [10000, ['date', '+%I:%M']]
})

export default Widget.Box(
  {
    vertical: true,
    css: 'margin-bottom: 8em;',
  },
  Widget.Label({
    label: date.bind(),
    css: 'font-size: 1.75em; opacity: 0.8;'
  }),
  Widget.Label({
    label: time.bind(),
    css: 'font-size: 8em; opacity: 0.9;'
  })
)
