import options from 'options'
import Weather from 'service/weather'

const numberOfHours = 3

const Hour = (value: string, icon: string) => Widget.Box({
  vertical: true,
  children: [ Widget.Label(value), Widget.Icon(icon) ]
})

export default Widget.Box({
  className: 'hourly',
  spacing: options.theme.spacing * 1.5,
  children: Weather.bind('hourly_icons')
    .as(icons => icons.slice(0, numberOfHours)
      .map((icon, index) => Hour('11:00PM', icon)))
})
