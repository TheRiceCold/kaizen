import { App } from 'astal/gtk3'

import options from 'options'
import { sendBatch } from 'lib/utils/hyprland'
import { Option } from 'variables/option'

const { bar, font, style } = options
const {
  general, decoration,
  animations, input,
  gestures, misc,
  cursor,
} = options.hyprland
const { blur, shadow } = decoration

const deps = [
  'hyprland',

  bar.position.id,
  font.default.name.id,

  style.scheme.id,
  style.radius.id,
  style.dark.primary.bg.id,
  style.light.primary.bg.id,
]

async function setupHyprland() {
  const bool = (opt: Option) => opt.get() ? 1 : 0

  const overshotAnimation = [
    'bezier default, 0.05, 0.9, 0.1, 1.05',
    'bezier wind, 0.05, 0.9, 0.1, 1.05',
    'bezier overshot, 0.13, 0.99, 0.29, 1.08',
    'bezier liner, 1, 1, 1, 1',

    'animation windows, 1, 7, wind, popin',
    'animation windowsIn, 1, 6, overshot, popin',
    'animation windowsOut, 1, 5, overshot, popin',
    'animation windowsMove, 1, 6, overshot, slide',
    'animation layers, 1, 4, default, popin',
    'animation fadeIn, 1, 10, default',
    'animation fadeOut, 1, 10, default',
    'animation fadeSwitch, 1, 10, default',
    'animation fadeDim, 1, 10, default',
    'animation fadeLayers, 1, 10, default',
    'animation workspaces, 1, 6, overshot, slide',
    'animation border, 1, 1, liner',
    'animation borderangle, 1, 30, liner, loop',
  ]

  await sendBatch([
    `general:layout ${general.layout.get()}`,
    `general:border_size ${style.border.width.get()}`,
    `general:resize_on_border ${bool(general.resizeOnBorder)}`,
    `general:hover_icon_on_border ${bool(general.hoverIconOnBorder)}`,
    `general:no_border_on_floating ${bool(general.noBorderOnFloating)}`,
    `general:snap:enabled ${bool(general.snap.enabled)}`,

    `general:col.active_border rgba(${
      style[style.scheme.get()].primary.bg.get().replace('#', '')
    }ff)`,

    `decoration:dim_inactive ${bool(decoration.dimInactive)}`,
    `decoration:active_opacity ${bool(decoration.activeOpacity)}`,
    `decoration:inactive_opacity ${bool(decoration.inactiveOpacity)}`,
    `decoration:fullscreen_opacity ${bool(decoration.fullscreenOpacity)}`,
    `decoration:dim_strength ${decoration.dimStrength.get()}`,
    `decoration:rounding ${style.radius.get()}`,

    `decoration:blur:new_optimizations 1`,
    `decoration:blur:xray ${bool(blur.xray)}`,
    `decoration:blur:size ${blur.size.get()}`,
    `decoration:blur:passes ${blur.passes.get()}`,
    `decoration:blur:popups ${bool(blur.enabled)}`,
    `decoration:blur:enabled ${bool(blur.enabled)}`,
    `decoration:blur:contrast ${blur.contrast.get()}`,
    `decoration:blur:brightness ${blur.brightness.get()}`,
    `decoration:blur:ignore_opacity ${blur.ignoreOpacity.get()}`,

    `decoration:shadow:scale ${shadow.scale.get()}`,
    `decoration:shadow:range ${shadow.range.get()}`,
    `decoration:shadow:sharp ${bool(shadow.sharp)}`,
    `decoration:shadow:enabled ${bool(shadow.enabled)}`,
    `decoration:shadow:offset ${shadow.offsetX.get()} ${shadow.offsetY.get()}`,

    `animations:enabled 1`,
    `animations:first_launch_animation 1`,
    ...overshotAnimation,

    `input:kb_layout ${input.kbLayout.get()}`,
    `input:follow_mouse ${bool(input.followMouse)}`,
    `input:left_handed ${bool(input.leftHanded)}`,
    `input:natural_scroll ${bool(input.naturalScroll)}`,

    `input:touchpad:natural_scroll ${bool(input.naturalScroll)}`,
    `input:touchpad:drag_lock ${bool(input.touchpad.dragLock)}`,
    `input:touchpad:disable_while_typing ${bool(input.touchpad.disableWhileTyping)}`,

    `gestures:workspace_swipe ${bool(gestures.workspaceSwipe)}`,
    `gestures:workspace_swipe_fingers ${gestures.workspaceSwipeFingers.get()}`,
    `gestures:workspace_swipe_forever ${gestures.workspaceSwipeForever.get()}`,

    `misc:vfr 1`,
    `misc:disable_hyprland_logo 1`,
    `misc:font_family ${font.default.name.get()}`,
    `misc:animate_manual_resizes ${bool(misc.animateManualResizes)}`,
    `misc:animate_mouse_windowdragging ${bool(misc.animateMouseWindowDrag)}`,

    `cursor:no_warps ${bool(cursor.noWarps)}`,
    `cursor:persistent_warps ${bool(cursor.persistentWarps)}`,
    `cursor:enable_hyprcursor ${bool(cursor.enableHyprcursor)}`,

    `debug:error_position ${bar.position.get() === 'top' ? 1 : 0}`
  ])

  console.dir(App.windows)
  // if (hyprland.blur.get() > 0) sendBatch(
    // App.windows.flatMap(({ name }) => [
      // `layerrule unset, ${name}`,
      // `layerrule blur, ${name}`,
      // // `layerrule ignorealpha, ${name}`,
    // ])
  // )
}

export default () => {
  setupHyprland()
  options.handler(deps, async() => await setupHyprland())
}
