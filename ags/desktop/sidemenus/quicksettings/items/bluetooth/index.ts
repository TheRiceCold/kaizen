import Header from '../Header'
import Device from './Device'

import { sh, dependencies } from 'lib/utils'

const bluetooth = await Service.import('bluetooth')
export type TDevice = {
  address: string,
  alias: string,
  battery_level: number,
  battery_percentage: number,
  connected: boolean,
  icon_name: string,
  name: string,
  paired: boolean,
  trusted: boolean,
  type: string,
  connecting: boolean
}

const header = Header('Bluetooth', [
  Widget.Button({
    cursor: 'pointer',
    tooltipText: 'Click to toggle',
    onClicked() { bluetooth.enabled = !bluetooth.enabled },
    label: bluetooth.bind('enabled').as((p: boolean) => `Status: ${p ? 'enabled' : 'disabled'}`),
  }),

  Widget.Button({
    label: 'Settings',
    cursor: 'pointer',
    onClicked() {
      if (dependencies('blueman-manager'))
        sh('blueman-manager')
    }
  })
])

const list = Widget.Scrollable({
  vexpand: true,
  hscroll: 'never',
  vscroll: 'automatic',
  child: Widget.Box({ vertical: true })
    .bind('children', bluetooth, 'devices',
      (ds: TDevice[]) => ds.filter((d: TDevice) => d.name).map(Device))
})

export default Widget.Box({ vertical: true, className: 'bluetooth-list' }, header, list)
