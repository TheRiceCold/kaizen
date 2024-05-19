import Weather from 'service/weather'
import options from 'options'

const d = new Date()
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface IForecastDay {
  maxtemp_c: number
  maxtemp_f: number
  mintemp_c: number
  mintemp_f: number
  avgtemp_c: number
  avgtemp_f: number
  maxwind_mph: number
  maxwind_kph: number
  avghumidity: number
  daily_will_it_rain: number
  daily_change_of_rain: number
  daily_will_it_snow: number
  daily_change_of_snow: number
  condition: {
    text: string
    icon: string
    code: number
  }
  uv: number
}

const WeatherDay = (
  day: string,
  icon: string,
  temp: string,
  maxTemp: string
) => Widget.Box(
  { vpack: 'center' },
  Widget.Label({ className: 'day', label: day }),
  Widget.Icon({ icon }),
  Widget.Label({ className: 'temp', label: temp }),
  Widget.Label(maxTemp)
)

export default Widget.Box({
  vertical: true,
  vpack: 'center',
  className: 'forecast',
  spacing: options.theme.spacing * 0.75,
  children: Weather.bind('forecast_days').as((days: IForecastDay[]) => days.map((w: IForecastDay, index: number) => {
    const day = d.getDay() + index + 1
    return WeatherDay(
      weekdays[day > 6 ? 0 : day],
      'wi-fog',
      `${w['avgtemp_c']}°C`, `${w['maxwind_kph']} km/h`
    )
  }))
})
