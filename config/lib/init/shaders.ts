import Hyprland from 'gi://AstalHyprland'
import { writeFile, readFile } from 'astal'

import options from 'options'
import { sh, ensureDirectory } from 'lib/utils'
import { USER_CONFIG, APP_CONFIG } from 'lib/paths'

const hypr = Hyprland.get_default()

export default async () => {
  ensureDirectory(`${USER_CONFIG}/shaders`)
  const shaders = await sh(`ls ${APP_CONFIG}/assets/shaders`).then(out => out.split(/\n/))

  shaders.forEach(fileName => writeFile(
    `${USER_CONFIG}/shaders/${fileName}`,
    readFile(`${APP_CONFIG}/assets/shaders/${fileName}`)
  ))

  options.hyprland.decoration.shader.subscribe(shader => {
    if (shader === 'CRT')
      hypr.message('keyword debug:damage_tracking 0')

    hypr.message(`keyword decoration:screen_shader ${
      (shader === 'default' || !shader) ? '[[EMPTY]]' :
      `${USER_CONFIG}/shaders/${shader === 'CRT' ? 'CRT.frag' : `${shader}.glsl`}`
    }`)
  })
}
