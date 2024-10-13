import { opt } from 'lib/option'

type LayoutType = 'dwindle' | 'master' | 'scroll'

type ShaderType =
  | 'default'
  | 'vibrance'
  | 'bluelight'
  | 'grayscale'
  | 'invert'
  | 'CRT'

export default {
  gapsIn: opt<number>(1.5),
  gapsOut: opt<number>(1.5),
  gapsWhenOnly: opt<boolean>(true),
  inactiveBorder: opt('333333ff'),
  layout: opt<LayoutType>('dwindle'),
  shader: opt<ShaderType>('default'),
}
