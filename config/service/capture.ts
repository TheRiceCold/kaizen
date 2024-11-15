import icons from 'data/icons'
import { dependencies, sh, bash } from 'lib/utils'
import options from 'options'

export type GeometryType = 'region' | 'fullscreen'
export type CaptureType = 'audio' | 'record' | 'screenshot'

const { GLib } = imports.gi
const dateFormat = '%Y-%m-%d_%H-%M-%S'
const now = GLib.DateTime.new_now_local().format(dateFormat)

const { audioDir, screenshotsDir, recorderDir } = options.tools.capture

class Screen extends Service {
  static {
    Service.register(this, {}, {
      timer: ['int'],
      'is-recording': ['boolean'],
      'capture-type': ['string'],
      'geometry-type': ['string'],
      'audio-enabled': ['boolean'],
      'audio-recording': ['boolean'],
    })
  }

  #interval = 0
  #audioFile = ''
  #recordFile = ''
  #screenshotFile = ''

  #timer = 0
  #isRecording = false
  #audioEnabled = false
  #audioRecording = false
  #captureType: CaptureType = 'record'
  #geometryType: GeometryType = 'region'

  // Private methods
  #startTimer() {
    this.#timer = 0
    this.#interval = Utils.interval(1000, () => {
      this.changed('timer')
      this.#timer++
    })
  }

  #notify() {
    switch(this.capture_type) {
      case 'audio':
        Utils.notify({
          body: this.audio_file,
          summary: 'Audio record',
          iconName: 'microphone-symbolic',
          actions: {
            View: () => sh(`xdg-open ${this.audio_file}`),
            'Show in Files': () => sh(`xdg-open ${this.audio_dir}`),
          }
        })
        break
      case 'record':
        Utils.notify({
          body: this.record_file,
          summary: 'Screen record',
          iconName: icons.recorder.recording,
          actions: {
            View: () => sh(`xdg-open ${this.record_file}`),
            'Show in Files': () => sh(`xdg-open ${this.recorder_dir}`),
          }
        })
        break
      case 'screenshot': default:
        Utils.notify({
          body: this.screenshot_file,
          image: this.screenshot_file,
          summary: 'Screenshot',
          actions: {
            View: () => sh(`xdg-open ${this.screenshot_file}`),
            'Edit': () => {
              if (dependencies('swappy'))
                sh(`swappy -f ${this.screenshot_file}`)
            },
            'Show in Files': () => sh(`xdg-open ${this.screenshot_dir}`),
          }
        })
        break
    }
  }

  // Public methods
  async screenshot() {
    if (!dependencies('slurp', 'grim')) return

    const file = `${this.screenshot_dir}/${now}.png`
    this.screenshot_file = file
    Utils.ensureDirectory(this.screenshot_dir)

    switch(this.geometry_type) {
      case 'region':
        await sh(`grim -g "${await sh('slurp')}" ${file}`)
        break
      case 'fullscreen': default:
        await sh(`grim ${file}`)
    }

    bash`wl-copy < ${file}`
    this.#notify()
  }

  audioRecord() {
    if (!dependencies('pipewire')) return
    if (this.audio_recording) return
    this.capture_type = 'audio'
    Utils.ensureDirectory(this.audio_dir)
    this.audio_file = `${this.audio_dir}/${now}.mp3`
    sh(`pw-record ${this.audio_dir}/${now}.mp3`)

    this.audio_recording = true
    this.#startTimer()
  }

  async record() {
    if (!dependencies('slurp', 'wf-recorder')) return
    if (this.is_recording) return

    Utils.ensureDirectory(this.recorder_dir)
    this.record_file = `${this.recorder_dir}/${now}.mp4`

    const cmd = `wf-recorder ${
      (this.geometry_type === 'region')
        ? `-g "${await sh('slurp')}" ` : ''
    }-f ${this.record_file} ${this.audio_enabled ? '--audio' : ''}`

    sh(cmd)
    this.is_recording = true
    this.#startTimer()
  }

  recordStop() {
    switch(this.capture_type) {
      case 'record': default:
        sh('pkill wf-recorder')
        this.is_recording = false
        break
      case 'audio':
        sh('pkill pw-record')
        this.audio_recording = false
        break
    }

    this.#notify()
    GLib.source_remove(this.#interval)
  }

  // Setters
  set screenshot_file(file: string) {
    this.#screenshotFile = file
    this.changed('screenshot-file')
  }
  set audio_file(file: string) {
    this.#audioFile = file
    this.changed('audio-file')
  }
  set record_file(file: string) {
    this.#recordFile = file
    this.changed('record-file')
  }
  set audio_recording(val: boolean) {
    this.#audioRecording = val
    this.changed('audio-recording')
  }
  set is_recording(val: boolean) {
    this.#isRecording = val
    this.changed('is-recording')
  }
  set audio_enabled(val: boolean) {
    this.#audioEnabled = val
    this.changed('audio-enabled')
  }
  set capture_type(type: CaptureType) {
    this.#captureType = type
    this.changed('capture-type')
  }
  set geometry_type(type: GeometryType) {
    this.#geometryType = type
    this.changed('geometry-type')
  }

  // Getters
  get timer(): number { return this.#timer }
  get is_recording(): boolean { return this.#isRecording }
  get audio_enabled(): boolean { return this.#audioEnabled }
  get audio_recording(): boolean { return this.#audioRecording }
  get audio_file(): string { return this.#audioFile }
  get record_file(): string { return this.#recordFile }
  get screenshot_file(): string { return this.#screenshotFile }
  get capture_type(): CaptureType { return this.#captureType }
  get geometry_type(): GeometryType { return this.#geometryType }

  get audio_dir(): string { return audioDir.value }
  get recorder_dir(): string { return recorderDir.value }
  get screenshot_dir(): string { return screenshotsDir.value }
}

export default new Screen
