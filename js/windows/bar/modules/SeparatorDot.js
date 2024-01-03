import { Widget } from '../../../imports.js'
import { options } from '../../../constants/main.js'

export default (service, condition) => {
  const visibility = self => {
    if (!options.bar.separators.value)
      return self.visible = false

    self.visible = condition && service
      ? condition(service)
      : options.bar.separators.value
  }

  const conn = service ? [[service, visibility]] : []
  return Widget.Separator({
    vpack: 'center',
    connections: [['draw', visibility], ...conn],
    binds: [['visible', options.bar.separators]],
  })
}
