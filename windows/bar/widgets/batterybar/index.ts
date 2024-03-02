import PanelButton from '../PanelButton'
import Battery from './Battery'
import Icon from './Icon'

import options from 'options'

const battery = await Service.import('battery')
const { percentage, low } = options.bar.battery

const onClicked = () => {
  percentage.value = !percentage.value
  const deg = percentage.value ? 0 : 90
  Icon.setCss(`-gtk-icon-transform: rotate(${deg}deg);`)
}

export default () => PanelButton({
  onClicked,
  child: Battery,
  hexpand: false,
  className: 'battery-bar',
  visible: battery.bind('available'),
  setup: self => self.hook(battery, w => {
    w.toggleClassName('charging', battery.charging || battery.charged)
    w.toggleClassName('low', battery.percent < low.value)
  }),
})
