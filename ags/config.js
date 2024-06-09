const main = '/tmp/ags/main.js'

try {
  await Utils.execAsync(`
    esbuild --bundle ${App.configDir}/desktop/main.ts \
    --format=esm \
    --outfile=${main} \
    --external:resource://\* \
    --external:gi://\* \
  `)

  await import(`file://${main}`)
} catch (err) {
  console.error(err)
  App.quit()
}
