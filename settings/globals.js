import { App, Audio, Mpris } from '../imports.js'

export default async () => {
  try {
    globalThis.options = (await import('../options.js')).default
    // globalThis.iconBrowser = (await import('../misc/IconBrowser.js')).default
    globalThis.app = App.default
    globalThis.audio = Audio.default
    globalThis.recorder = (await import('../services/ScreenRecorder.js')).default
    globalThis.brightness = (await import('../services/Brightness.js')).default
    globalThis.indicator = (await import('../services/onscreenindicator.js')).default

    Mpris.players.forEach(player => {
      player.connect('changed', player => {
        globalThis.mpris = player || Mpris.players[0]
      })
    })

    Mpris.connect('player-added', (mpris, bus) => {
      mpris.getPlayer(bus)?.connect('changed', player => {
        globalThis.mpris = player || Mpris.players[0]
      })
    })

    Mpris.connect('player-closed', () => {
      globalThis.mpris = Mpris.players[0]
    })
  } catch (error) { logError(error) }
}
