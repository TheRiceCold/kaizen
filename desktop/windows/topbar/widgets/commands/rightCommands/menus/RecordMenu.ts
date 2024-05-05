import { type MenuItemProps } from 'types/widgets/menuitem'
import screenTools from 'service/screen'

import Menu from '../../Menu'

import { capitalize } from 'lib/utils'

const recorder = (option: 'region' | 'fullscreen') => ({
  label: capitalize(option),
  onActivate: () => screenTools.recorder(option)
})

const commands: MenuItemProps[] = [
  recorder('fullscreen'),
  recorder('region'),
  { label: 'Voice', onActivate: () => { } },
  { label: 'Open Files', onActivate: () => { } },
]

export default self => Menu(self, commands)
