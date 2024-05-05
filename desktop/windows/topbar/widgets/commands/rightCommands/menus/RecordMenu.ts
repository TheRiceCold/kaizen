import screenTools from 'service/screen'
import Menu from '../../Menu'

import { capitalize } from 'lib/utils'

const recorder = (
  option: 'region' | 'fullscreen', 
  audio: boolean = false
) => ({
  onActivate: () => screenTools.recorder(option),
  label: `${capitalize(option)}${audio ? ' (Audio)' : ''}`,
})

export default self => Menu(self, [
  recorder('region'),
  recorder('fullscreen'),
  recorder('region', true),
  recorder('fullscreen', true),
])
