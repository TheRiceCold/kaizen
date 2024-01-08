import { Utils, Widget } from '../../../../imports.js'
import { WaifuService } from '../../../../services/main.js'
import { MarginRevealer } from '../../../../misc/AdvancedRevealers.js'
import { setupCursorHover } from '../../../../misc/CursorHover.js'

const { Gio, GLib, Gtk } = imports.gi
const { Box, Scrollable } = Widget

const IMAGE_REVEAL_DELAY = 13

Utils.exec(`bash -c 'mkdir -p ${GLib.get_user_cache_dir()}/ags/media/waifus'`)
Utils.exec(`bash -c 'rm ${GLib.get_user_cache_dir()}/ags/media/waifus/*'`)

export function fileExists(filePath) {
  let file = Gio.File.new_for_path(filePath)
  return file.query_exists(null)
}

const CommandButton = command => Widget.Button({
  label: command,
  setup: setupCursorHover,
  onClicked: () => sendMessage(command),
  className: 'sidebar-chat-chip sidebar-chat-chip-action txt txt-small',
})

export const waifuTabIcon = Widget.Box({
  hpack: 'center',
  homogeneous: true,
  className: 'sidebar-chat-apiswitcher-icon',
  children: [Widget.Label({ label: 'photo_library', className: 'txt-norm' })]
})

const WaifuImage = taglist => {
  const ImageState = (icon, name) => Widget.Box({
    className: 'spacing-h-5 txt',
    children: [
      Widget.Box({ hexpand: true }),
      Widget.Label({
        xalign: 0,
        label: name,
        className: 'sidebar-waifu-txt txt-smallie',
      }),
      Widget.Label({ label: icon, className: 'txt-norm' }),
    ]
  })
  const ImageAction = ({ name, icon, action }) => Widget.Button({
    label: icon,
    onClicked: action,
    tooltipText: name,
    setup: setupCursorHover,
    className: 'sidebar-waifu-image-action txt-norm icon-material',
  })
  const colorIndicator = Widget.Box({
    className: 'sidebar-chat-indicator',
  })
  const downloadState = Widget.Stack({
    homogeneous: false,
    transition: 'slide_up_down',
    transitionDuration: 150,
    items: [
      ['api', ImageState('api', 'Calling API')],
      ['download', ImageState('downloading', 'Downloading image')],
      ['done', ImageState('done', 'Finished!')],
      ['error', ImageState('error', 'Error')],
    ]
  })
  const downloadIndicator = MarginRevealer({
    vpack: 'center',
    transition: 'slide_left',
    revealChild: true,
    child: downloadState,
  })
  const blockHeading = Widget.Box({
    hpack: 'fill',
    className: 'sidebar-waifu-content spacing-h-5',
    children: [
      ...taglist.map((tag) => CommandButton(tag)),
      Widget.Box({ hexpand: true }),
      downloadIndicator,
    ]
  })
  const blockImageActions = Box({
    className: 'sidebar-waifu-image-actions spacing-h-3',
    children: [
      Widget.Box({ hexpand: true }),
      ImageAction({
        name: 'Go to source',
        icon: 'link',
        action: () => Utils.execAsync(['xdg-open', `${thisBlock._imageData.source}`]).catch(print),
      }),
      ImageAction({
        name: 'Hoard',
        icon: 'save',
        action: () => Utils.execAsync(['bash', '-c', `mkdir -p ~/Pictures/waifus && cp ${thisBlock._imagePath} ~/Pictures/waifus`]).catch(print),
      }),
      ImageAction({
        name: 'Open externally',
        icon: 'open_in_new',
        action: () => Utils.execAsync(['xdg-open', `${thisBlock._imagePath}`]).catch(print),
      }),
    ]
  })
  const blockImage = Widget.Box({
    hpack: 'start',
    vertical: true,
    homogeneous: true,
    className: 'sidebar-waifu-image',
    children: [
      Widget.Revealer({
        transition: 'crossfade',
        revealChild: false,
        child: Widget.Box({
          vertical: true,
          children: [blockImageActions],
        })
      })
    ]
  })
  const blockImageRevealer = Widget.Revealer({
    transition: 'slide_down',
    transitionDuration: 150,
    revealChild: false,
    child: blockImage,
  })
  const thisBlock = Widget.Box({
    className: 'sidebar-chat-message',
    properties: [
      ['imagePath', ''],
      ['imageData', ''],
      ['update', (imageData, force = false) => {
        thisBlock._imageData = imageData
        const { status, signature, url, extension, dominant_color, width, height } = thisBlock._imageData
        if (status != 200) {
          downloadState.shown = 'error'
          return
        }
        thisBlock._imagePath = `${GLib.get_user_cache_dir()}/ags/media/waifus/${signature}${extension}`
        downloadState.shown = 'download'
        // Width allocation
        const widgetWidth = Math.min(Math.floor(waifuContent.get_allocated_width() * 0.75), width)
        blockImage.set_size_request(widgetWidth, Math.ceil(widgetWidth * height / width))
        // Start download
        const showImage = () => {
          downloadState.shown = 'done'
          // blockImage.css = `background-color: ${dominant_color};`
          blockImage.css = `background-image:url('${thisBlock._imagePath}');` // TODO: use proper image widget
          Utils.timeout(IMAGE_REVEAL_DELAY, () => {
            blockImageRevealer.revealChild = true
          })
          Utils.timeout(IMAGE_REVEAL_DELAY + blockImageRevealer.transitionDuration,
            () => blockImage.get_children()[0].revealChild = true
          )
          downloadIndicator._hide()
        }
        if (!force && fileExists(thisBlock._imagePath)) showImage()
        else Utils.execAsync(['bash', '-c', `wget -O '${thisBlock._imagePath}' '${url}'`])
          .then(showImage)
          .catch(print)
        blockHeading.get_children().forEach((child) => {
          child.setCss(`border-color: ${dominant_color};`)
        })
        colorIndicator.css = `background-color: ${dominant_color}`
      }],
    ],
    children: [
      colorIndicator,
      Widget.Box({
        vertical: true,
        className: 'spacing-v-5',
        children: [
          blockHeading,
          Widget.Box({ vertical: true, children: [blockImageRevealer] })
        ]
      })
    ],
  })
  return thisBlock
}

