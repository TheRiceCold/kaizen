import { Widget } from '../../imports.js'
import { 
  DateButton,
  FocusedClient,
  Separator, 
} from './modules/exports.js'

export default Widget.Box({
  children: [ 
    FocusedClient,
    Separator(),
    DateButton,
  ]
})
