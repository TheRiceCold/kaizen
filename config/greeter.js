try {
  const main = `/home/${Utils.USER}/.config/kaizen/greeter.js`
  const entry = `${App.configDir}/greeter/main.ts`

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
