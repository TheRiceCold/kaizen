import { App, Widget, Variable } from '../../../imports.js'

const weather = Variable({}, {
  poll: [30000, `python ${App.configDir}/bin/weather`, out => JSON.parse(out)],
})

export default Widget.Label({
  className: 'weather',
  binds: [
    ['label', weather, 'value', value => value.text || '󰇘'],
    ['tooltip-text', weather, 'value', value => value.tooltip || '󰇘'],
  ],
})
