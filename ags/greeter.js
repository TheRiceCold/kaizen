try {
  const main = '/tmp/ags/greeter.js'
  await Utils.execAsync(`
    esbuild --bundle ${App.configDir}/windows/desktop/main.ts \
    --format=esm \
    --outfile=${main} \
    --external:resource://* \
    --external:gi://* \
  `)
  await import(`file://${main}`)
} catch (err) {
  console.error(err)
  App.quit()
}
