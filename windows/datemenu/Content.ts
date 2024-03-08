import Timer from './Timer'

export default Widget.Box({
  className: 'datemenu',
  vertical: true,
  children: [
    Widget.Box({
      className: 'calendar',
      children: [ Widget.Calendar({ hexpand: true }) ],
    }),
    Timer(),
  ]
})
