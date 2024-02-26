import Header from './Header'
import { ContentStack } from './imports'

export default Widget.Box({
  vertical: true,
  className: 'quicksettings',
  children: [ Header, ContentStack ],
})
