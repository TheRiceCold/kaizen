import { opt } from 'lib/option'

export default {
  bio: opt('~ What we do in life, echoes in eternity ~'),
  github: { username: opt('TheRiceCold') },
  tasks: { directory: opt(`/home/${Utils.USER}/tasks`) },

  player: {
    length: opt(32),
    coverSize: opt(200),
  },
}
