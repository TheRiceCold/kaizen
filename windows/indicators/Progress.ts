import type Gtk from 'gi://Gtk?version=3.0'
import GLib from 'gi://GLib?version=2.0'
import { range } from 'lib/utils'
import options from 'options'

type ProgressProps = {
  height?: number
  width?: number
  vertical?: boolean
  child: Gtk.Widget
}

export default ({
  child,
  height = 18,
  width = 180,
  vertical = false,
}: ProgressProps) => {
  const fill = Widget.Box({
    child,
    className: 'fill',
    hexpand: vertical,
    vexpand: !vertical,
    vpack: vertical ? 'end' : 'fill',
    hpack: vertical ? 'fill' : 'start',
  })

  const container = Widget.Box({
    child: fill,
    className: 'progress',
    css: `min-width: ${width}px; min-height: ${height}px;`,
  })

  let fill_size = 0
  let animations: number[] = []

  return Object.assign(container, {
    setValue(value: number) {
      if (value < 0)
        return

      if (animations.length > 0) {
        for (const id of animations)
          GLib.source_remove(id)

        animations = []
      }

      const axis = vertical ? 'height' : 'width'
      const axisv = vertical ? height : width
      const min = vertical ? width : height
      const preferred = (axisv - min) * value + min

      if (!fill_size) {
        fill_size = preferred
        fill.css = `min-${axis}: ${preferred}px;`
        return
      }

      const frames = options.transition.value / 10
      const goal = preferred - fill_size
      const step = goal / frames

      animations = range(frames, 0).map(i => Utils.timeout(5 * i, () => {
        fill_size += step
        fill.css = `min-${axis}: ${fill_size}px`
        animations.shift()
      }))
    },
  })
}
