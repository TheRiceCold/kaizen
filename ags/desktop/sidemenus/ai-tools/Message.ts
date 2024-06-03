import md2pango from 'misc/md2pango'

import options from 'options'
import { sh } from 'lib/utils'

const { Gio, GLib, Gtk, GtkSource } = imports.gi
const LATEX_DIR = `${GLib.get_user_cache_dir()}/ags/media/latex`
const USERNAME = GLib.get_user_name()

// function loadCustomColorScheme(filePath) {
//   const file = Gio.File.new_for_path(filePath)
//   const [success] = file.load_contents(null)

//   if (!success) {
//     logError('Failed to load the XML file.')
//     return
//   }

//   // Parse the XML content and set the Style Scheme
//   const schemeManager = GtkSource.StyleSchemeManager.get_default()
//   schemeManager.append_search_path(file.get_parent().get_path())
// }
// loadCustomColorScheme(`${App.configDir}/assets/themes/sourceviewtheme.xml`)

function substituteLang(str) {
  const subs = [
    { from: 'javascript', to: 'js' },
    { from: 'bash', to: 'sh' },
  ]
  for (const { from, to } of subs)
    if (from === str) return to
  return str
}

const HighlightedCode = (content, lang) => {
  const buffer = new GtkSource.Buffer()
  const sourceView = new GtkSource.View({ buffer: buffer, wrap_mode: Gtk.WrapMode.NONE })

  const langManager = GtkSource.LanguageManager.get_default()
  const displayLang = langManager.get_language(substituteLang(lang)) // Set your preferred language
  if (displayLang)
    buffer.set_language(displayLang)

  const schemeManager = GtkSource.StyleSchemeManager.get_default()
  buffer.set_style_scheme(schemeManager.get_scheme('custom'))
  buffer.set_text(content, -1)

  return sourceView
}

const TextBlock = (content = '') => Widget.Label({
  xalign: 0,
  wrap: true,
  hpack: 'fill',
  label: content,
  useMarkup: true,
  selectable: true,
  className: 'sidebar-chat-txtblock sidebar-chat-txt',
})

Utils.execAsync(['bash', '-c', `rm -rf ${LATEX_DIR}/*`])
  .then(() => Utils.execAsync(['bash', '-c', `mkdir -p ${LATEX_DIR}`]))
  .catch(print)

const Latex = (content = '') => {
  const latexViewArea = Widget.Box({
    attribute: {
      async render(self, text) {
        if (text.length == 0) return
        const styleContext = self.get_style_context()
        const fontSize = styleContext.get_property('font-size', Gtk.StateFlags.NORMAL)

        const timeSinceEpoch = Date.now()
        const fileName = `${timeSinceEpoch}.tex`
        const outFileName = `${timeSinceEpoch}-symbolic.svg`
        const outIconName = `${timeSinceEpoch}-symbolic`
        const scriptFileName = `${timeSinceEpoch}-render.sh`
        const filePath = `${LATEX_DIR}/${fileName}`
        const outFilePath = `${LATEX_DIR}/${outFileName}`
        const scriptFilePath = `${LATEX_DIR}/${scriptFileName}`

        Utils.writeFile(text, filePath).catch(print)
        // Since MicroTex doesn't support file path input properly, we gotta cat it
        // And escaping such a command is a fucking pain so I decided to just generate a script
        // Note: MicroTex doesn't support `&=`
        // You can add this line in the middle for debugging: echo "$text" > ${filePath}.tmp
        const renderScript = `#!/usr/bin/env bash
text=$(cat ${filePath} | sed 's/$/ \\\\\\\\/g' | sed 's/&=/=/g')
LaTeX -headless -input="$text" -output=${outFilePath} -textsize=${fontSize * 1.1} -padding=0 -maxwidth=${latexViewArea.get_allocated_width() * 0.85}
sed -i 's/fill="rgb(0%, 0%, 0%)"/style="fill:#000000"/g' ${outFilePath}
sed -i 's/stroke="rgb(0%, 0%, 0%)"/stroke="${darkMode.value ? '#ffffff' : '#000000'}"/g' ${outFilePath}
`
        Utils.writeFile(renderScript, scriptFilePath).catch(print)
        Utils.exec(`chmod a+x ${scriptFilePath}`)
        Utils.timeout(100, () => {
          Utils.exec(`bash ${scriptFilePath}`)
          Gtk.IconTheme.get_default().append_search_path(LATEX_DIR)

          self.child?.destroy()
          self.child = Gtk.Image.new_from_icon_name(outIconName, 0)
        })
      }
    },
    setup: self => self.attribute.render(self, content).catch(print)
  })

  const wholeThing = Widget.Box({
    className: 'sidebar-chat-latex',
    attribute: {
      updateText: text => latexViewArea.attribute.render(latexViewArea, text).catch(print)
    },
    child: Widget.Scrollable({
      vscroll: 'never',
      hscroll: 'automatic',
      child: latexViewArea
    })
  })
  return wholeThing
}

