import { Widget } from '../../imports.js'
import { RoundedCorner } from '../../misc/main.js'

export default [ 
  Widget.Window({
    name: 'cornertl',
    layer: 'top',
    anchor: ['top', 'left'],
    exclusivity: 'normal',
    visible: true,
    child: RoundedCorner('topleft', { className: 'corner' }),
  }),
  Widget.Window({
    name: 'cornertr',
    layer: 'top',
    anchor: ['top', 'right'],
    exclusivity: 'normal',
    visible: true,
    child: RoundedCorner('topright', { className: 'corner' }),
  }),
  Widget.Window({
    name: 'cornerbl',
    layer: 'top',
    anchor: ['bottom', 'left'],
    exclusivity: 'ignore',
    visible: true,
    child: RoundedCorner('bottomleft', { className: 'corner-black' }),
  }),
  Widget.Window({
    name: 'cornerbr',
    layer: 'top',
    anchor: ['bottom', 'right'],
    exclusivity: 'ignore',
    visible: true,
    child: RoundedCorner('bottomright', { className: 'corner-black' }),
  })
]
