const main = '/tmp/ags/lockscreen.js'
const entry = `${App.configDir}/windows/lockscreen/main.ts`

try {
  await Utils.execAsync(`
    esbuild --bundle ${App.configDir}/windows/lockscreen/main.ts \
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
