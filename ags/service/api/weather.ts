import icons from 'data/icons'

class WeatherService extends Service {
  static {
    Service.register(this, {},
      {
        icon: ['string'],
        region: ['string'],
        astronomy: ['string'],
        'daily-forecast': ['array'],
        'hourly-forecast': ['array'],
        'weather-data': ['jsobject'],
        'current-condition': ['jsobject'],
      })
  }

  _temp = 0
  _icon = ''
  _region = ''
  _astronomy = ''
  _weather_data = {}
  _daily_forecast = []
  _hourly_forecast = []
  _current_condition = {}
  _decoder = new TextDecoder()
  _url = 'http://wttr.in/?format=j1'
  _forecast_url = 'https://api.open-meteo.com/v1/forecast?'

  get icon() { return this._icon }
  get region() { return this._region }
  get astronomy() { return this._astronomy }
  get weather_data() { return this._weather_data }
  get daily_forecast() { return this._daily_forecast }
  get hourly_forecast() { return this._hourly_forecast }
  get current_condition() { return this._current_condition }

  constructor() {
    super()
    Utils.interval(900000, this.getWeather.bind(this)) // every 15 min
  }

  async getWeather() {
    try {
      const result = await Utils.fetch(this._url)

      const data = await result.json()

      const area = data['nearest_area'][0]
      const region = area['region'][0]['value']

      const astronomy = data['weather'][0]['astronomy'][0]
      const currentCondition = data['current_condition'][0]

      this.updateProperty('region', region)
      this.updateProperty('weather_data', data)
      this.updateProperty('astronomy', astronomy)
      this.updateProperty('current_condition', currentCondition)

      const curHour = new Date().getHours()
      const sunsetHour = astronomy['sunset'].split(':')[0]
      const sunriseHour = astronomy['sunrise'].split(':')[0]
      const timeOfDay = curHour >= sunriseHour && curHour <= sunsetHour + 12 ? 'day' : 'night'
      const getIcon = (code, time = '') => icons.weatherCodes[code][time ? time : timeOfDay]

      this.updateProperty('icon', getIcon(currentCondition['weatherCode']))

      const forecastHourly = 'weather_code,temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature'
      const forecastDaily = 'weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,sunrise,sunset'
      // DOCS: https://open-meteo.com/en/docs
      const getForecast = await Utils.fetch(
        `${this._forecast_url}latitude=${area['latitude']}&longitude=${area['longitude']}&daily=${forecastDaily}&hourly=${forecastHourly}`
      )
      const { daily, hourly } = await getForecast.json()

      this.updateProperty('daily_forecast', daily['time'].map(
        (time, index) => {
          /* NOTE:
            * I tried adding the right timezone paramater but I'm still not sure
            * why I have to subtract 16(sunrise) and 4(sunset) to get accurate hour
          */
          function getSun(type, index, subtract = 16) {
            const hour = Number(daily['sun'+type][index].slice(11, 16).split(':')[0]) - subtract
            const min = daily['sun'+type][index].slice(14, 16)
            return hour+':'+min
          }
          return ({
            sunrise: getSun('rise', index),
            sunset: getSun('set', index, 4),
            day: new Date(time).getDay(),
            min: daily['temperature_2m_min'][index],
            max: daily['temperature_2m_max'][index],
            windSpeed: daily['wind_speed_10m_max'][index],
            icon: getIcon(daily['weather_code'][index]),
          })
        }
      ))

      let hoursByDay = []
      const hourlyForecast = []
      for (let day = 0, i = 0; i < hourly['time'].length; i++) {
        const iconType = () => {
          const hour = Number(hourly['time'][i].slice(11, 13))
          const sunrise = Number(daily['sunrise'][day].slice(11, 13)) - 16
          const sunset = Number(daily['sunset'][day].slice(11, 13)) + 8
          return (hour >= sunrise && hour <= sunset) ? 'day' : 'night'
        }

        hoursByDay.push({
          time: hourly['time'][i],
          temp: hourly['temperature_2m'][i],
          windSpeed: hourly['wind_speed_10m'][i],
          humidity: hourly['relative_humidity_2m'][i],
          feelsLike: hourly['apparent_temperature'][i],
          icon: getIcon(hourly['weather_code'][i], iconType()),
        })

        if (hourly['time'][i].includes('23:00')) {
          hourlyForecast.push([...hoursByDay])
          hoursByDay = []
          day++
        }
      }

      this.updateProperty('hourly_forecast', hourlyForecast)
    } catch (err) { logError(err) }
  }
}

export default new WeatherService
