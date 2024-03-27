import Weather from './Weather'

export default Widget.Box({
  className: 'dateweather',
  vertical: true,
  children: [
    Widget.Box({
      className: 'calendar',
      children: [ Widget.Calendar({ hexpand: true }) ],
    }),
    Weather,
  ]
})
