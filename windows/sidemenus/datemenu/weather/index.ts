import Weather from 'service/weather'
import Forecast from './Forecast'
import options from 'options'

const currentCondition = Weather.bind('current_condition')

const Region = Widget.Label({ className: 'region', label: Weather.bind('region') })

const Temp = Widget.Box(
  { hpack: 'center', className: 'temp' },
  Widget.Label({
    hpack: 'start',
    vpack: 'center',
    truncate: 'end',
    label: currentCondition.as(c => c['temp_C'] + '°C')
  }),
  Widget.Icon({ className: 'icon', icon: Weather.bind('icon') })
)

const Description = Widget.Label({ 
  className: 'description',
  label: currentCondition.as(c => c.weatherDesc[0].value) })

function CurrentCondition() {
  const Label = (name: string, value: string) => Widget.Box({
    vertical: true,
    className: 'current-condition',
    children: [ 
      Widget.Label(name), 
      Widget.Label({ label: value }),
    ]
  })

  return Widget.Box(
    { spacing: options.theme.spacing },
    Label('Wind', currentCondition.as(c => `${c.windspeedKmph}km/h`)),
    Label('Humidity', currentCondition.as(c => `${c.humidity}%`)),
    Label('Feels Like', currentCondition.as(c => `${c.FeelsLikeC}°C`)),
  )
}

const Today = Widget.Box({
  vertical: true,
  vpack: 'center',
  className: 'current-weather',
  children: [ 
    Region, Temp, 
    Description, 
    CurrentCondition(),
  ]
})

export default Widget.Box([ Today, Forecast ])