const CodeBlock = (content = '', lang = 'txt') => {
  if (lang == 'tex' || lang == 'latex')
    return Latex(content)

  const topBar = Widget.Box(
    { className: 'sidebar-chat-codeblock-topbar' },
    Widget.Label({
      label: lang,
      className: 'sidebar-chat-codeblock-topbar-txt',
    }),
    Box({ hexpand: true }),
    Widget.Button({
      className: 'sidebar-chat-codeblock-topbar-btn',
      child: Widget.Box([
        Widget.Icon('content_copy'),
        Widget.Label({ label: 'Copy' })
      ]),
      onClicked() {
        const buffer = sourceView.get_buffer()
        const copyContent = buffer.get_text(buffer.get_start_iter(), buffer.get_end_iter(), false)
        sh(`wl-copy ${copyContent}`)
      },
    })
  )

  // Source view
  const sourceView = HighlightedCode(content, lang)

  const codeBlock = Widget.Box({
    vertical: true,
    className: 'sidebar-chat-codeblock',
    attribute: {
      updateText: text => sourceView.get_buffer().set_text(text, -1)
    },
    children: [
      topBar,
      Widget.Box(
        { className: 'sidebar-chat-codeblock-code' },
        Widget.Scrollable({
          vscroll: 'never',
          hscroll: 'automatic',
          child: sourceView,
        })
      )
    ]
  })

  return codeBlock
}

const Divider = Widget.Box({ className: 'sidebar-chat-divider' })

const MessageContent = (content) => {
  const contentBox = Widget.Box({
    vertical: true,
    attribute: {
      fullUpdate(self, content, useCursor = false) {
        // Clear and add first text widget
        const children = contentBox.get_children()
        for (let i = 0; i < children.length; i++) {
          const child = children[i]
          child.destroy()
        }
        contentBox.add(TextBlock())
        // Loop lines. Put normal text in markdown parser
        // and put code into code highlighter (TODO)
        const lines = content.split('\n')
        let lastProcessed = 0
        let inCode = false
        for (const [index, line] of lines.entries()) {
          // Code blocks
          const codeBlockRegex = /^\s*```([a-zA-Z0-9]+)?\n?/
          if (codeBlockRegex.test(line)) {
            const kids = self.get_children()
            const lastLabel = kids[kids.length - 1]
            const blockContent = lines.slice(lastProcessed, index).join('\n')
            if (!inCode) {
              lastLabel.label = md2pango(blockContent)
              contentBox.add(CodeBlock('', codeBlockRegex.exec(line)[1]))
            }
            else {
              lastLabel.attribute.updateText(blockContent)
              contentBox.add(TextBlock())
            }

            lastProcessed = index + 1
            inCode = !inCode
          }
          // Breaks
          const dividerRegex = /^\s*---/
          if (!inCode && dividerRegex.test(line)) {
            const kids = self.get_children()
            const lastLabel = kids[kids.length - 1]
            const blockContent = lines.slice(lastProcessed, index).join('\n')
            lastLabel.label = md2pango(blockContent)
            contentBox.add(Divider)
            contentBox.add(TextBlock())
            lastProcessed = index + 1
          }
        }
        if (lastProcessed < lines.length) {
          const kids = self.get_children()
          const lastLabel = kids[kids.length - 1]
          const blockContent = lines.slice(lastProcessed, lines.length).join('\n')
          if (!inCode)
            lastLabel.label = `${md2pango(blockContent)}${useCursor ? options.ai.writingCursor : ''}`
          else
            lastLabel.attribute.updateText(blockContent)
        }
        contentBox.show_all()
      }
    }
  })

  contentBox.attribute.fullUpdate(contentBox, content, false)
  return contentBox
}

export const ChatMessage = (message, modelName = 'Model') => {
  const TextSkeleton = (extraClassName = '') => Widget.Box({
    className: `sidebar-chat-message-skeletonline ${extraClassName}`,
  })
  const messageContentBox = MessageContent(message.content)
  const messageLoadingSkeleton = Widget.Box({
    vertical: true,
    children: Array.from({ length: 3 }, (_, id) => TextSkeleton(`sidebar-chat-message-skeletonline-offset${id}`)),
  })

  const messageArea = Widget.Stack({
    homogeneous: message.role !== 'user',
    transition: 'crossfade',
    transitionDuration: options.transition,
    children: {
      thinking: messageLoadingSkeleton,
      message: messageContentBox,
    },
    shown: message.thinking ? 'thinking' : 'message',
  })

  const thisMessage = Widget.Box(
    { className: 'sidebar-chat-message' },
    Widget.Box(
      { vertical: true },
      Widget.Label({
        xalign: 0,
        wrap: true,
        hpack: 'start',
        useMarkup: true,
        label: (message.role == 'user' ? USERNAME : modelName),
        className: `txt txt-bold sidebar-chat-name sidebar-chat-name-${message.role == 'user' ? 'user' : 'bot'}`,
      }),
      Wiget.Box({ className: 'sidebar-chat-messagearea' }, messageArea)
    )
      .hook(message, () => messageArea.shown = message.thinking ? 'thinking' : 'message', 'notify::thinking')
      .hook(message, () => messageContentBox.attribute.fullUpdate(messageContentBox, message.content, message.role != 'user'), 'notify::content')
      .hook(message, () => messageContentBox.attribute.fullUpdate(messageContentBox, message.content, false), 'notify::done')
  )

  return thisMessage
}

export const SystemMessage = (content, commandName) => {
  const messageContentBox = MessageContent(content)

  const thisMessage = Widget.Box(
    { className: 'sidebar-chat-message' },
    Widget.Box(
      { vertical: true },
      Widget.Label({
        xalign: 0,
        wrap: true,
        hpack: 'start',
        label: `System  •  ${commandName}`,
        className: 'sidebar-chat-name sidebar-chat-name-system',
      }),
      messageContentBox,
    )
  )

  return thisMessage
}
