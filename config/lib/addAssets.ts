import { sh } from 'lib/utils'

export default() => {
  // Avatars
  sh(`cp -r ${App.configDir}/assets/avatars ${CONFIG}`)

  // Default Background
  sh(`cp ${App.configDir}/assets/wallpapers/nixos.png ${CONFIG}/background`)
}
