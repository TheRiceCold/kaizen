const main = '/tmp/ags/lockscreen.js'
const entry = `${App.configDir}/windows/lockscreen/main.ts`

try {
  await Utils.execAsync([
    'bun', 'build', entry,
    '--outfile', main,
    '--external', 'resource://*',
    '--external', 'gi://*',
    '--external', 'file://*',
  ])

  await import(`file://${main}`)
} catch (err) {
  console.error(err)
  App.quit()
}
