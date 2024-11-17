import { bind } from 'astal'

import NetworkService from 'gi://AstalNetwork'

const { wifi } = NetworkService.get_default()

export default () => (
  <button className='icon-button'>
    <icon
      icon={bind(wifi, 'iconName')}
      tooltipText={bind(wifi, 'ssid').as(String)}
    />
  </button>
)
