import ScreenTools from 'service/screen'
import { showWidget } from './variables'

const mpris = await Service.import('mpris')
const systemtray = await Service.import('systemtray')

export const toggleWidget = (widget: string, name: string) => {
  const widgetShown =  showWidget[widget][name]

  if (widget === 'popup') {
    if (name === 'drawingTools')
      ScreenTools.draw()

    if (name === 'media')
      widgetShown.value = (!mpris.getPlayer()) ? false : !widgetShown.value

  } else
  widgetShown.value = !widgetShown.value
}

globalThis['toggleWidget'] = toggleWidget
