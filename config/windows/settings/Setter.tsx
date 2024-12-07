import { bind } from 'astal'
import { Gdk, Widget } from 'astal/gtk3'
import { EntryProps } from 'astal/gtk3/widget' 

import { Option } from 'variables/option'
import icons from 'data/icons'

import { 
  FontButton, FontButtonProps,
  SpinButton, SpinButtonProps,
  ColorButton, ColorButtonProps,
  ToggleButton,ToggleButtonProps,
  FileChooserButton, FileChooserButtonProps,
} from 'widgets' 

function EnumSetter(opt: Option<string>, values: string[]) {
  const Label = () => <label label={bind(opt).as(String)} />

  const EnumButton = ({dir}: { dir: 1 | -1 }) => {
    function step() {
      const i = values.findIndex(i => i === Label().label)
      opt.set(dir > 0
        ? i + dir > values.length - 1 ? values[0] : values[i + dir]
        : i + dir < 0 ? values[values.length - 1] : values[i + dir]
      )
    }
    
    return (
      <button 
        cursor='pointer'
        onClickRelease={step} 
        child={<icon icon={icons.ui.arrow[dir > 0 ? 'right' : 'left']} />} 
      />
    )
  }

  return (
    <box className='enum-setter'>
      <Label />
      <EnumButton dir={-1} />
      <EnumButton dir={+1} />
    </box>
  )
}

export default ({
  opt,
  enums,
  min = 0,
  index = 0,
  max = 1000,
  type = typeof opt.get()
}) => {

  switch(type) {
    case 'number':  return (
      <SpinButton
        range={[min, max]} 
        increments={[1, 5]} 
        setup={(self: SpinButtonProps) => {
          self.value = opt.get()
          self.connect('notify::value', () => opt.set(self.value as T))
        }}
      />
    )

    case 'float': case 'object': return (
      <entry 
        text={bind(opt).as(v => JSON.stringify(v))}
        onActivate={(self: EntryProps) => opt.set(JSON.parse(self.text || ''))}
      />
    )

    case 'string': return (
      <entry
        text={opt(String)}
        onActivate={(self: EntryProps) => opt.set(self.text || '') }
      />
    )

    case 'enum': 
      return EnumSetter(opt as unknown as Option<string>, enums!)

    case 'boolean': return (
      <ToggleButton 
        active={opt()}
        label={bind(opt).as(val => val ? 'enabled' : 'disabled')}
        onToggled={(self: ToggleButtonProps) => opt.set(self.active)}
      />
    )

    case 'img': return (
      <FileChooserButton onFileSet={({uri}: FileChooserButtonProps) => opt.set(uri)} />
    )

    case 'font': return (
      <FontButton 
        useSize={false} showSize={false}
        setup={(self: FontButtonProps) => self.connect('notify::font', 
          () => opt.set(self.font!.split(' ').slice(0, -1).join(' ') as T))
        }
      />
    )

    case 'color': return (
      <ColorButton
        setup={(self: ColorButtonProps) => self.hook(opt, () => {
          const rgba = new Gdk.RGBA()
          rgba.parse(opt.get() as string)
          self.rgba = rgba
        }).connect('notify::color-set', ({ rgba: { red, green, blue }}) => {
          function hex(n: number) {
            const c = Math.floor(255 * n).toString(16)
            return c.length === 1 ? `0${c}` : c
          }
          opt.set(`#${hex(red)}${hex(green)}${hex(blue)}` as T)
        })}
      />
    )

    default: 
      return <label label={`No setter with type ${type}`} />
  }
}
