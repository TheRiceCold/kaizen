import { opt } from 'variables/option'

export default {
  general: {
    gapsIn: opt(8),
    gapsOut: opt(8),
    layout: opt<'dwindle' | 'master' | 'scroller'>('dwindle'),
    // activeBorder
    // inactiveBorder
    resizeOnBorder: opt(true),
    hoverIconOnBorder: opt(true),
    noBorderOnFloating: opt(false),
    snap: {
      enabled: opt(false),
    }
  },

  decoration: {
    dimInactive: opt(false),
    dimStrength: opt(0.5),
    dimAround: opt(0.4),

    activeOpacity: opt(0.95),
    inactiveOpacity: opt(0.85),
    fullscreenOpacity: opt(1),
    blur: {
      size: opt(8),
      passes: opt(3),
      xray: opt(true),
      enabled: opt(true),
      contrast: opt(0.9),
      noise: opt(1.0e-2),
      brightness: opt(0.8),
      ignoreOpacity: opt(true),
    },
    shadow: {
      enabled: opt(true),
      sharp: opt(false),
      // color: opt(''),
      scale: opt(1),
      range: opt(4),
      offsetX: opt(0),
      offsetY: opt(0),
    },
    shader: opt('default'),
  },

  animations: opt<'default' | 'fast' | 'high'>('default'),

  input: {
    leftHanded: opt(false),
    naturalScroll: opt(true),
    followMouse: opt(true),
    kbLayout: opt<'us'>('us'),
    touchpad: {
      dragLock: opt(false),
      disableWhileTyping: opt(true),
    }
  },

  gestures: {
    workspaceSwipe: opt(true),
    workspaceSwipeFingers: opt(3),
    workspaceSwipeForever: opt(true),
  },

  misc: {
    animateManualResizes: opt(true),
    animateMouseWindowDrag: opt(true),
  },

  cursor: {
    noWarps: opt(true),
    persistentWarps: opt(true),
    enableHyprcursor: opt(true),
  }
}
