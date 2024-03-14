import Weather from 'service/weather'

const Temp = Widget.Label({
  hpack: 'start',
  vpack: 'center',
  truncate: 'end',
  className: 'temp',
  label: Weather.bind('temp').transform(temp => temp + '°C')
})
const FeelsLike = Widget.Label({
  vpack: 'center',
  hpack: 'start',
  truncate: 'end',
  className: 'feelslike',
  label: Weather.bind('feels_like').transform(temp => temp + '°C')
})

const Location = Widget.Label({
  hpack: 'start',
  vpack: 'center',
  truncate: 'end',
  className: 'description',
  label: Weather.bind('location') 
})

const Description = Widget.Label({
  hpack: 'start',
  vpack: 'center',
  truncate: 'end',
  className: 'description',
  label: Weather.bind('description')
})

export default Widget.Box({
  vertical: true,
  className: 'weather',
  children: [ Temp, FeelsLike, Location, Description ]
})
