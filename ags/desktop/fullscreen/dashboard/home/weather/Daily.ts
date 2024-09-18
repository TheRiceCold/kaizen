import Weather from 'service/api/weather'
import ForecastStack from './Forecast'

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default currentDay => Widget.Box({ className: 'daily' })
  .bind('children', Weather, 'daily_forecast', days => days.map(
    (day, index) => Widget.Button({
      cursor: 'pointer',
      onClicked() {
        currentDay.value = index
        ForecastStack.shown = 'hourly'
      },
    }, Widget.Box(
      { vertical: true, vpack: 'center' },
      Widget.Label({
        className: 'day',
        label: weekdays[day.day].substr(0, 3)
      }),
      Widget.Icon({
        icon: day.icon,
        tooltipText: day.description
      }),
      Widget.Label(`min: ${Math.round(day.min)}°`),
      Widget.Label(`max: ${Math.round(day.max)}°`),
      Widget.Label({
        tooltipText: 'Sunrise',
        label: ` ${day.sunrise} AM`
      }),
      Widget.Label({
        tooltipText: 'Sunset',
        label: ` ${day.sunset} PM`
      }),
      Widget.Label({
        tooltipText: 'Wind Speed',
        label: `: ${day.windSpeed} km/h`
      }),
    ))))
