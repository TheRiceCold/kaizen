import Header from '../Header'
import Device from './Device'

import { sh } from 'lib/utils'
import { setupCursorHover } from 'misc/cursorhover'

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
    setup: setupCursorHover,
    tooltipText: 'Click to toggle',
    onClicked: () => bluetooth.enabled = !bluetooth.enabled,
    label: bluetooth.bind('enabled').as((p: boolean) => `Status: ${p ? 'enabled' : 'disabled'}`),
  }),

  Widget.Button({
    label: 'Settings',
    setup: setupCursorHover,
    onClicked: () => sh('blueman-manager')
  }) 
])

const list = Widget.Scrollable({
  vexpand: true,
  hscroll: 'never',
  vscroll: 'automatic',
  child: Widget.Box({
    vertical: true,
    children: bluetooth.bind('devices').as(
      (ds: TDevice[]) => ds.filter((d: TDevice) => d.name).map(Device)
    ),
  })
})

export default Widget.Box({ vertical: true, className: 'bluetooth-list' }, header, list)
