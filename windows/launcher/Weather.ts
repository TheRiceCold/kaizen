import weatherData from 'data/weather'

const getWeatherIcon = (code) => {
  switch (code) {
    case '01d': case '01n':
      return 'clear-sky'

    case '02d': case '02n':
    case '03d': case '03n':
    case '04d': case '04n':
      return 'clouds'

    case '09d': case '09n':
      return 'clouds-showers-scattered'

    case '10d': case '10n':
      return 'clouds-showers'

    case '11d': case '11n':
      return 'storms'

    case '13d': case '13n':
      return 'snow'

    case '50d': case '50n':
      return 'fog'

    default:
      return 'clear-night'
  }
}

export default () => Widget.Overlay({
  child: Widget.Box({
    className: 'launcher-weather',
    setup: self => {
      self.hook(weatherData, self => self.css = `
        background-image: url('${App.configDir}/assets/weather/weather-${getWeatherIcon(weatherData.value['weather'][0]['icon'])}.jpg');
        min-width: 20px;
        min-height:180px;
        background-size: cover;
        background-position: center;`)
    },
  }),
  overlays: [
    Widget.Box({ className: 'launcher-weather-g' }),
    Widget.Box({
      vertical: true,
      className: 'launcher-weather-info',
      children: [
        Widget.Label({
          className: 'launcher-weather-temp',
          setup: self => {
            self.hook(weatherData, (self) => {
              self.label = `${Math.trunc(weatherData.value['main']['temp'])}°C`
            })
          },
          vpack: 'center',
          hpack: 'start',
          truncate: 'end',
        }),
        Widget.Label({
          vpack: 'center',
          hpack: 'start',
          truncate: 'end',
          className: 'launcher-weather-feelslike',
          setup: self => self.hook(weatherData, self =>
            self.label = `Feels like ${Math.trunc(weatherData.value['main']['feels_like'])}°C`),
        }),
        Widget.Label({
          vpack: 'center',
          hpack: 'start',
          truncate: 'end',
          className: 'launcher-weather-city',
          setup: self => self.hook(weatherData, self => self.label = `${weatherData.value['name']}`),
        }),
      ],
    })
  ]
})
