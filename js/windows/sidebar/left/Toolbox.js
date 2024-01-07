import { Widget } from '../../../imports.js'
import { QuickScripts } from './QuickScripts.js'

export default Widget.Scrollable({
  hscroll: 'never',
  vscroll: 'automatic',
  child: Widget.Box({
    vertical: true,
    children: [
      QuickScripts(),
    ]
  })
});
