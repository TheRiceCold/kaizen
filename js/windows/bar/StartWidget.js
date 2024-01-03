import { Widget } from '../../imports.js'
import { RoundedCorner } from '../../misc/main.js'
import Weather from './modules/Weather.js'
import { FocusedClient, MediaIndicator, OverviewButton, SeparatorDot } from './modules/exports.js'

const Modules = [
  RoundedCorner('topleft', 'corner-black'),
  OverviewButton,
  SeparatorDot(),
  FocusedClient,
  Weather,
  MediaIndicator(),
]

export default Widget.Box({ children: Modules })
