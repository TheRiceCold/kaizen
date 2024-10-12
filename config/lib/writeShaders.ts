const shaders = [
  'vibrance.glsl',
  'bluelight.glsl',
  'grayscale.glsl',
  'invert.glsl',
  'CRT.frag',
]

export default () => {
  Utils.ensureDirectory(`${CONFIG}/shaders`)

  shaders.forEach((shader) => {
    Utils.writeFile(
      Utils.readFile(`${App.configDir}/shaders/${shader}`),
      `${CONFIG}/shaders/${shader}`,
    ).catch(print)
  })
}
