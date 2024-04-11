import options from 'options'
import Weather from 'service/weather'

const numberOfHours = 3
const x = ['Morning', 'Noon', 'Evening', 'Night']

const Hour = (value: string, icon: string) => Widget.Box({
  vertical: true,
  children: [ Widget.Icon(icon), Widget.Label(value) ]
})

export default Widget.Box({
  className: 'hourly',
  spacing: options.theme.spacing * 1.5,
  children: Weather.bind('hourly_icons')
    .as(icons => icons.slice(0, numberOfHours)
      .map((icon, index) => Hour(x[index], icon)))
})
