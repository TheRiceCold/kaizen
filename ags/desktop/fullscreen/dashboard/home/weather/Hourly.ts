import Weather from 'service/api/weather'
import ForecastStack from './Forecast'

/* HACK:
  * IDK why but I f*cking hate adding eventbox everytime a
  * widget to forces itself to show up first in the stack.
*/
export default currentDay => {
  const Header = Widget.Box({ className: 'header' },
    Widget.Button({
      label: '',
      cursor: 'pointer',
      className: 'back-btn',
      onPrimaryClick() { ForecastStack.shown = 'daily' }
    }),
    Widget.Label({
      xalign: 1,
      className: 'date',
      label: Utils.merge([
        currentDay.bind(),
        Weather.bind('hourly_forecast')
      ], (day, forecast) => `Date: ${forecast[day] ? forecast[day][0].time.slice(0, 10) : ''}`)
    })
  )

  const Content = Widget.Scrollable({
    vscroll: 'never',
    hscroll: 'always',
    className: 'content',
    child: Widget.Box({
      hpack: 'center',
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

  return Widget.EventBox({
    child: Widget.Box({ className: 'hourly', vertical: true }, Header, Content)
  })
}
