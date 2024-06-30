import { Title } from '..'

import { Item } from '..'
import ListRevealer from '../../../ListRevealer'

import options from 'options'

const { workspaces } = options

export default Widget.Box(
  { vertical: true, className: 'advanced-stack' },
  Title({ label: 'Advanced', leftTo: 'themes', rightTo: 'general' }),
  ListRevealer('Workspaces', Widget.Box(
    { vertical: true },
    Item('Number of workspace', { opt: workspaces.num }),
    Item('Scale', { opt: workspaces.scale }),
  )),
)
