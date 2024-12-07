import options from 'options'
import { sendBatch } from './utils/hyprland'

const { widget, popup } = options.keybinds
export type PopupType =  'ask' | 'player' | 'calendar'
export type WidgetType =  'run' | 'dashboard' | 'cheatsheet'

async function setupKeybinds() {
  await sendBatch([
    ...Object.keys(widget)
      .map(key => `bind = ${widget[key as WidgetType].get()}, exec, 'ags -i desktop toggle ${key}'`
    )
  ])
}

export default() => {
  setupKeybinds()
  options.handler(['keybinds'], async () => await setupKeybinds())
}
