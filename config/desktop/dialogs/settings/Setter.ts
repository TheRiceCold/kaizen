import { ButtonIcon } from 'widgets'

import icons from 'data/icons'
import {Opt} from 'lib/option'

const {Gdk} = imports.gi

function EnumSetter(opt: Opt<string>, values: string[]) {
  const lbl = Widget.Label({ label: opt.bind().as(v => `${v}`) })
  const step = (dir: 1 | -1) => {
    const i = values.findIndex(i => i === lbl.label)
    opt.setValue(dir > 0
      ? i + dir > values.length - 1 ? values[0] : values[i + dir]
      : i + dir < 0 ? values[values.length - 1] : values[i + dir],
    )
  }

  const next = ButtonIcon(icons.ui.arrow.left, () => step(+1))
  const prev = ButtonIcon(icons.ui.arrow.left, () => step(-1))

  return Widget.Box({
    className: 'enum-setter',
    children: [lbl, prev, next],
  })
}

export default function Setter<T>({
  opt,
  enums,
  min = 0,
  max = 1000,
  type = typeof opt.value,
}) {
  switch (type) {
    case 'number': return Widget.SpinButton({
      cursor: 'pointer',
      setup(self) {
        self.set_range(min, max)
        self.set_increments(1, 5)
        self.on('value-changed', () => opt.value = self.value as T)
        self.hook(opt, () => self.value = opt.value as number)
      },
    })
    case 'float': case 'object': return Widget.Entry({
      onAccept(self) { opt.value = JSON.parse(self.text || '') },
      setup(self) { self.hook(opt, () => self.text = JSON.stringify(opt.value)) },
    })
    case 'string': return Widget.Entry({
      onAccept(self) { opt.value = self.text as T },
      setup(self) { self.hook(opt, () => self.text = opt.value as string) },
    })
    case 'enum': return EnumSetter(opt as unknown as Opt<string>, enums!)
    case 'boolean': return Widget.ToggleButton({ cursor: 'pointer' })
      .on('notify::active', self => opt.value = self.active as T)
      .hook(opt, self => {
        const val = opt.value as boolean
        self.active = val
        self.label = val ? 'enabled' : 'disabled'
      })

    case 'img': return Widget.FileChooserButton({
      cursor: 'pointer',
      onFileSet({ uri }) { opt.value = uri!.replace('file://', '') as T }
    })

    case 'font': return Widget.FontButton({
      useSize: false,
      showSize: false,
      cursor: 'pointer',
      setup(self) {
        self.hook(opt, () => self.font = opt.value as string)
          .on('font-set', ({ font }) => opt.value = font!
            .split(' ').slice(0, -1).join(' ') as T)
      }
    })

    case 'color': return Widget.ColorButton({
      cursor: 'pointer',
      className: 'color-button',
    }).hook(opt, self => {
      const rgba = new Gdk.RGBA()
      rgba.parse(opt.value as string)
      self.rgba = rgba
    }).on('color-set', ({ rgba: { red, green, blue } }) => {
      const hex = (n: number) => {
        const c = Math.floor(255 * n).toString(16)
        return c.length === 1 ? `0${c}` : c
      }
      opt.value = `#${hex(red)}${hex(green)}${hex(blue)}` as T
    })

    default: return Widget.Label(`no setter with type ${type}`)
  }
}
