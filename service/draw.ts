import { dependencies, sh, bash } from 'lib/utils'

class Draw extends Services {
  static {
    Service.register(this, {}, {  })
  }

  async start() {
    if (!dependencies('gromit-mpx')) return
  }
}
