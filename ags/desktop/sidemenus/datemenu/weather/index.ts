import Weather from 'service/weather'

const CurrentCondition = Widget.Box(
  { hpack: 'center', className: 'current-condition' },
  Widget.Box({ vertical: true },
    Widget.Label({ className: 'region' }).bind('label', Weather, 'region', r => ' '+r),
    Widget.Icon().bind('icon', Weather, 'icon'),
    Widget.Label().bind('label', Weather, 'current_condition', c => c.weatherDesc ? c.weatherDesc[0].value : ''),
  ),
  Widget.Box({ vertical: true },
    Widget.Label().bind('label', Weather, 'current_condition', c => ` ${c.temp_C}°`),
    Widget.Label().bind('label', Weather, 'current_condition', c => `Feels Like: ${c.FeelsLikeC}°`),
    Widget.Label().bind('label', Weather, 'astronomy', a => 'sunrise: '+a.sunrise),
    Widget.Label().bind('label', Weather, 'astronomy', a => 'sunset: '+a.sunset),
  ),
  Widget.Box(
    { vertical: true },
    Widget.Label().bind('label', Weather, 'current_condition', c => {
      switch(c.winddir16Point) {
        case 'N': return '-north'
        case 'NNE': return '-north-northeast' // 22.5°
        case 'NE': return ' northeast' // 45°
        case 'ENE': return ' east-northeast' // 67.5°
        case 'E': return ' east' // 90°
        case 'ESE': return ' east-southeast' // 112.5°
        case 'SE': return ' southeast' // 135°
        case 'SSE': return ' south-southeast' // 157.5°
        case 'S': return ' south' // 180°
        case 'SSW': return ' south-southwest' // 202.5°
        case 'SW': return ' southwest' // 225°
        case 'WSW': return '-west-southwest' // 247.5°
        case 'W': return '-west' // 270°
        case 'WNW': return '-west-northwest' // 292.5°
        case 'NW': return '-northwest' // 315°
        case 'NNW': return '-north-northwest' // 337.5°
      }
    }),
    Widget.Label().bind('label', Weather, 'current_condition', c => ` ${c.humidity}%`),
    Widget.Label().bind('label', Weather, 'current_condition', c => ` ${c.windspeedKmph} km/h`),
  )
)

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const WeatherDay = (
  day: string,
  icon: string,
  temp: string,
  feelsLike: string
) => Widget.Button({
  cursor: 'pointer',
  child: Widget.Box(
    { vertical: true },
    Widget.Label({ label: day.substr(0, 3) }),
    Widget.Icon(icon),
    Widget.Label(temp),
    Widget.Label(feelsLike),
  )
})

const Forecast = Widget.Box({
  hpack: 'center',
  className: 'forecast',
  children: Weather.bind('forecast_days').as(days => days.map(
    day => WeatherDay(
      weekdays[day.day],
      day['icon'],
      `${Math.round(day['temp'])}°C`,
      `${Math.round(day['feelsLike'])}°C`,
    ))
  )
})

export default Widget.Box({ vertical: true }, CurrentCondition, Forecast)
