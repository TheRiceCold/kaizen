import Weather from './Weather'

export default Widget.Box({
  className: 'datemenu',
  vertical: true,
  children: [
    Weather,
    Widget.Box({
      className: 'calendar',
      children: [ Widget.Calendar({ hexpand: true }) ],
    }),
  ]
})
