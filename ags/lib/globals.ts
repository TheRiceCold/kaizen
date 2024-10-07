import { showWidget } from './variables'

const mpris = await Service.import('mpris')

export const toggleWidget = async (
  name:
    | 'player' | 'color' | 'annotation' | 'keyboard'
    | 'ask' | 'calendar' | 'quicksettings'
) => {
  const widgetShown = showWidget[name]

  switch (name) {
    case 'player':
      widgetShown.value = (!mpris.getPlayer()) ? false : !widgetShown.value
      break
    default:
      widgetShown.value = !widgetShown.value
      break
  }
}

globalThis['toggleWidget'] = toggleWidget
