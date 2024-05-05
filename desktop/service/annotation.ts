// TODO: Improve and refactor code
import options from 'options'
import { dependencies, sh, bash } from 'lib/utils'

type InputType =
  | 'SHIFT' 
  | 'CONTROL' 
  | 'ALT' 
  | 'Button1' 
  | 'Button2' // middle click
  | 'Button3' // right click
  | 1 | 2 | 3 // short for Button<num>

type ToolType = {
  name: string,
  color: string,
  size?: number,
  arrowSize?: number,
  withArrow?: boolean,
  // WARN: gromit-mpx.cfg fails to parse when SMOOTH or ORTHOGONAL type
  type?: 'pen' | 'line' | 'rect' | 'smooth' | 'orthogonal', 
}

const { scheme, dark, light } = options.theme
const hyprland = await Service.import('hyprland')

class Annotation extends Service {
  static { 
    Service.register(this, {}, { 
      active: ['boolean'],
    }) 
  }

  _active = false

  _size = 4
  _arrowSize = 2
  _pen = '"pen" = PEN (size=4)'
  _inputList: string[] = [ '"default"[3] = "eraser";' ]
  _toolList: string[] = [ '"eraser" = ERASER (size = 75);' ]

  get active() { return this._active }

  action = (arg: string) => sh(`gromit-mpx --${arg}`)

  addTool({ name, color, size, type = 'pen', withArrow = false, arrowSize }: ToolType) {
    const tool = `"${name}" = ${type.toUpperCase()} (size=${size ? size : this._size} color="${color}" ${withArrow ? `arrowsize=${arrowSize ? arrowSize : this._arrowSize}` : ''});`
    this._toolList.push(tool)
  }

  addInput({ device = 'default', input, name }: { device?: string, name: string, input?: InputType | InputType[] }) {
    this._inputList.push(`"${device}"${input ? `[${input}]`: ''} = "${name}";`)
  }

  /* HACK:
   * By default gromit-mpx starts fullscreen, 
   * which makes other windows not visible
   * this helps toggle fullscreen
   * so you could draw while other windows are visible and usable
   * */
  removeFullscreen() {
    if (!dependencies('gromit-mpx')) return

    Utils.timeout(500, () => {
      if (hyprland.active.client.class === 'Gromit-mpx') {
        sh('hyprctl dispatch fullscreen')
        this.toggle()
      } 

      else this.removeFullscreen()
    })
  }

  async start() {
    if (!dependencies('gromit-mpx')) return
    await this.setup()
    bash`gromit-mpx -q || gromit-mpx -k none -u none`
    this.removeFullscreen()
  }

  async setup() {
    const getColor = (dark: string, light: string) => scheme === 'dark' ? dark : light
    const primaryColor = getColor(light.primary.bg, dark.primary.bg)
    const secondaryColor = getColor(light.primary.fg, dark.primary.fg)
    const configDir = `/home/${Utils.USER}/.config/gromit-mpx.cfg`
    const initDir = `/home/${Utils.USER}/.config/gromit-mpx.ini`

    // TOOLS
    this.addTool({ name: 'pen primary', color: primaryColor }),
    this.addTool({ name: 'line primary', color: primaryColor, type: 'line' }),
    this.addTool({ name: 'rect primary', color: primaryColor, type: 'rect' }),
    this.addTool({ name: 'arrow primary', color: primaryColor, withArrow: true }),
    this.addTool({ name: 'line arrow primary', color: primaryColor, type: 'line', withArrow: true }),

    this.addTool({ name: 'pen secondary', color: secondaryColor, }),
    this.addTool({ name: 'line secondary', color: secondaryColor, type: 'line' }),
    this.addTool({ name: 'rect secondary', color: secondaryColor, type: 'rect' }),
    this.addTool({ name: 'arrow secondary', color: secondaryColor, withArrow: true }),
    this.addTool({ name: 'line arrow secondary', color: secondaryColor, type: 'line', withArrow: true }),

    this.addInput({ name: 'pen primary' })
    this.addInput({ name: 'line primary', input: 'SHIFT' })
    this.addInput({ name: 'arrow primary', input: 'CONTROL' })
    this.addInput({ name: 'line arrow primary', input: ['SHIFT', 'CONTROL'] })

    this.addInput({ name: 'pen secondary', input: 'ALT' })
    this.addInput({ name: 'line secondary', input: ['SHIFT', 'ALT'] })
    this.addInput({ name: 'arrow secondary', input: ['CONTROL', 'ALT'] })
    this.addInput({ name: 'line arrow secondary', input: ['SHIFT', 'CONTROL', 'ALT'] })

    this.addInput({ name: 'rect primary', input: 2 })
    this.addInput({ name: 'rect secondary', input: ['Button2', 'ALT'] })

    try {
      const configFile = this._toolList.concat(this._inputList)
      await Utils.writeFile('[General]\nShowIntroOnStartup=false\n[Drawing]\nOpacity=1', initDir)
      await Utils.writeFile(configFile.join('\n'), configDir)
    } catch(err) { logError(err) }
  }
  
  readonly pin = () => sh('hyprctl dispatch pin')
  readonly quit = () => this.action('quit')
  readonly redo = () => this.action('redo')
  readonly undo = () => this.action('undo')
  readonly clear = () => this.action('clear')
  readonly toggle = () => this.action('toggle')
  readonly visible = () => this.action('visibility')
}

export default new Annotation
