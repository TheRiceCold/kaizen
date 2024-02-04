import { utils } from '../constants/main.js'
import { getOptions } from './option.js'

export default async () => {
  if (!utils.dependencies(['dart-sass'])) return

  const opts = getOptions()
  const vars = opts.map(opt => {
    if (opt.sass === 'exclude') return ''

    const unit = typeof opt.value === 'number' ? opt.unit : ''
    const value = opt.sassFormat ? opt.sassFormat(opt.value) : opt.value
    return `$${opt.sass}: ${value}${unit}`
  })

  try {
    await Utils.writeFile(vars.join('\n'), `${App.configDir}/sass/variables.sass`)
    await Utils.execAsync(`sass ${App.configDir}/sass/main.sass ${App.configDir}/main.css`)
    App.resetCss()
    App.applyCss(`${App.configDir}/main.css`)
  } catch (err) {
    if (err instanceof Error)
      console.error(err.message)
    if (typeof err === 'string') 
      console.error(err)
  }
}
