import Item from '../Item'
import Page from '../Page'
import SectionTitle from '../SectionTitle'

import options from 'options'

const { general, decoration, input, gestures, misc, cursor } = options.hyprland
const { blur, shadow } = decoration

export default () => (
  <Page name='hyprland'>
    <SectionTitle label='General' />
    <Item
      type='enum'
      title='Layout'
      opt={general.layout}
      enums={['dwindle', 'master', 'scroll']}
    />
    <Item title='Gaps in' opt={general.gapsIn} desc='Gaps between windows' />
    <Item title='Gaps out' opt={general.gapsOut} desc='Gaps between windows and monitor edges' />
    <Item title='Resize on border' opt={general.resizeOnBorder} desc='Enable resizing windows by clicking and dragging on borders' />
    <Item title='Hover icon on border' opt={general.hoverIconOnBorder} visible={general.resizeOnBorder()} />
    <Item title='No border on floating' opt={general.noBorderOnFloating} desc='Disable borders for floating windows' />
    <Item title='Window snap' opt={general.snap.enabled} desc='Enable snapping for floating windows' />

    <SectionTitle label='Decoration' />
    <Item title='Dim inactive' opt={decoration.dimInactive} desc='Enables dimming of inactive windows' />
    <Item title='Dim strength' opt={decoration.dimStrength} desc='How much inactive windows should be dimmed' />
    <Item title='Dim around' opt={decoration.dimAround} desc='How much the dim around window' />

    <Item title='Active opacity' opt={decoration.activeOpacity} desc='Opacity of active windows' />
    <Item title='Inactive opacity' opt={decoration.inactiveOpacity} desc='Opacity of inactive windows' />
    <Item title='Fullscreen opacity' opt={decoration.fullscreenOpacity} desc='Opacity of fullscreen windows' />

    <SectionTitle label='Blur' />
    <Item opt={blur.enabled} title='Enable' desc='Enable kawase window background blur' />
    <Item title='xray' opt={blur.xray} desc='Floating windows will ignore tiled windows' />
    <Item title='size' opt={blur.size} />
    <Item title='passes' opt={blur.passes} />
    <Item title='contrast' opt={blur.contrast} />
    <Item title='brightness' opt={blur.brightness} />
    <Item title='ignore opacity' opt={blur.ignoreOpacity} desc='Make the blur layer ignore the opacity of the window' />

    <SectionTitle label='Shadow' />
    <Item title='Enable' opt={shadow.enabled} />
    <Item title='Scale' opt={shadow.scale} />
    <Item title='Range' opt={shadow.range} />
    <Item title='Sharp'  opt={shadow.sharp} />
    <Item title='Offset X' opt={shadow.offsetX} />
    <Item title='Offset Y' opt={shadow.offsetY} />

    <Item
      type='enum'
      title='Shader'
      opt={options.hyprland.decoration.shader}
      enums={['default', 'bluelight', 'vibrance', 'grayscale', 'invert', 'CRT']}
    />

    <SectionTitle label='Input' />
    <Item title='Left handed' opt={input.leftHanded} />
    <Item title='Follow mouse' opt={input.followMouse} />
    <Item title='Natural scroll' opt={input.naturalScroll} />
    <Item title='Drag lock' opt={input.touchpad.dragLock} />
    <Item title='Disable while typing' opt={input.touchpad.disableWhileTyping} />

    <SectionTitle label='Gesture' />
    <Item title='Workspace swipe' opt={gestures.workspaceSwipe} />
    <Item title='Workspace swipe fingers' opt={gestures.workspaceSwipeFingers} />
    <Item title='Workspace swipe forever' opt={gestures.workspaceSwipeForever} />

    <SectionTitle label='Misc' />
    <Item title='Animate manual resizes' opt={misc.animateManualResizes}/>
    <Item title='Animate mouse window dragging' opt={misc.animateMouseWindowDrag}/>

    <SectionTitle label='Cursor' />
    <Item title='Hyprcursor' opt={cursor.enableHyprcursor}/>
    <Item title='No warps' opt={cursor.noWarps}/>
    <Item title='Persistent warps' opt={cursor.persistentWarps}/>
  </Page>
)
