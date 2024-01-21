import { Widget } from '../../../imports.js'
import { options } from '../../../constants/main.js'

const { separators } = options.bar

export default (service, condition) => {
  const visibility = self => {
    if (!separators.value)
      return self.visible = false

    self.visible = condition && service
      ? condition(service)
      : separators.value
  }

  const conn = service ? [[service, visibility]] : []

  return Widget.Separator({
    vpack: 'center',
    connections: [['draw', visibility], ...conn],
    binds: [['visible', separators]],
  })
}
