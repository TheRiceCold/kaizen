import { opt } from 'lib/option'

export default {
  width: opt(380),
  avatarSize: opt(80),
  profile: {
    clock: {
      interval: 5000,
      // DOCS: https://docs.gtk.org/glib/method.DateTime.format.html
      format: opt('%I:%M %p'),
    }
  },
}
