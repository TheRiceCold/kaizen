import Cava from 'misc/cava'
import options from 'options'
import { showWidget } from 'lib/variables'

const { width, height } = options.bar.media.visualizer
const length = options.bar.media.length

const { media: show } = showWidget

export default label => Widget.Stack({
  className: 'stack',
  transition: 'slide_up_down',
  children: {
    // TODO: Startup greeter
    song: Widget.Label({
      truncate: 'end',
      className: 'text',
      label: label.bind(),
      maxWidthChars: length.bind(),
    }),

    /* HACK:
       * I don't really need the eventbox widget but,
       * the box widget forces this child show up first
       * no matter how much I enforces it not to by using shown, setup, or hook
       */
    visualizer: Widget.EventBox({
      hpack: 'center',
      className: 'visualizer',
      child: label.bind().as((label: string) => {
        const bars = Math.floor(label.length * 0.75)
        return Cava({
          width, height,
          bars: (bars < length.value ? bars : length.value) * width,
        })
      })
    })
  },
}).hook(show, self => self.shown = show ? 'visualizer' : 'song')
