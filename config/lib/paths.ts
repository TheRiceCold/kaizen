import { GLib } from 'astal'
import { sh } from './utils'

export const USER_CONFIG = `${GLib.get_user_config_dir()}/kaizen`
export const TMP = `${GLib.get_tmp_dir()}/kaizen`
export const APP_CONFIG = await sh('pwd')
