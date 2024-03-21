import Cava from 'misc/cava'
import options from 'options'
import { showMedia } from 'lib/variables'

const { width, height } = options.bar.media.visualizer
const length = options.bar.media.length

export default (label) => Widget.Stack({
  className: 'stack',
  transition: 'slide_up_down',
  children: {
    song: Widget.Label({
      truncate: 'end',
      className: 'text',
      label: label.bind(),
      maxWidthChars: length.bind(),
    }),
    visualizer: Widget.EventBox({
      /* HACK:
       * I don't really need the eventbox widget but,
       * the box widget forces this child show up first
       * no matter how much I enforces it not to by using shown, setup, or hook
       */
      hpack: 'center',
      className: 'visualizer',
      child: label.bind().as(lbl => {
        const bars = Math.floor(lbl.length * 0.75)
        return Cava({
          width, height,
          bars: (bars < length.value ? bars : length.value) * width,
        })
      })
    })
  },
}).hook(showMedia, self => self.shown = showMedia ? 'visualizer' : 'song')
