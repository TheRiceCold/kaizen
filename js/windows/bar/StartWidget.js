import { Widget } from '../../imports.js'
import { RoundedCorner } from '../../misc/main.js'
import { FocusedClient, MediaIndicator, OverviewButton, SeparatorDot } from './modules/exports.js'

const Modules = [
  RoundedCorner('topleft', 'corner-black'),
  OverviewButton,
  SeparatorDot(),
  FocusedClient,
  MediaIndicator(),
]

export default Widget.Box({ children: Modules })
