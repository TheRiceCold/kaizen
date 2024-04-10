import { opt } from 'lib/option'

export default {
  coverSize: opt(100),
  preferred: opt('spotify'),
  monochromeIcon: opt(true),
  action: opt(toggle => toggle),
  position: opt<'left' | 'center' | 'right'>('center'),
}
