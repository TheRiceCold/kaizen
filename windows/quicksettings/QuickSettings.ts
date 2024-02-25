import Header from './Header'
import { ContentStack, switchTab, currentTabId, contents } from './imports'

import options from 'options'

export default Widget.Box({
  vertical: true,
  // spacing: options.theme.spacing.value,
  children: [
    Header,
    ContentStack
  ],
  className: 'quicksettings',
})
