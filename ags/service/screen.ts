import icons from 'data/icons'
import { dependencies, sh, bash } from 'lib/utils'

const { GLib } = imports.gi
const dateFormat = '%Y-%m-%d_%H-%M-%S'
const now = GLib.DateTime.new_now_local().format(dateFormat)

class ScreenTools extends Service {
  static {
    Service.register(this, {}, {
      timer: ['int'],
      isZoomed: ['boolean'],
      isRecording: ['boolean'],
    })
  }

  _recordings = Utils.HOME + '/Videos/Records'
  _screenshots = Utils.HOME + '/Fotos/Captura'
  _file = ''
  _interval = 0

  timer = 0
  _isZoomed = false
  _isRecording = false

  get isZoomed() {
    return this._isZoomed
  }
  get isRecording() {
    return this._isRecording
  }

  async recorder(option: 'region' | 'fullscreen' | 'stop' = 'region') {
    if (!dependencies('slurp', 'wl-screenrec')) return

    if (this._isRecording && option === 'stop') this.recorderStop()
    else if (!this._isRecording) {
      Utils.ensureDirectory(this._recordings)
      this._file = `${this._recordings}/${now}.mp4`
      if (option === 'fullscreen') sh(`wl-screenrec -f ${this._file}`)
      if (option === 'region')
        sh(`wl-screenrec -g "${await sh('slurp')}" -f ${this._file}`)

      this._isRecording = true
      this.changed('_isRecording')

      this.timer = 0
      this._interval = Utils.interval(1000, () => {
        this.changed('timer')
        this.timer++
      })
    }
  }

  async recorderStop() {
    sh('pkill wl-screenrec')
    this._isRecording = false
    this.changed('_isRecording')
    GLib.source_remove(this._interval)

    Utils.notify({
      summary: 'Screenrecord',
      body: this._file,
      iconName: icons.fallback.video,
      actions: {
        'Show in Files': () => sh(`xdg-open ${this._recordings}`),
        View: () => sh(`xdg-open ${this._file}`),
      },
    })
  }

  async screenshot(full: boolean = false) {
    if (!dependencies('slurp', 'grim')) return

    const file = `${this._screenshots}/${now}.png`
    Utils.ensureDirectory(this._screenshots)

    if (full) await sh(`grim ${file}`)
    else {
      const size = await sh('slurp')
      if (!size) return
      await sh(`grim -g "${size}" ${file}`)
    }

    bash`wl-copy < ${file}`

    Utils.notify({
      image: file,
      summary: 'Screenshot',
      body: file,
      actions: {
        'Show in Files': () => sh(`xdg-open ${this._screenshots}`),
        View() { sh(`xdg-open ${file}`) },
        Edit() { if (dependencies('swappy')) sh(`swappy -f ${file}`) },
      },
    })
  }

  async zoom() {
    if (!dependencies('pypr')) return
    sh('pypr zoom')
      .then(() => {
        this._isZoomed = !this._isZoomed
        this.changed('_isZoomed')
      })
      .catch(logError)
  }
}

export default new ScreenTools()
