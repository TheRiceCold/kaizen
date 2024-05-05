import icons from 'data/icons'
import { dependencies, sh, bash } from 'lib/utils'

const { GLib } = imports.gi

class ScreenTools extends Service {
  static { 
    Service.register(this, {}, { 
      timer: [ 'int' ], 
      isRecording: [ 'boolean' ],
    }) 
  }

  #recordings = Utils.HOME + '/Videos/Records'
  #screenshots = Utils.HOME + '/Fotos/Captura'
  #file = ''
  #interval = 0

  timer = 0
  isRecording = false

  async recorder(option: 'region' | 'fullscreen' | 'stop' = 'region') {
    if (!dependencies('slurp', 'wl-screenrec')) return

    if (this.isRecording && option === 'stop') 
      this.recorderStop()
    else if (!this.isRecording) {
      const dateFormat = '%Y-%m-%d_%H-%M-%S'
      const now = GLib.DateTime.new_now_local().format(dateFormat)

      Utils.ensureDirectory(this.#recordings)
      this.#file = `${this.#recordings}/${now}.mp4`
      if (option === 'fullscreen')
        sh(`wl-screenrec -f ${this.#file}`)
      if (option === 'region')
        sh(`wl-screenrec -g "${await sh('slurp')}" -f ${this.#file}`)

      this.isRecording = true
      this.changed('isRecording')

      this.timer = 0
      this.#interval = Utils.interval(1000, () => { this.changed('timer'); this.timer++ })
    }
  }

  async recorderStop() {
    await bash`killall -USR1 wl-screenrec`
    this.isRecording = false
    this.changed('isRecording')
    GLib.source_remove(this.#interval)

    Utils.notify({
      summary: 'Screenrecord',
      body: this.#file,
      iconName: icons.fallback.video,
      actions: {
        'Show in Files': () => sh(`xdg-open ${this.#recordings}`),
        View: () => sh(`xdg-open ${this.#file}`),
      },
    })
  }

  async snip() { Utils.notify('Fucking snip') }

  async zoom(amount: string | number = '') {
    if (!dependencies('pypr')) return
    sh(`pypr zoom ${amount}`)
  }
}

export default new ScreenTools
