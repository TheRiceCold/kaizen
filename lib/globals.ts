import { showWidget } from './variables'

const mpris = await Service.import('mpris')

export const toggleWidget = async (
  name: 
    | 'media' | 'color' | 'annotation' | 'keyboard'
    | 'apis' | 'datemenu' | 'quicksettings'
) => {
  const widgetShown =  showWidget[name]

  switch(name) {
    case 'media':
      widgetShown.value = (!mpris.getPlayer()) ? false : !widgetShown.value
      break
    default: 
      widgetShown.value = !widgetShown.value
      break
  }
}

globalThis['toggleWidget'] = toggleWidget
