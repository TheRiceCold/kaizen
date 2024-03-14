import { opt } from 'lib/option'

export default {
  width: opt(380),
  dashboard: {
    avatar: {
      image: opt(`/var/lib/AccountsService/icons/${Utils.USER}`),
      size: opt(70),
    },
  },
  position: opt<'left' | 'center' | 'right'>('right'),
  tab: opt<'dashboard' | 'utilities' | 'apis' | 'settings'>('dashboard'),
}
