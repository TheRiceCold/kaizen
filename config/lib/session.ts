const { GLib } = imports.gi

declare global {
  const TMP: string
  const USER: string
  const CONFIG: string
  const OPTIONS: string
}

Object.assign(globalThis, {
  USER: GLib.get_user_name(),
  TMP: `${GLib.get_tmp_dir()}/kaizen`,
  CACHE: `${GLib.get_tmp_dir()}/kaizen`,
  CONFIG: `${GLib.get_user_config_dir()}/kaizen`,
  OPTIONS: `${GLib.get_user_data_dir()}/kaizen/settings.json`,
})

Utils.ensureDirectory(CONFIG)
App.addIcons(`${App.configDir}/assets/icons`)
App.addIcons(`${App.configDir}/assets/icons/weather`)
