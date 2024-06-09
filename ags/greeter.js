const main = '/tmp/ags/greeter.js'

try {
  await Utils.execAsync(`
    esbuild --bundle ${App.configDir}/windows/desktop/main.ts \
    --format=esm \
    --outfile=${main} \
    --external:resource://\* \
    --external:gi://\* \
  `)
  await import(`file://${main}`)
} catch (error) {
  console.error(error)
  App.quit()
}

export { }
