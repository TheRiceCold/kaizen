import { Gio, GLib } from 'astal'

const { File } = Gio

export const fileExists = (file: string) =>
  File.new_for_path(file).query_exists(null)

export function ensureDirectory(path: string) {
  if (!GLib.file_test(path, GLib.FileTest.EXISTS))
    File.new_for_path(path).make_directory_with_parents(null)
}
