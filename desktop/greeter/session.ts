
import GLib from "gi://GLib?version=2.0"
import AccountsService from "gi://AccountsService?version=1.0"

const { userName } = AccountsService.UserManager.get_default().list_users()[0]

declare global {
  const WALLPAPER: string
}

Object.assign(globalThis, {
  TMP: `${GLib.get_tmp_dir()}/greeter`,
  OPTIONS: '/var/cache/greeter/options.json',
  WALLPAPER: '/var/cache/greeter/background',
  USER: userName,
})

Utils.ensureDirectory(TMP)
