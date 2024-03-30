import keys from 'keys'
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
  _decoder = new TextDecoder()

  get icon() { return this._icon }
  get region() { return this._region }
  get hourly_icons() { return this._hourly_icons }
  get weather_data() { return this._weather_data }
  get forecast_days() { return this._forecast_days }
  get current_condition() { return this._current_condition }

  constructor() {
    super()
    Utils.interval(900000, this._getWeather.bind(this)) // every 15 min
  }

  async _getWeather() {
    try {
      const result = await Utils.fetch(this._url)

      const data = await result.json()

      const area = data['nearest_area'][0]
      const region = area['region'][0]['value']
      const location = `${area['latitude']},${area['longitude']}`

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

      this.updateProperty('location', location)
      this.updateProperty('icon', getIcon(currentCondition['weatherCode']))
      this.updateProperty('hourly_icons', hourly.map(hour => getIcon(hour['weatherCode'])))

      const getForecast = await Utils.fetch(`http://api.weatherapi.com/v1/forecast.json?key=${keys['WEATHER_API_KEY']}&q=${location}&days=7`)
      const forecastData = await getForecast.json()
      this.updateProperty('forecast_days', forecastData['forecast']['forecastday'].map(forecast => forecast.day))

    } catch (err) { logError(err) }
  }
}

export default new WeatherService
