import options from 'options'

const { sleep, reboot, logout, shutdown } = options.powermenu

export type Action = 'sleep' | 'reboot' | 'logout' | 'shutdown'

class PowerMenu extends Service {
  static {
    Service.register(this, {}, { title: [ 'string' ],
      cmd: [ 'string' ],
    })
  }

  _title = ''
  _cmd = ''

  get title() { return this._title }
  get cmd() { return this._cmd }

  action(action: Action) {
    [this._cmd, this._title] = {
      sleep: [ sleep.value, 'Sleep' ],
      reboot: [ reboot.value, 'Reboot' ],
      logout: [ logout.value, 'Log Out' ],
      shutdown: [ shutdown.value, 'Shutdown' ],
    }[action]

    this.notify('cmd')
    this.notify('title')
    this.emit('changed')
    App.closeWindow('powermenu')
    App.openWindow('verification')
  }

  readonly shutdown = () => this.action('shutdown')
  readonly exec = () => {
    App.closeWindow('verification')
    Utils.exec(this._cmd)
  }
}

export default new PowerMenu
