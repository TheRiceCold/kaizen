import { opt } from 'lib/option'

export default {
  width: opt(380),
  profile: {
    avatar: {
      image: opt(`/var/lib/AccountsService/icons/${Utils.USER}`),
      size: opt(70),
    },
    clock: {
      interval: 5000,
      // DOCS: https://docs.gtk.org/glib/method.DateTime.format.html
      format: opt('%I:%M'),
    }
  },
}
