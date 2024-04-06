import { type Props as RevealerProps } from 'types/widgets/revealer'
import PopupRevealer from '../PopupRevealer'

const systemTray = await Service.import('systemtray')

export default PopupRevealer({
  vertical: true,
  child: Widget.Label('GROMIT-MPX')
}).hook(systemTray, (self: RevealerProps) => {
  self.revealChild = systemTray.items.find((i: any) => i.id === 'gromit-mpx')
})
