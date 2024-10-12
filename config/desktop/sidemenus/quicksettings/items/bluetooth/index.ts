import { ButtonLabel, VBox } from 'widgets'
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
  setConnection: (active: boolean) => void
}

const header = Header('Bluetooth', [
  ButtonLabel(
    bluetooth.bind('enabled').as((p: boolean) => `Status: ${p ? 'enabled' : 'disabled'}`),
    () => bluetooth.enabled = !bluetooth.enabled,
    { tooltipText: 'Click to toggle' }),

  ButtonLabel('Settings', () => { if (dependencies('blueman-manager')) sh('blueman-manager') })
])

const list = Widget.Scrollable({
  vexpand: true,
  hscroll: 'never',
  vscroll: 'automatic',
}, VBox().bind('children', bluetooth, 'devices', (ds: TDevice[]) => ds.filter((d: TDevice) => d.name).map(Device)))

export default VBox({ className: 'bluetooth-list' }, header, list)
