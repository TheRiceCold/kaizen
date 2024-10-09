const shaders = [
  'vibrance.glsl',
  'bluelight.glsl',
  'grayscale.glsl',
  'invert.glsl',
  'CRT.frag',
]

export default () => {
  Utils.ensureDirectory(`${TMP}/shaders`)

  shaders.forEach((shader) => {
    Utils.writeFile(
      Utils.readFile(`${App.configDir}/shaders/${shader}`),
      `${TMP}/shaders/${shader}`,
    ).catch(print)
  })
}
