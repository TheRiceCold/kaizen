import { Widget } from '../../imports.js'
import { RoundedCorner } from '../../misc/main.js'
import { 
  MediaIndicator, 
  OverviewButton 
} from './modules/exports.js'

export default Widget.EventBox({
  child: Widget.Box({
    children: [
      RoundedCorner('topleft', 'corner-black'),
      OverviewButton,
      MediaIndicator(),
    ]
  })
})
