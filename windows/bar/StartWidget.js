import { Widget } from '../../imports.js'
import { RoundedCorner } from '../../misc/main.js'
import { MediaIndicator, OverviewButton } from './modules/exports.js'

const Modules = [
  RoundedCorner('topleft', 'corner-black'),
  OverviewButton,
  MediaIndicator(),
]

export default Widget.Box({ children: Modules })
