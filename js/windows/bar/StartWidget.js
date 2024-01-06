import { Widget } from '../../imports.js'
import { RoundedCorner } from '../../misc/main.js'
import { Music, FocusedClient, OverviewButton, SeparatorDot } from './modules/exports.js'

const Modules = [
  RoundedCorner('topleft', 'corner-black'),
  OverviewButton,
  SeparatorDot(),
  FocusedClient,
  Music,
]

export default Widget.Box({ children: Modules })
