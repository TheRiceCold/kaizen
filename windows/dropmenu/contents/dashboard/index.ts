import Header from './header'
import Notifications from './notifications'
import options from 'options'
import weatherData from 'data/weather'

const getWeatherIcon = (code) => {
  if (code === "01d" || code === "01n") {
    return "clear-sky";
  } else if (code === "02d" || code === "02n" || code === "03d" || code === "03n" || code === "04d" || code === "04n") {
    return "clouds";
  } else if (code === "09d" || code === "09n") {
    return "clouds-showers-scattered";
  } else if (code === "10d" || code === "10n") {
    return "clouds-showers";
  } else if (code === "11d" || code === "11n") {
    return "storms";
  } else if (code === "13d" || code === "13n") {
    return "snow";
  } else if (code === "50d" || code === "50n") {
    return "fog";
  } else {
    return "clear-night";
  }
}

// Utils.interval(1000 * 60 * 60, () => {
//   Utils.fetch(`https://api.openweathermap.org/data/2.5/weather?q=${GLOBAL['CITY']}&appid=${GLOBAL['OPENWEATHERAPIKEY']}&units=metric`)
//   .then(res => res.json())
//   .then(res => weatherData.value = res)
// })

// `http://api.weatherapi.com/v1/current.json?key=${options.api.weather.key}&q=${options.api.weather.city}`

export default Widget.Box({
  vertical: true,
  className: 'dashboard',
  spacing: options.theme.spacing,
  children: [
    Header,
    // Widget.Box({
    //   className: 'calendar',
    //   children: [ Widget.Calendar({ hexpand: true }) ],
    // }),
    Notifications,
    Widget.Overlay({
      child: Widget.Box({
        className: 'weather',
        setup: self => {
          self.hook(weatherData, (self) => self.css = `
            background-image: url('${App.configDir}/assets/weather/weather-${getWeatherIcon(weatherData.value['weather'][0]['icon'])}.jpg');
            min-width: 20px;
            min-height: 160px;
            background-size: cover;
            background-position: center;`
          )
        }
      }),
      overlays: [
        Widget.Box({ className: 'overlay' }),
        Widget.Box({
          vertical: true,
          className: 'info',
          children: [
            Widget.Label({
              vpack: 'center',
              hpack: 'start',
              truncate: 'end',
              className: 'temp',
              setup: self => self.hook(
                weatherData,
                self => self.label = `${Math.trunc(weatherData.value['main']['temp'])}°C`),
            }),
            Widget.Label({
              vpack: 'center',
              hpack: 'start',
              truncate: 'end',
              className: 'feelslike',
              setup: self => self.hook(
                weatherData,
                self => self.label = `Feels like ${Math.trunc(weatherData.value['main']['feels_like'])}°C`),
            }),
            Widget.Label({
              className: 'city',
              vpack: 'center',
              hpack: 'start',
              truncate: 'end',
              setup: self => self.hook(
                weatherData,
                self => self.label = `${weatherData.value['name']}`),
            }),
          ],
        })
      ]
    })
  ]
})
