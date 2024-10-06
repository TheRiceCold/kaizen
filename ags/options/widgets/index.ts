import { opt } from 'lib/option'

import ai from './ai'
import workspaces from './workspaces'

export default {
  ai: { ...ai },
  workspaces: { ...workspaces },

  notifications: {
    width: opt(440),
    blacklist: opt(['Spotify']),
  },
}
