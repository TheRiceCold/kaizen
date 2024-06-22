import type Gtk from 'gi://Gtk?version=3.0'

const { GLib } = imports.gi

class PopLauncher extends Service {
  static {
    Service.register(
      this, {
        'new-response': ['jsobject'],
        'close': ['boolean'],
      }, { 'ipc-response': ['jsobject', 'r'] }
    )
  }

  _service: Gio.Subprocess
  _ipcResponse: JsonIPC.Response | null = null

  get ipcResponse() {
    return this._ipcResponse
  }

  constructor(widget: Gtk.Widget) {
    super()

    this._service = Utils.subprocess(
      ['pop-launcher'],
      stdout => this._onResponse(stdout),
      stderr => console.error('problem in stream: ', stderr),
      widget
    )
  }

  _onResponse(response: string) {
    if (typeof response === 'string' && response.includes('Close'))
      this.emit('close', true)
    else {
      this._ipcResponse = JSON.parse(response)
      this.changed('ipc-response')
      this.emit('new-response', this._ipcResponse)
    }
  }

  activate(id: number) {
    this._send({ Activate: id})
  }

  activateContext(id: number, context: number) {
    this._send({ ActivateContext: { id, context } })
  }

  context(id: number) {
    this._send({ Context: id })
  }

  complete(id: number) {
    this._send({ Complete: id })
  }

  exit() {
    this._send('Exit')
    const service = this._service
    GLib.timeout_add(Glib.PRIORITY_DEFAULT, 100, () => {
      if (service.stdout.has_pending() || service.stdin.has_pending)
        return true

      const closeStream = stream => {
        try {
          stream.close(null)
        } catch (err) {
          console.error('failed to close pop-launcher stream: '+err)
        }
      }

      closeStream(service.stdin)
      // closeStream(service.stdin)

      return false
    })
  }

  interrupt() {
    this._send('Interrupt')
  }

  search(text: string) {
    return this._send({ Search: text })
  }

  quit(id: number) {
    this._send({ Quit: id })
  }

  select(id: number) {
    this._send({ Select: id})
  }

  _send(obj) {
    const message = JSON.stringify(obj)
    console.info('LauncherIPC send() message ='+message)
    try {
      this._service.write(message+'\n')
    } catch(err) {
      console.error('failed to send request to pop-launcher: '+err)
    }
  }
}

export default new PopLauncher
