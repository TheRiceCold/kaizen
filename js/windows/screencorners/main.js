import { RoundedCorner } from '../../misc/main.js'
const { Window } = Widget

export default [ 
  Window({
    layer: 'top',
    visible: true,
    name: 'cornertl',
    anchor: ['top', 'left'],
    exclusivity: 'normal',
    child: RoundedCorner('topleft', 'corner'),
  }),
  Window({
    layer: 'top',
    visible: true,
    name: 'cornertr',
    exclusivity: 'normal',
    anchor: ['top', 'right'],
    child: RoundedCorner('topright', 'corner'),
  }),
  Window({
    layer: 'top',
    visible: true,
    name: 'cornerbl',
    exclusivity: 'ignore',
    anchor: ['bottom', 'left'],
    child: RoundedCorner('bottomleft', 'corner-black'),
  }),
  Window({
    layer: 'top',
    visible: true,
    name: 'cornerbr',
    exclusivity: 'ignore',
    anchor: ['bottom', 'right'],
    child: RoundedCorner('bottomright', 'corner-black'),
  })
]
