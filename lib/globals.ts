import { showWidget } from './variables'

const mpris = await Service.import('mpris')

export const toggleWidget = async (widget: string, name: string) => {
  const widgetShown =  showWidget[widget][name]

  if (widget === 'popup' && name === 'media')
    widgetShown.value = (!mpris.getPlayer()) ? false : !widgetShown.value

  else widgetShown.value = !widgetShown.value
}

globalThis['toggleWidget'] = toggleWidget