const waifuContent = Widget.Box({
  className: 'spacing-v-15',
  vertical: true,
  vexpand: true,
  properties: [['map', new Map()]],
  connections: [
    [WaifuService, (box, id) => {
      if (id === undefined) return
      const newImageBlock = WaifuImage(WaifuService.queries[id])
      box.add(newImageBlock)
      box.show_all()
      box._map.set(id, newImageBlock)
    }, 'newResponse'],
    [WaifuService, (box, id) => {
      if (id === undefined) return
      const data = WaifuService.responses[id]
      if (!data) return
      const imageBlock = box._map.get(id)
      imageBlock._update(data)
    }, 'updateResponse'],
  ]
})

export const waifuView = Scrollable({
  className: 'sidebar-chat-viewport',
  vexpand: true,
  child: Widget.Box({ vertical: true, children: [ waifuContent] }),
  setup: scrolledWindow => {
    scrolledWindow.set_policy(Gtk.PolicyType.NEVER, Gtk.PolicyType.AUTOMATIC)
    const vScrollbar = scrolledWindow.get_vscrollbar()
    vScrollbar.get_style_context().add_class('sidebar-scrollbar')
    Utils.timeout(1, () => {
      const viewport = scrolledWindow.child
      viewport.set_focus_vadjustment(new Gtk.Adjustment(undefined))
    })
    const adjustment = scrolledWindow.get_vadjustment()
    adjustment.connect('changed', () => {
      adjustment.set_value(adjustment.get_upper() - adjustment.get_page_size())
    })
  }
})

const waifuTags = Widget.Revealer({
  revealChild: false,
  transition: 'crossfade',
  transitionDuration: 150,
  child: Widget.Box({
    className: 'spacing-h-5',
    children: [
      Widget.Scrollable({
        vscroll: 'never',
        hscroll: 'automatic',
        hexpand: true,
        child: Widget.Box({
          className: 'spacing-h-5',
          children: [
            CommandButton('waifu'),
            CommandButton('maid'),
            CommandButton('uniform'),
            CommandButton('oppai'),
            CommandButton('selfies'),
            CommandButton('marin-kitagawa'),
            CommandButton('raiden-shogun'),
            CommandButton('mori-calliope'),
          ]
        })
      }),
      Widget.Box({ className: 'separator-line' }),
    ]
  })
})

export const waifuCommands = Widget.Box({
  className: 'spacing-h-5',
  setup: self => {
    self.pack_end(CommandButton('/clear'), false, false, 0)
    self.pack_start(Widget.Button({
      label: 'Tags →',
      setup: setupCursorHover,
      className: 'sidebar-chat-chip-toggle',
      onClicked: () => waifuTags.revealChild = !waifuTags.revealChild
    }), false, false, 0)
    self.pack_start(waifuTags, true, true, 0)
  }
})

const clearChat = () => {
  const kids = waifuContent.get_children()
  kids.forEach(kid => { if (kid) kid.destroy() })
}

export const sendMessage = (text) => {
  if (text.startsWith('/')) {
    if (text.startsWith('/clear')) clearChat()
    else if (text.startsWith('/test')) {
      const newImage = WaifuImage(['/test'])
      waifuContent.add(newImage)
      Utils.timeout(IMAGE_REVEAL_DELAY, () => newImage._update({
        status: 200,
        url: 'https://picsum.photos/400/600',
        extension: '',
        signature: 0,
        source: 'https://picsum.photos/400/600',
        dominant_color: '#9392A6',
        is_nsfw: false,
        width: 300,
        height: 200,
        tags: ['/test'],
      }, true))
    }
  }
  else WaifuService.fetch(text)
}
