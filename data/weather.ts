
export default Variable({
  weather: [
    {
      id: 701,
      main: "Weather Not Availalbe",
      description: "Connect To Internet",
      icon: "50d"
    }
  ],
  base: 'stations',
  main: {
    temp: 0,
    feels_like: '0',
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0
  },
  visibility: 1000,
  wind: { speed: 0, deg: 0 },
  clouds: { all: 20 },
  name: 'Weather Not Available!',
})
