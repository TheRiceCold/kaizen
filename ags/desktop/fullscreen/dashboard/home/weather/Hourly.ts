import Weather from 'service/api/weather'
import ForecastStack from './Forecast'

export default currentDay => {
  const BackButton = Widget.Button({
    label: '',
    vpack: 'start',
    hpack: 'start',
    cursor: 'pointer',
    className: 'back-btn',
    onPrimaryClick() { ForecastStack.shown = 'daily' }
  })

  const DateLabel = Widget.Label({
    vpack: 'start',
    hpack: 'center',
    className: 'current-date',
    label: Utils.merge([
      currentDay.bind(),
      Weather.bind('hourly_forecast')
    ], (day, forecast) => `Date: ${forecast[day] ? forecast[day][0].time.slice(0, 10) : ''}`)
  })

  const Content = Widget.Scrollable({
    vscroll: 'never',
    hscroll: 'always',
    className: 'content',
    child: Widget.Box({
      hpack: 'center',
      vpack: 'center',
      children: Utils.merge(
        [ currentDay.bind(), Weather.bind('hourly_forecast') ],
        (day, forecast) => forecast[day] ? forecast[day].map(hour => Widget.Button({
          cursor: 'pointer',
          child: Widget.Box(
            { className: 'details', vertical: true },
            Widget.Label({
              className: 'hour',
              label: hour.time.slice(11, 16)
            }),
            Widget.Icon({
              icon: hour.icon,
              tooltipText: hour.description
            }),
            Widget.Label({
              tooltipText: 'Temperature',
              label: ` ${Math.round(hour.temp)}°`
            }),
            Widget.Label({
              tooltipText: 'Humidity',
              label: ` ${hour.humidity}%`
            }),
            Widget.Label({
              tooltipText: 'Wind Speed',
              label: ` ${hour.windSpeed} km/h`
            }),
          )
        })) : [])
    })
  })

  return Widget.Overlay({
    child: Content,
    className: 'hourly',
    overlays: [ BackButton, DateLabel ],
  })
}
