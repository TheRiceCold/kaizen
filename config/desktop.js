try {
  const main = `/home/${Utils.USER}/.config/kaizen/desktop.js`
  const entry = `${App.configDir}/desktop/main.ts`

  await Utils.execAsync([
    'bun', 'build', entry,
    '--outfile', main,
    '--external', 'resource://*',
    '--external', 'gi://*',
    '--external', 'file://*'
  ])
  await import(`file://${main}`)
} catch (err) {
  console.error(err)
  App.quit()
}
