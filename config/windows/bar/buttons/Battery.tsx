import { bind } from 'astal'

import BatteryService from 'gi://AstalBattery'

const batt = BatteryService.get_default()

export default() => (
  <button className='icon-button'>
    <icon
      visible={bind(batt, 'isPresent')}
      icon={bind(batt, 'batteryIconName')}
      tooltipText={bind(batt, 'percentage').as((p: number) => `${Math.floor(p * 100)}%`)}
    />
  </button>
)
