import options from 'options'
const { GLib } = imports.gi

const clock = Variable(
  GLib.DateTime.new_now_local(),
  { poll: [5000, () => GLib.DateTime.new_now_local()] }
)

const weatherData = Variable({
  FeelsLikeC: '0',
  FeelsLikeF: '0',
  cloudcover: '0',
  humidity: '0',
  localObsDateTime: "2024-03-14 03:46 AM",
  observation_time: "07:46 PM",
  precipInches: '0.0',
  precipMM: '0.0',
  pressure: '0',
  pressureInches: "0",
  temp_C: '0',
  temp_F: '0',
  uvIndex: '0',
  visibility: '10',
  visibilityMiles: '6',
  weatherCode: '116',
  weatherDesc: [ { value: 'Weather not available' } ],
  weatherIconUrl: [ { value: '' } ],
  winddir16Point: 'ESE',
  winddirDegree: '0',
  windspeedKmph: '0',
  windspeedMiles: '0'
})

try {
  print('TRY CATCH')
  Utils.interval(1000 * 60 * 60, () => {
    Utils.fetch(options.api.weather.url).then(res => res.json()).then(res => {
      const x = res.current_condition[0]
      print(x)
      weatherData.value = x
    })
  })
} catch(err) {
  print(err)
}

export { clock, weatherData }
