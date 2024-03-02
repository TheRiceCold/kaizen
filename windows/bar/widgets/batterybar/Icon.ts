import icons from 'data/icons'

const battery = await Service.import('battery')

export default Widget.Icon({
  icon: icons.battery.charging,
  visible: Utils.merge([
    battery.bind('charging'),
    battery.bind('charged'),
  ], (ing, ed) => ing || ed),
})
