import { App, Audio, Mpris } from '../imports.js'
import { showMusicControls } from '../constants/variables.js'

export default async () => {
  try {
    // globalThis.options = (await import('../constants/options.js')).default
    globalThis.App = App
    globalThis.Mpris = Mpris
    globalThis.openMusicControls = showMusicControls
    // globalThis.audio = Audio.default

    // globalThis.recorder = (await import('../services/ScreenRecorder.js')).default
    // globalThis.brightness = (await import('../services/Brightness.js')).default
    // globalThis.indicator = (await import('../services/Indicator.js')).default

    // Mpris.players.forEach(player => {
    //   player.connect('changed', player => {
    //     globalThis.mpris = player || Mpris.players[0]
    //   })
    // })

    // Mpris.connect('player-added', (mpris, bus) => {
    //   mpris.getPlayer(bus)?.connect('changed', player => {
    //     globalThis.mpris = player || Mpris.players[0]
    //   })
    // })

    // Mpris.connect('player-closed', () => {
    //   globalThis.mpris = Mpris.players[0]
    // })
  } catch (error) { logError(error) }
}
