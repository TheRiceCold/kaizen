import Weather from 'service/weather'
import options from 'options'

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const WeatherDay = (
  day: string,
  icon: string,
  temp: string,
  feelsLike: string
) => Widget.Button({
  cursor: 'pointer',
  child: Widget.Box(
    { vpack: 'center' },
    Widget.Label({ className: 'day', label: day.substr(0, 3) }),
    Widget.Icon(icon),
    Widget.Label({ className: 'temp', label: temp }),
    Widget.Label(feelsLike)
  )
})

export default Widget.Box({
  vertical: true,
  vpack: 'center',
  className: 'forecast',
  spacing: options.theme.spacing * 0.75,
  children: Weather.bind('forecast_days').as(days => days.map(
    day => WeatherDay(
      weekdays[day.day],
      day['icon'],
      `${Math.round(day['temp'])}°C`,
      `${Math.round(day['feelsLike'])}°C`,
    ))
  )
})
