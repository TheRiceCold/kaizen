import Weather from 'service/weather'
import options from 'options'

const d = new Date()
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const WeatherDay = (
  day: string, 
  icon: string, 
  temp: string, 
  maxTemp: string
) => Widget.Box({
  vpack: 'center',
  children: [
    Widget.Label({ label: day, css: 'min-width: 2em; margin-right: 2em;' }),
    Widget.Icon({ icon, css: 'margin-right: 1.75em;' }), 
    Widget.Label({ label: temp, css: 'margin-right: 1.75em;' }), 
    Widget.Label(maxTemp)
  ]
})

export default Widget.Box({
  vertical: true,
  vpack: 'center',
  className: 'next-days',
  spacing: options.theme.spacing * 0.75,
  children: Weather.bind('weather_days').as(days => days.map((w, index: number) => {
    const day = d.getDay() + index + 1

    return WeatherDay(
      weekdays[day > 6 ? 0 : day],
      w.icon, 
      `${w.temp}°C`, `${w.maxTemp}°C`
    )
  }))
})
