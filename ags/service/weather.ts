import icons from 'data/icons'

class WeatherService extends Service {
  static {
    Service.register(this, {},
      {
        icon: ['string'],
        region: ['string'],
        hourly_icons: ['array'],
        forecast_days: ['array'],
        'weather-data': ['jsobject'],
        'current-condition': ['jsobject'],
      })
  }

  _temp = 0
  _icon = ''
  _region = ''
  _forecast_days = []
  _hourly_icons = []
  _weather_data = {}
  _current_condition = {}
  _url = 'http://wttr.in/?format=j1'
  _forecast_url = 'https://api.open-meteo.com/v1/forecast?'
  _decoder = new TextDecoder()

  get icon() { return this._icon }
  get region() { return this._region }
  get hourly_icons() { return this._hourly_icons }
  get weather_data() { return this._weather_data }
  get forecast_days() { return this._forecast_days }
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

      const hourly = data['weather'][0]['hourly']
      const astronomy = data['weather'][0]['astronomy'][0]
      const currentCondition = data['current_condition'][0]

      this.updateProperty('region', region)
      this.updateProperty('weather_data', data)
      this.updateProperty('current_condition', currentCondition)

      const curHour = new Date().getHours()
      const sunsetHour = astronomy['sunset'].split(':')[0]
      const sunriseHour = astronomy['sunrise'].split(':')[0]
      const timeOfDay = curHour >= sunriseHour && curHour <= sunsetHour + 12 ? 'day' : 'night'
      const getIcon = (code: string) => 'wi-' + icons.weather[timeOfDay][code] || icons.weather['day'][code] || ''

      this.updateProperty('icon', getIcon(currentCondition['weatherCode']))
      this.updateProperty('hourly_icons', hourly.map(hour => getIcon(hour['weatherCode'])))

      const forecastDaily = 'weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min'
      const forecastHourly = 'temperature_2m,relative_humidity_2m,wind_speed_10m'
      // DOCS: https://open-meteo.com/en/docs
      const getForecast = await Utils.fetch(
        `${this._forecast_url}latitude=${area['latitude']}&longitude=${area['longitude']}&daily=${forecastDaily}&hourly=${forecastHourly}`
      )
      const { daily }= await getForecast.json()
      this.updateProperty('forecast_days', daily['time'].map((time, index) => ({
        day: new Date(time).getDay(),
        icon: getIcon(daily['weather_code'][index]),
        temp: (daily['temperature_2m_max'][index] + daily['temperature_2m_min'][index]) / 2,
        feelsLike: (daily['apparent_temperature_max'][index] + daily['apparent_temperature_min'][index]) / 2,
      })))
    } catch (err) { logError(err) }
  }
}

export default new WeatherService
