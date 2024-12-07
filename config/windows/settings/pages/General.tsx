import Item from '../Item'
import Page from '../Page'
import ResetButton from '../ResetButton'
import { FileChooserButton, FileChooserButtonProps } from 'widgets'

import options from 'options'
import { randomWallpaper, setWallpaper } from 'lib/wallpaper'
import SectionTitle from '../SectionTitle'

export default() => {
  const Wallpaper = () => (
    <box className='item'>
      <label xalign={0} label='Wallpaper' />
      <box hexpand />
      <FileChooserButton
        className='wallpaper-button'
        onFileSet={({uri}: FileChooserButtonProps) => setWallpaper(uri)}
      />
      <button label='Random' onClickRelease={() => randomWallpaper()} />
      <ResetButton opt={options.wallpaper.image} />
    </box>
  )

  return (
    <Page name='general'>
      <Item type='img' title='Avatar' opt={options.avatar} />
      <SectionTitle label='Wallpaper / Theme' />
      <Wallpaper />
      <Item
        type='enum'
        title='Transition Type'
        enums={['grow', 'wipe', 'outer']}
        opt={options.wallpaper.transitionType}
      />
      <Item opt={options.autoGenerateColors} title='Auto Generate Colors' />
      <Item
        type='enum'
        title='Colorscheme'
        enums={['dark', 'light']}
        opt={options.style.scheme}
      />
      <Item title='Screen Rounded Corners' opt={options.screenRoundedCorners} />
      <Item title='Border size' opt={options.style.border.width} />
      <Item title='Number of workspace' opt={options.numberOfWorkspace} />

      <Item type='font' title='Font name' opt={options.font.default.name} />
      <Item title='Font Size' opt={options.font.default.size} />
    </Page>
  )
}
