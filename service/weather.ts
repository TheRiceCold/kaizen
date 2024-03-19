import icons from 'data/icons'

class WeatherService extends Service {
  static {
    Service.register(this, {},
      {
        'feels-like': ['int'],
        'temp': ['int'],
        'icon': ['string'],
        'region': ['string'],
        'country': ['string'],
        'location': ['string'],
        'description': ['string'],
        'weather-data': ['jsobject'],
      })
  }

  _temp = 0
  _icon = ''
  _region = ''
  _country = ''
  _location = ''
  _feels_like = 0
  _description = ''
  _weather_data = {}
  _url = 'http://wttr.in/?format=j1'
  _decoder = new TextDecoder()

  get temp() { return this._temp }
  get icon() { return this._icon }
  get region() { return this._region }
  get country() { return this._country }
  get location() { return this._location }
  get feels_like() { return this._feels_like }
  get description() { return this._description }
  get weather_data() { return this._weather_data }

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

        this.updateProperty('region', region)
        this.updateProperty('country', country)
        this.updateProperty('location', `${region}, ${country}`)
        this.updateProperty('weather_data', weatherData)
        this.updateProperty('temp', Number(currentCondition['temp_C']))
        this.updateProperty('feels_like', Number(currentCondition['FeelsLikeC']))
        this.updateProperty('description', currentCondition['weatherDesc'][0]['value'])

        const curHour = new Date().getHours()
        const weatherCode = currentCondition['weatherCode']
        const sunsetHour = astronomy['sunset'].split(':')[0]
        const sunriseHour = astronomy['sunrise'].split(':')[0]
        const timeOfDay = curHour >= sunriseHour && curHour <= sunsetHour + 12 ? 'day' : 'night'
        this.updateProperty('icon', icons.weather[timeOfDay][weatherCode]
          || icons.weather['day'][weatherCode] // fallback to day
          || '')
      })
      .catch(logError)
  }
}

export default new WeatherService
