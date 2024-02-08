import Header from './header/main.js'
import { ContentStack } from './exports.js'
import { options } from '../../constants/main.js'

export default Widget.Box({
  vertical: true,
  spacing: options.spacing.value,
  children: [ Header, ContentStack ],
  className: 'quicksettings spacing-v-15',
})
