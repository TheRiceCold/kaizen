const { GLib } = imports.gi

declare global {
  const TMP: string
  const USER: string
  const OPTIONS: string
}

Object.assign(globalThis, {
  USER: GLib.get_user_name(),
  TMP: `${GLib.get_tmp_dir()}/ags`,
  OPTIONS: `${GLib.get_user_cache_dir()}/ags/options.json`,
})

Utils.ensureDirectory(TMP)
App.addIcons(`${App.configDir}/assets/icons`)
App.addIcons(`${App.configDir}/assets/icons/weather`)
