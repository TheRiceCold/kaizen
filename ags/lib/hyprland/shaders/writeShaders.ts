import { crtFrag } from './crtFrag'
import { invert } from './invert'
import { vibrance } from './vibrance'
import { grayscale } from './grayscale'
import { bluelight } from './bluelight'

const shaders = [
  { shader: vibrance, fileName: 'vibrance.glsl' },
  { shader: bluelight, fileName: 'bluelight.glsl' },
  { shader: grayscale, fileName: 'grayscale.glsl' },
  { shader: invert, fileName: 'invert.glsl' },
  { shader: crtFrag, fileName: 'CRT.frag' },
]

export default () => {
  shaders.forEach(({ shader, fileName }) => {
    Utils.writeFile(shader, `${TMP}/${fileName}`).catch(print)
  })
}
