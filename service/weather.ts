import icons from 'data/icons'

class WeatherService extends Service {
  static {
    Service.register(this, {},
      {
        icon: ['string'],
        region: ['string'],
        country: ['string'],
        weather_days: ['array'],
        hourly_icons: ['array'],
        'weather-data': ['jsobject'],
        'current-condition': ['jsobject'],
      })
  }

  _temp = 0
  _icon = ''
  _region = ''
  _country = ''
  _weather_days = []
  _hourly_icons = []
  _weather_data = {}
  _current_condition = {}
  _url = 'http://wttr.in/?format=j1'
  _decoder = new TextDecoder()

  get icon() { return this._icon }
  get region() { return this._region }
  get country() { return this._country }
  get weather_days() { return this._weather_days }
  get hourly_icons() { return this._hourly_icons }
  get weather_data() { return this._weather_data }
  get current_condition() { return this._current_condition }

  constructor() {
    super()
    Utils.interval(900000, this._getWeather.bind(this)) // every 15 min
  }

  _getWeather() {
    Utils.fetch(this._url)
      .then(result => result.json())
      .then(result => {
        const weatherData = result
        const area = weatherData['nearest_area'][0]
        const region = area['region'][0]['value']
        const country = area['country'][0]['value']
        const currentCondition = weatherData['current_condition'][0]
        const astronomy = weatherData['weather'][0]['astronomy'][0]
        const hourly = weatherData['weather'][0]['hourly']

        this.updateProperty('region', region)
        this.updateProperty('country', country)
        this.updateProperty('weather_data', weatherData)
        this.updateProperty('current_condition', currentCondition) 

        const curHour = new Date().getHours()
        const sunsetHour = astronomy['sunset'].split(':')[0]
        const sunriseHour = astronomy['sunrise'].split(':')[0]
        const timeOfDay = curHour >= sunriseHour && curHour <= sunsetHour + 12 ? 'day' : 'night'
        const getIcon = code => 'wi-' + icons.weather[timeOfDay][code] || icons.weather['day'][code] || ''

        this.updateProperty('icon', getIcon(currentCondition['weatherCode']))
        this.updateProperty('hourly_icons', hourly.map(hour => getIcon(hour['weatherCode'])))

        this.updateProperty('weather_days', weatherData['weather'].map((day, index) => ({
          icon: getIcon(day['hourly'][0]['weatherCode']),
          temp: day['avgtempC'],
          maxTemp: day['maxtempC'],
        })))
      }).catch(logError)
  }
}

export default new WeatherService
