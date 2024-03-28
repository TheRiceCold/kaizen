import Weather from 'service/weather'
import NextDays from './NextDays'
import Hourly from './Hourly'

const Region = Widget.Label({ className: 'region', label: Weather.bind('region') })

const CurrentCondition = Widget.Box({ 
  hpack: 'center', 
  children: [ 
    Widget.Label({
      hpack: 'start',
      vpack: 'center',
      truncate: 'end',
      className: 'temp',
      label: Weather.bind('current_condition').as(current => !!current['temp_C'] ? current['temp_C'] + '°C' : 'Wait...')
    }),
    Widget.Icon({ className: 'icon', icon: Weather.bind('icon') })
  ] 
})

const Today = Widget.Box ({
  vertical: true,
  vpack: 'center',
  className: 'current-weather',
  children: [ Region, CurrentCondition, Hourly ]
})

export default Widget.Box([ Today, NextDays ])
