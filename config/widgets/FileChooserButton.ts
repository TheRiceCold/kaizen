import { GObject, register } from 'astal'
import { astalify, ConstructProps, Gtk } from 'astal/gtk3'

export type FileChooserButtonProps = ConstructProps<
  FileChooserButton,
  Gtk.FileChooserButton.ConstructProps,
  {}
>

@register()
class FileChooserButton extends astalify(Gtk.FileChooserButton) {
  constructor(props: FileChooserButtonProps) {
    super(props as any)
    this.cursor = 'pointer'
  }

  get uri() { return this.get_uri()!.replace('file://', '') }
}

export default FileChooserButton
