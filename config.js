const main = '/tmp/ags/main.js'
const outdir = `${App.configDir}/main.ts`

try {
  await Utils.execAsync([
    'bun', 'build', outdir,
    '--outfile', main,
    '--external', 'resource://*',
    '--external', 'gi://*',
    '--external', 'file://*',
  ])
} catch (err) {
  console.error(err)
  App.quit()
}

export default (await import(`file://${main}`)).default
