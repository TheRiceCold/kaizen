import { Widget } from '../../imports.js'
import { Weather } from '../../services/main.js'

export default Widget.Box({
  spacing: 5,
  className: 'weather-container',
  children: [
    Widget.Label({
      className: 'weather-icon',
      label: Weather.bind("icon")
    }),
    Widget.Label({
      className: 'weather-temp',
      label: Weather.bind('temp').transform(temp => temp + '°C')
    })
  ],
  tooltipMarkup: Weather.bind('description')
})
