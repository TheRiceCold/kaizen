import { options } from '../../../constants/main.js'

export default (service, condition) => Widget.Separator({
  vpack: 'center',
  setup: self => {
    const visibility = () => {
      if (!options.bar.separators.value)
        return self.visible = false

      self.visible = condition && service
        ? condition(service)
        : options.bar.separators.value
    }

    if (service && condition)
      self.hook(service, visibility)

    self.on('draw', visibility)
    self.bind('visible', options.bar.separators)
  },
})
