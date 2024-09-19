import Weather from 'service/api/weather'

import { ButtonLabel, VBox } from 'widgets'
import ForecastStack from './Forecast'

const { Box, Icon, Label, Scrollable, Overlay } = Widget

export default currentDay => Overlay({
  className: 'hourly',
  overlays: [
    // Back Button
    ButtonLabel(
      '', () => ForecastStack.shown = 'daily',
      { vpack: 'start', hpack: 'start', className: 'back-btn' },
    ),

    // Current Date
    Label({
      vpack: 'start',
      hpack: 'center',
      className: 'current-date',
      label: Utils.merge([
        currentDay.bind(),
        Weather.bind('hourly_forecast')
      ], (day, forecast) => `Date: ${forecast[day] ? forecast[day][0].time.slice(0, 10) : ''}`)
    })
  ],

  // Content
  child: Scrollable({
    vscroll: 'never',
    hscroll: 'always',
    className: 'content',
  }, Box({
    hpack: 'center',
    vpack: 'center',

    // Map hour forecasts
    children: Utils.merge(
      [currentDay.bind(), Weather.bind('hourly_forecast')],
      (day, forecast) => forecast[day] ? forecast[day].map(hour => VBox(
        { className: 'details' },
        Label({ className: 'hour', label: hour.time.slice(11, 16) }),
        Icon({ icon: hour.icon, tooltipText: hour.description }),
        Label({ tooltipText: 'Temperature', label: ` ${Math.round(hour.temp)}°` }),
        Label({ tooltipText: 'Humidity', label: ` ${hour.humidity}%` }),
        Label({ tooltipText: 'Wind Speed', label: ` ${hour.windSpeed} km/h` }),
      )) : [])
  }))
})
