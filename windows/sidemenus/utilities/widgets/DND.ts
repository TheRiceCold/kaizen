import { SimpleToggleButton } from '../ToggleButton'
import icons from 'data/icons'

const n = await Service.import('notifications')
const dnd = n.bind('dnd')

export const DND = () => SimpleToggleButton({
  toggle: () => n.dnd = !n.dnd,
  connection: [n, () => n.dnd],
  label: dnd.as(dnd => dnd ? 'Silent' : 'Noisy'),
  icon: dnd.as(dnd => icons.notifications[dnd ? 'silent' : 'noisy']),
})
